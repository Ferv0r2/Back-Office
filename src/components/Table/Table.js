import React from "react";
import Card from "components/UI/Card";
import TableHeader from "components/UI/TableHeader";
import Item from "components/Table/Item";
import Filter from "components/Filter/Filter";
import { useRecoilValue } from "recoil";
import { healthState, typeState, yearState } from "components/States/States";

const tableItems = [
  {
    source: "Ramp",
    health: "Danger",
    type: "Manager",
    lastscan: "23/04/2021",
  },
  {
    source: "MIU",
    health: "Safe",
    type: "Programmer",
    lastscan: "11/04/2021",
  },
  {
    source: "Ho0ony",
    health: "Safe",
    type: "Programmer",
    lastscan: "19/04/2022",
  },
  {
    source: "Orbit",
    health: "Danger",
    type: "Programmer",
    lastscan: "14/04/2022",
  },
];

const Table = (props) => {
  const getHealthState = useRecoilValue(healthState);
  const getTypeState = useRecoilValue(typeState);
  const getYearState = useRecoilValue(yearState);

  const items = tableItems.map((authors, i) => {
    if (
      (authors.health === getHealthState || getHealthState === "All") &&
      (authors.type === getTypeState || getTypeState === "All") &&
      (authors.lastscan.slice(6) === getYearState || getYearState === "All")
    )
      return (
        <Item
          className={i % 2 === 1 ? "bg-slate-600" : ""}
          key={authors.source}
          authors={authors}
        />
      );
  });

  return (
    <Card className="relative bg-[#202940] text-white px-4 pb-6">
      <TableHeader>{props.title}</TableHeader>
      <Filter
        items={tableItems}
        healthValue={getHealthState}
        typeValue={getTypeState}
        yearValue={getYearState}
        className="pt-20 pb-8"
      />
      <div className="flex p-4 border-b-[1px] border-zinc-400 text-zinc-500 font-semibold text-sm">
        <div className="w-2/5 flex items-center">
          <p>MEMBER</p>
        </div>
        <div className="w-1/5">TYPE</div>
        <div className="w-1/5">HEALTH</div>
        <div className="w-1/5" />
        <div className="w-1/5" />
      </div>
      <div className="pt-4">{items}</div>
    </Card>
  );
};

export default Table;
