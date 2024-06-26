import { client } from "@/lib/hono";
import { convertMiliUnitsToAmount } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
export const useGetSummary = () => {
    const params = useSearchParams();
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const accountId = params.get("accountId") || "";

    const query = useQuery({
        queryKey: ["summary",{from, to, accountId}],
        queryFn: async ( ) => {
            const response = await client.api.summary.$get({
                query: {from, to, accountId}
            });
            if(!response.ok) throw new Error("Failed to fetch summary.");
            const {data} = await response.json();
            return {
                ...data,
                incomeAmount: convertMiliUnitsToAmount(data.incomeAmount),
                expenseAmount: convertMiliUnitsToAmount(data.expenseAmount),
                remainingAmount: convertMiliUnitsToAmount(data.remainingAmount),
                categories: data.categories.map((category: any) => ({...category, value: convertMiliUnitsToAmount(category.value)})),
                days: data.days.map((day: any) => ({...day, income: convertMiliUnitsToAmount(day.income), expense: convertMiliUnitsToAmount(day.expense)})),
            }
        }
    });
    return query;
}