import React from "react";

const Selector = (props) => {
  const healthChangeHandler = (e) => {
    props.onChangeFilter(e.target.value);
  };

  return (
    <div className={`${props.className} px-1`}>
      <label htmlFor={props.name} className="block text-xs pb-1">
        {props.name}
      </label>
      <select
        onChange={healthChangeHandler}
        name={props.name}
        value={props.stateValue}
        className="text-black rounded-md p-1.5 cursor-pointer"
      >
        <option value="All">All</option>
        {props.option.map((v) => (
          <option value={v}>{v}</option>
        ))}
      </select>
    </div>
  );
};

export default Selector;
