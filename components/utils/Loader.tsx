import React from "react";
import { twMerge } from "tailwind-merge";
type Props  = {
    className?: string;

}
const Loader = ({className}: Props) => {
  return (
    <div className={twMerge(className, "size-4")}>
        <div className="loader">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </div>
    </div>
  );
};

export default Loader;
