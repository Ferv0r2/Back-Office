import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Safe = () => {
  return (
    <div className="">
      <div className="flex p-1 rounded-xl items-center text-sm font-bold text-emerald-600 bg-teal-200 w-20 justify-center">
        <FaCheckCircle className="mr-2" />
        <p>SAFE</p>
      </div>
    </div>
  );
};

export default Safe;
