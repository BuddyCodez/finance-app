import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResonseType = InferResponseType<
  (typeof client.api.accounts)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.accounts)[":id"]["$patch"]
>["json"];

export const useEditAccount = (id?: string) => {
  const QueryClient = useQueryClient();
  const mutation = useMutation<ResonseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts[":id"]["$patch"]({
        param: { id },
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["account", {id}] });
      QueryClient.invalidateQueries({ queryKey: ["accounts"] });
      QueryClient.invalidateQueries({ queryKey: ["transactions"] });
      QueryClient.invalidateQueries({queryKey: ["summary"]});

      toast.success("Account Updated.", { className: "drop-shadow-md" });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update account.");
    },
  });
  return mutation;
};
