import { formatPercentage } from "@/lib/utils";
import {
  Tooltip,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { CategoryToolTip } from "../ui/category-tooltip";
type PieVariantProps = {
  data: {
    name: string;
    value: number;
  }[];
};
const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

export const PieVariant = ({ data }: PieVariantProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }: any) => {
            return (
              <ul className="flex flex-col space-y-2">
                {payload.map((entry: any, index: number) => (
                  <li
                    key={`item-${index}`}
                    className="flex items-center space-x-2"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <p className="space-x-1">
                      <span className="text-sm text-muted-foreground">
                        {entry.value}
                      </span>
                      <span className="text-sm ">
                        ({formatPercentage(entry.payload.percent * 100)})
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            );
          }}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={<CategoryToolTip />} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          labelLine={false}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
