import { InferRequestType, InferResponseType } from "hono";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResonseType = InferResponseType<typeof client.api.transactions["bulk-create"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transactions["bulk-create"]["$post"]>["json"];

export const useBulkCreateTransactions = () => {
    const QueryClient = useQueryClient();
    const mutation = useMutation<ResonseType, Error, RequestType>({
        mutationFn: async(json) => {
            const response = await client.api.transactions["bulk-create"]["$post"]({ json });
            return await response.json();
        
        },
        onSuccess: () => {
            QueryClient.invalidateQueries({queryKey: ["transactions"]});
            QueryClient.invalidateQueries({queryKey: ["summary"]});

            toast.success("Transactions created.", {className: "drop-shadow-md"})
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to create transactions.");
        },
    });
    return mutation;
}