import { FormatCurrency } from "@/lib/utils";
// radial-variant.tsx
import {
  RadialBar,
  RadialBarChart,
  Legend,
  ResponsiveContainer,
} from "recharts";
type Props = {
  data?: {
    name: string;
    value: number;
  }[];
};
const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];
export const RadialVariant = ({ data = [] }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadialBarChart
       cx="50%"
        cy="50%"
        innerRadius="90%"
        outerRadius="40%"
        barSize={10}
        data={data.map((d, index) => ({
          ...d,
          fill: COLORS[index % COLORS.length],
        }))}
      >
        <RadialBar
          dataKey="value"
          fill="#0062FF"
          background
          cornerRadius={10}
          label={{ position: "insideStart", fill: "#fff", fontSize: "12px"}}
        />
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
                        ({FormatCurrency(entry.payload.value)})
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            );
          }}
        />
        
      </RadialBarChart>
    </ResponsiveContainer>
  );
};