import React from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import Search from "components/Filter/Search";
import Selector from "components/Filter/Selector";
import { motion } from "framer-motion";

import { useSetRecoilState } from "recoil";
import { healthState, typeState, yearState } from "components/States/States";

const selectorItem = [
  {
    name: "HEALTH",
    opt: ["Safe", "Danger"],
  },
  {
    name: "TYPE",
    opt: ["Manager", "Programmer"],
  },
  {
    name: "LAST SCAN",
    opt: ["2019", "2020", "2021", "2022"],
  },
];

const Filter = (props) => {
  const setHealthValue = useSetRecoilState(healthState);
  const setTypeValue = useSetRecoilState(typeState);
  const setYearValue = useSetRecoilState(yearState);

  const filterHealthChangeHandler = (selected) => {
    console.log(selected);
    setHealthValue(selected);
  };

  const filterTypeChangeHandler = (selected) => {
    console.log(selected);
    setTypeValue(selected);
  };

  const filterYearChangeHandler = (selected) => {
    console.log(selected);
    setYearValue(selected);
  };

  const initialHandler = (e) => {
    setTypeValue("All");
    setHealthValue("All");
    setYearValue("All");
  };

  return (
    <div className={`${props.className} p-2 flex text-sm items-center`}>
      <Search name="FILTER" items={props.items} />
      <div className="px-2 pt-4 text-xl">|</div>
      <Selector
        onChangeFilter={filterHealthChangeHandler}
        stateValue={props.healthValue}
        name={selectorItem[0].name}
        option={selectorItem[0].opt}
      />
      <Selector
        onChangeFilter={filterTypeChangeHandler}
        stateValue={props.typeValue}
        name={selectorItem[1].name}
        option={selectorItem[1].opt}
      />
      <Selector
        onChangeFilter={filterYearChangeHandler}
        stateValue={props.yearValue}
        name={selectorItem[2].name}
        option={selectorItem[2].opt}
      />
      <div className="px-4 py-1">
        <label className="block">&nbsp;</label>
        <motion.button
          whileTap={{ rotate: [0, 360] }}
          className="bg-slate-600 p-1.5 rounded-md hover:bg-slate-500"
          type="button"
          onClick={initialHandler}
        >
          <HiOutlineRefresh />
        </motion.button>
      </div>
    </div>
  );
};

export default Filter;
