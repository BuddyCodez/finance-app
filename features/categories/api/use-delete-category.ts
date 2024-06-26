import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResonseType = InferResponseType<
  (typeof client.api.categories)[":id"]["$delete"]
>;

export const useDeleteCategory = (id?: string) => {
  const QueryClient = useQueryClient();
  const mutation = useMutation<ResonseType, Error>({
    mutationFn: async (json) => {
      const response = await client.api.categories[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["category", {id}] });
      QueryClient.invalidateQueries({ queryKey: ["categories"] });
      QueryClient.invalidateQueries({ queryKey: ["transactions"] });
      QueryClient.invalidateQueries({queryKey: ["summary"]});

      toast.success("Category Deleted.", { className: "drop-shadow-md" });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete Category.");
    },
  });
  return mutation;
};
