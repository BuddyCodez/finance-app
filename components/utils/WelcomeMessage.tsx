"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { Skeleton } from "../ui/skeleton";

const WelcomeMessage = () => {
  const { user, isLoaded } = useUser();
  return <div className="space-y-2 mb-4">
    <h2 className="text-2xl lg:text-4xl text-white font-medium ">
        {!isLoaded ? (
          <Skeleton className="w-[40%] h-8" />
        ) : (
          <>
            Welcome back{isLoaded ? ", " : " "}{user?.firstName} 👋
          </>
        )}
    </h2>
    <p className="text-sm lg:text-base text-[#89b6fd]">
        This is your financial Overview Report
    </p>
  </div>;
};

export default WelcomeMessage;
