import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResonseType = InferResponseType<
  (typeof client.api.categories)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.categories)[":id"]["$patch"]
>["json"];

export const useEditCategory = (id?: string) => {
  const QueryClient = useQueryClient();
  const mutation = useMutation<ResonseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories[":id"]["$patch"]({
        param: { id },
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["category", {id}] });
      QueryClient.invalidateQueries({ queryKey: ["categories"] });
      QueryClient.invalidateQueries({ queryKey: ["transactions"] });
      QueryClient.invalidateQueries({queryKey: ["summary"]});
      toast.success("Categories Updated.", { className: "drop-shadow-md" });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update categories.");
    },
  });
  return mutation;
};
