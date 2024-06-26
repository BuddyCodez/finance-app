import { format } from "date-fns";

import {
  Tooltip,
  XAxis,
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { CustomToolTip } from "../ui/custom-tooltip";
type BarVariantProps = {
  data: {
    date: string;
    income: number;
    expense: number;
  }[];
};
export const BarVariant = ({ data }: BarVariantProps) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
            axisLine={false}
            tickLine={false}
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), "dd MMM")}
            style={{ fontSize: "12px" }}
            tickMargin={16}
            />
            <Tooltip content={<CustomToolTip />} />
            <Bar
            dataKey="income"
            fill="#3d82f6"
            className="drop-shadow-sm"
            />
            <Bar
            dataKey="expense"
            fill="#f43f5e"
            className="drop-shadow-sm"
            />
        </BarChart>
        </ResponsiveContainer>
    );
    }
