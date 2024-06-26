import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { differenceInDays, parse, subDays } from "date-fns";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { fetchFinancialSummary } from "./fetch-financial-summary";
import { calculatePercentageChange, fillMissingDays } from "@/lib/utils";
import { db } from "@/db/drizzle";
import { accounts, categories, transactions } from "@/db/schema";
import { and, desc, eq, gte, lt, lte, sql } from "drizzle-orm";
const app = new Hono()
    .get("/",
        clerkMiddleware(),
        zValidator("query",
            z.object({
                from: z.string().optional(),
                to: z.string().optional(),
                accountId: z.string().optional(),
            }),
        ),
        async (c) => {
            const auth = getAuth(c);
            const { from, to, accountId } = c.req.valid("query");
            if (!auth?.userId) {
                throw new HTTPException(401, {
                    res: c.json({ error: "Unauthorized" }, 401),
                });
            }
            const defaultTo = new Date();
            const defaultFrom = subDays(defaultTo, 30);
            const startDate = from ? parse(from, "yyyy-MM-dd", new Date()) : defaultFrom;
            const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

            const periodLength = differenceInDays(endDate, startDate) + 1;
            const lastPeriodStart = subDays(startDate, periodLength);
            const lastPeriodEnd = subDays(endDate, periodLength);
            const [currentPeriod] = await fetchFinancialSummary(auth.userId, startDate, endDate, accountId);
            const [lastPeriod] = await fetchFinancialSummary(auth.userId, lastPeriodStart, lastPeriodEnd, accountId);

            const incomeChange = calculatePercentageChange(currentPeriod.income, lastPeriod.income);
            const expensesChange = calculatePercentageChange(currentPeriod.expenses, lastPeriod.expenses)
            const remainingChange = calculatePercentageChange(currentPeriod.remaining, lastPeriod.remaining);
            const category = await db.select({
                name: categories.name,
                value: sql`SUM(ABS(${transactions.amount}))`.mapWith(Number),
            }).from(transactions).innerJoin(accounts, eq(transactions.accountId, accounts.id)).innerJoin(categories, eq(transactions.categoryId, categories.id)).where(
                and(
                    accountId ? eq(transactions.accountId, accountId) : undefined,
                    eq(accounts.userId, auth.userId),
                    lt(transactions.amount, 0),
                    gte(transactions.date, startDate),
                    lte(transactions.date, endDate)
                )
            ).groupBy(categories.name)
                .orderBy(desc(sql`SUM(ABS(${transactions.amount}))`))
                const topCategory = category.slice(0, 3);
                const otherCategory = category.slice(3);
                const Othersum = otherCategory.reduce((sum, current) => sum + current.value, 0);
                const finalCategories = topCategory;
                if(otherCategory.length > 0) {
                    finalCategories.push({
                        name: "Other",
                        value: Othersum
                    })
                }
                const activeDays = await db.select({
                    date: transactions.date,
                    income: sql`SUM(CASE WHEN ${transactions.amount} >= 0 THEN ${transactions.amount} ELSE 0 END)`.mapWith(Number),
                    expense: sql`SUM(CASE WHEN ${transactions.amount} < 0 THEN ABS(${transactions.amount}) ELSE 0 END)`.mapWith(Number),

                }).from(transactions).innerJoin(accounts, eq(transactions.accountId, accounts.id)).where(
                and(
                    accountId ? eq(transactions.accountId, accountId) : undefined,
                    eq(accounts.userId, auth.userId),
                    gte(transactions.date, startDate),
                    lte(transactions.date, endDate)
                )).groupBy(transactions.date).orderBy(transactions.date);
                const days = fillMissingDays(activeDays, startDate, endDate);        
            return c.json({
               data: {
                remainingAmount: currentPeriod.remaining,
                remainingChange,
                incomeAmount: currentPeriod.income,
                incomeChange,
                expenseAmount: currentPeriod.expenses,
                expensesChange,
                categories: finalCategories,
                days
               }
            });
        })

export default app;