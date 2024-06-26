import { accounts, categories, transactions } from "@/db/schema";
import { convertAmountToMiliUnits } from "@/lib/utils";
import { neon } from "@neondatabase/serverless";
import { eachDayOfInterval, format, subDays } from "date-fns";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
config({path: ".env.local"});

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const SEED_USER_ID = "user_2hMGKMoP0KgDY3Fq3ym8jpk52qV";
const SEED_CATEGORIES = [
    {id: "1", name: "Groceries", userId: SEED_USER_ID, plaidId: null},
    {id: "2", name: "Rent", userId: SEED_USER_ID, plaidId: null},
    {id: "3", name: "Utilities", userId: SEED_USER_ID, plaidId: null},
    {id: "4", name: "Transportation", userId: SEED_USER_ID, plaidId: null},
    {id: "5", name: "Health", userId: SEED_USER_ID, plaidId: null},
    {id: "6", name: "Entertainment", userId: SEED_USER_ID, plaidId: null},
];
const SEED_ACCOUNTS = [
    {id: "1", name: "Checking", userId: SEED_USER_ID, plaidId: null},
    {id: "2", name: "Savings", userId: SEED_USER_ID, plaidId: null},
    {id: "3", name: "Credit Card", userId: SEED_USER_ID, plaidId: null},
];
const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const SEED_TRANSACTIONS: typeof transactions.$inferSelect[] = [];

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
    switch(category.name) {
        case "Groceries":
            return Math.random() * 100;
        case "Rent":
            return Math.random() * 1000;
        case "Utilities":
            return Math.random() * 200;
        case "Transportation":
            return Math.random() * 50;
        case "Health":
            return Math.random() * 100;
        case "Entertainment":
            return Math.random() * 200;
        default:
            return Math.random() * 100;
    }
}
const generateTransactionForDay = (day: Date) => {
    const numTransactions = Math.floor(Math.random() * 5) + 1;
    for(let i = 0; i < numTransactions; i++) {
        const category = SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
        const account = SEED_ACCOUNTS[Math.floor(Math.random() * SEED_ACCOUNTS.length)];
        const amount = generateRandomAmount(category);
        const isExpense = Math.random() > 0.5;
        const formattedAmount = convertAmountToMiliUnits(isExpense ? -amount : amount);
        SEED_TRANSACTIONS.push({
            id: `transaction_${format(day, "yyyy-MM-dd")}_${i}`,
            accountId: SEED_ACCOUNTS[0].id,
            categoryId: category.id,
            date: day,
            amount: formattedAmount,
            payee: "Merchant",
            notes: "Seed transaction",
        });
    }
}
const generateTransactions  = () => {
    const days = eachDayOfInterval({start: defaultFrom, end: defaultTo});
    days.forEach(day => generateTransactionForDay(day));   
}
generateTransactions();
const main = async () => {
    try {
        await db.delete(transactions).execute();
        await db.delete(categories).execute();
        await db.delete(accounts).execute();
        await db.insert(categories).values(SEED_CATEGORIES).execute();
        await db.insert(accounts).values(SEED_ACCOUNTS).execute();
        await db.insert(transactions).values(SEED_TRANSACTIONS).execute();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
main().then(() => process.exit(0));