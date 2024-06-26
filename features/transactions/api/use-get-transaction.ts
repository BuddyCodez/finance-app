import { client } from "@/lib/hono";
import { convertMiliUnitsToAmount } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
export const useGetTransaction = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["transaction", {id}],
        queryFn: async ( ) => {
            const response = await client.api.transactions[":id"].$get({
                param: {id},
            });
            if(!response.ok) throw new Error("Failed to fetch transactions");
            const {data} = await response.json();
            // map amount.
            return {
                ...data,
                amount: convertMiliUnitsToAmount(data.amount)
            }
        }
    });
    return query;
}