import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { insertTransactionsSchema } from "@/db/schema";
import { Select } from "@/components/utils/select";
import { DatePicker } from "@/components/utils/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { AmountInput } from "@/components/utils/amount-input";
import { convertAmountToMiliUnits } from "@/lib/utils";

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  amount: z.string(),
  payee: z.string(),
  notes: z.string().nullable().optional(),
});
const apiSchema = insertTransactionsSchema.omit({ id: true });
type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>;
type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: ApiFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  accountOptions: { label: string; value: string }[];
  categoryOptions: { label: string; value: string }[];
  onCreateAccount: (name: string) => void;
  onCreateCategory: (name: string) => void;
};
export const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const handleSubmit = (values: FormValues) => {
   const AmountInMiliUnits = convertAmountToMiliUnits(parseFloat(values.amount));
   onSubmit({ ...values, amount: AmountInMiliUnits });
  };
  const handleDelete = async () => {
    onDelete?.();
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            name="date"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="accountId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account</FormLabel>
                <FormControl>
                  <Select
                    placeholder="Select an account"
                    {...field}
                    options={accountOptions}
                    onCreate={onCreateAccount}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="categoryId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    placeholder="Select a category"
                    {...field}
                    options={categoryOptions}
                    onCreate={onCreateCategory}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
              </FormItem>
            )}
          />
           <FormField
            name="payee"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payee</FormLabel>
                <FormControl>
                  <Input {...field} disabled={disabled} placeholder="Add a payee"/>
                </FormControl>
              </FormItem>
            )}
          />
           <FormField
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                <AmountInput {...field} disabled={disabled} placeholder="0.00" />
                </FormControl>
              </FormItem>
            )}
          />
           <FormField
            name="notes"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea {...field} value={field.value ?? ""} disabled={disabled} placeholder="Optional notes"/>
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-full" disabled={disabled}>
            {id ? "Save Changes" : "Add Transaction"}
          </Button>
          {!!id && (
            <Button
              className="w-full"
              size="icon"
              disabled={disabled}
              onClick={handleDelete}
              type="button"
              variant="outline"
            >
              <Trash className="size-4 mr-2 " />
              Delete Transaction
            </Button>
          )}
        </form>
      </Form>
    </>
  );
};
