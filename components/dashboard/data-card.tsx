import { cn, FormatCurrency, formatPercentage } from "@/lib/utils";
import { IconType } from "react-icons";
import { VariantProps, cva } from "class-variance-authority";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CountUp } from "./count-up";
import { Skeleton } from "../ui/skeleton";
const boxVariants = cva("rounded-md pb-3", {
  variants: {
    variant: {
      default: "bg-blue-500/20",
      success: "bg-emerald-500/20",
      danger: "bg-rose-500/20",
      warning: "bg-yellow-500/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const IconVariants = cva("size-6", {
  variants: {
    variant: {
      default: "fill-blue-500",
      success: "fill-emerald-500",
      danger: "fill-rose-500",
      warning: "fill-yellow-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
type BoxVariants = VariantProps<typeof boxVariants>;
type IconVariants = VariantProps<typeof IconVariants>;
interface DataCardProps extends BoxVariants, IconVariants {
  icon: IconType;
  title: string;
  value?: number;
  dataRange: string;
  percentageChange?: number;
}
export const DataCard = ({
  icon: Icon,
  title,
  value = 0,
  dataRange,
  percentageChange = 0,
  variant,
}: DataCardProps) => {
  return (
    <Card className="border-none drop-shadow-md">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <CardTitle className="text-2xl line-clamp-1">{title}</CardTitle>
          <CardDescription className="line-clamp-1">
            {dataRange}
          </CardDescription>
        </div>
        <div className={cn("shrink-0 p-[10px]", boxVariants({ variant }))}>
          <Icon className={cn(IconVariants({ variant }))} />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold mb-2 text-2xl line-clamp-1 break-all">
          <CountUp
            preserveValue
            start={0}
            end={value}
            decimals={2}
            decimalPlaces={2}
            formattingFn={FormatCurrency}
          />
        </h1>
        <p
          className={cn(
            "text-muted-foreground text-sm line-clamp-1",
            percentageChange > 0 && "text-emerald-500",
            percentageChange < 0 && "text-rose-500"
          )}
        >
          {formatPercentage(percentageChange, { addPrefix: true })} from last
          period
        </p>
      </CardContent>
    </Card>
  );
};
export const DataCardLoding = () => {
  return (
    <Card className="border-none drop-shadow-sm h-[192px]">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-40" />
        </div>
        <Skeleton className="size-12" />
      </CardHeader>
      <CardContent>
        <Skeleton className="shrink-0 h-10 w-24 mb-2" />
        <Skeleton className="shrink-0 h-2 w-40" />
      </CardContent>
    </Card>
  );
};
