import React from "react";
import Card from "components/UI/Card";

const TableHeader = (props) => {
  return (
    <Card className="absolute -top-4 left-4 px-4 py-6 w-[97.5%] text-white font-bold bg-gradient-to-r from-blue-600 to-blue-400">
      {props.children}
    </Card>
  );
};

export default TableHeader;
