import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResonseType = InferResponseType<
  (typeof client.api.transactions)[":id"]["$delete"]
>;

export const useDeleteTransaction = (id?: string) => {
  const QueryClient = useQueryClient();
  const mutation = useMutation<ResonseType, Error>({
    mutationFn: async (json) => {
      const response = await client.api.transactions[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["transaction", {id}] });
      QueryClient.invalidateQueries({ queryKey: ["transactions"] });
      QueryClient.invalidateQueries({queryKey: ["summary"]});
      toast.success("Transaction Deleted.", { className: "drop-shadow-md" });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete Transaction.");
    },
  });
  return mutation;
};
