import { FormatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { Separator } from "./separator";

export const CategoryToolTip = ({ active, payload, label }: any) => {
  if (!active) return null;
  const name = payload[0].payload.name;
  const value = payload[0].value;
  console.log({payload});
  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className="text-sm p-2 px-3 text-muted-foreground">
        {name}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-rose-500 rounded-full" />
            <p className="text-sm text-muted-foreground">Expense</p>
          </div>
          <p className="text-sm text-right font-medium">
            {FormatCurrency(value * -1)}
          </p>
        </div>
      </div>
    </div>
  );
};
