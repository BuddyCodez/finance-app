"use client";
import { DataCharts } from "@/components/dashboard/data-charts";
import { DataGrid } from "@/components/dashboard/data-grid";
import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function DashboardPage() {
  const {onOpen } = useNewAccount();
  return (<div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
    <DataGrid />
    <DataCharts />
  </div>);
}
