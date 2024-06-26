import { InferRequestType, InferResponseType } from "hono";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResonseType = InferResponseType<typeof client.api.accounts.$post>;
type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"];

export const useCreateAccount = () => {
    const QueryClient = useQueryClient();
    const mutation = useMutation<ResonseType, Error, RequestType>({
        mutationFn: async(json) => {
            const response = await client.api.accounts.$post({ json });
            return await response.json();
        
        },
        onSuccess: () => {
            QueryClient.invalidateQueries({queryKey: ["accounts"]});
            toast.success("Account created.",  {className: "drop-shadow-md", })
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to create account.");
        },
    });
    return mutation;
}