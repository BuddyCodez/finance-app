import { formatPercentage } from "@/lib/utils";
import { CategoryToolTip } from "../ui/category-tooltip";
import {
  Tooltip,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
type RadarVariantProps = {
  data?: {
    name: string;
    value: number;
  }[];
};
const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];
export const RadarVariant = ({ data }: RadarVariantProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart
      data={data}
      cx="50%"
        cy="50%"
        outerRadius="60%"
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="name" style={{
            fontSize: "12px"
        }}/>
        <PolarRadiusAxis style={{
            fontSize: "12px"
        }}/>
        <Tooltip content={<CategoryToolTip />} />
        <Radar
         
          dataKey="value"
          stroke="#0062FF"
          fill="#0062FF"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};