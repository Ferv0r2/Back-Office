import React from "react";
import Card from "components/UI/Card";
import TableHeader from "components/Table/TableHeader";
import Item from "./Item";

const tableItems = [
  {
    author: "Ramp",
    duty: "Manager",
    status: 1,
    employed: "23/04/18",
  },
  {
    author: "MIU",
    duty: "Programmer",
    status: 0,
    employed: "11/04/18",
  },
  {
    author: "Ho0ony",
    duty: "Programmer",
    status: 1,
    employed: "19/04/18",
  },
  {
    author: "Orbit",
    duty: "Programmer",
    status: 0,
    employed: "14/04/18",
  },
];

const Table = () => {
  const items = tableItems.map((authors) => {
    return <Item authors={authors} />;
  });

  return (
    <Card className="relative bg-[#202940] text-white px-4">
      <TableHeader>Authors Table</TableHeader>
      <div className="pt-24 flex font-semibold text-xs p-4 opacity-70">
        <div className="w-2/5">AUTHOR</div>
        <div className="w-1/5">DUTY</div>
        <div className="w-1/5">STATUS</div>
        <div className="w-1/5">EMPLOYED</div>
        <div className="w-1/5">ACTION</div>
      </div>
      <div>{items}</div>
    </Card>
  );
};

export default Table;
