import React from "react";
import HeaderLogo from "./HeaderLogo";
import Navigaiton from "@/components/utils/Navigation";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import WelcomeMessage from "./WelcomeMessage";
import { Filters } from "./filters";
const Header = () => {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36 ">
      <div className="max-w-screen-2xl mx-auto ">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigaiton />
          </div>
         <ClerkLoading>
            <Loader2 className="size-6 animate-spin text-slate-200" />
         </ClerkLoading>
         <ClerkLoaded>
         <UserButton afterSignOutUrl="/" />
         </ClerkLoaded>
        </div>
        <WelcomeMessage /> 
        <Filters />
      </div>
    </header>
  );
};

export default Header;
