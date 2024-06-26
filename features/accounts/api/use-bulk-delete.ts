import { InferRequestType, InferResponseType } from "hono";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResonseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteAccounts = () => {
    const QueryClient = useQueryClient();
    const mutation = useMutation<ResonseType, Error, RequestType>({
        mutationFn: async(json) => {
            const response = await client.api.accounts["bulk-delete"]["$post"]({ json });
            return await response.json();
        
        },
        onSuccess: () => {
            QueryClient.invalidateQueries({queryKey: ["accounts"]});
            QueryClient.invalidateQueries({queryKey: ["summary"]});
            toast.success("Accounts deleted.", {className: "drop-shadow-md"})
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to delete accounts.");
        },
    });
    return mutation;
}