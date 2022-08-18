import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Danger = () => {
  return (
    <div className="">
      <div className="flex p-1 rounded-xl items-center text-sm font-bold text-red-600 bg-red-200 w-20 justify-center">
        <FaCheckCircle className="mr-2" />
        <p>Danger</p>
      </div>
    </div>
  );
};

export default Danger;
