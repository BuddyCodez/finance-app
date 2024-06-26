import { InferRequestType, InferResponseType } from "hono";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResonseType = InferResponseType<typeof client.api.categories.$post>;
type RequestType = InferRequestType<typeof client.api.categories.$post>["json"];

export const useCreateCategory = () => {
    const QueryClient = useQueryClient();
    const mutation = useMutation<ResonseType, Error, RequestType>({
        mutationFn: async(json) => {
            const response = await client.api.categories.$post({ json });
            return await response.json();
        
        },
        onSuccess: () => {
            QueryClient.invalidateQueries({queryKey: ["categories"]});
            toast.success("Category created.",  {className: "drop-shadow-md", })
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to create category.");
        },
    });
    return mutation;
}