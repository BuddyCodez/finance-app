import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResonseType = InferResponseType<
  (typeof client.api.accounts)[":id"]["$delete"]
>;

export const useDeleteAccount = (id?: string) => {
  const QueryClient = useQueryClient();
  const mutation = useMutation<ResonseType, Error>({
    mutationFn: async (json) => {
      const response = await client.api.accounts[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["account", {id}] });
      QueryClient.invalidateQueries({ queryKey: ["accounts"] });
      QueryClient.invalidateQueries({ queryKey: ["transactions"] });
      QueryClient.invalidateQueries({queryKey: ["summary"]});

      toast.success("Account Deleted.", { className: "drop-shadow-md" });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete account.");
    },
  });
  return mutation;
};
