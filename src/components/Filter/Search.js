import React, { useRef } from "react";
import { GoSearch } from "react-icons/go";

const Search = (props) => {
  const inputRef = useRef();

  return (
    <div className={`${props.className} px-1`}>
      <label htmlFor={props.name} className="block text-xs pb-1">
        {props.name}
      </label>
      <div className="relative w-3/4 flex rounded-md items-center bg-white">
        <GoSearch className="absolute top-2 left-2 w-4 text-[#202940]" />
        <input
          type="text"
          className="rounded-md py-1.5 pl-8 pr-1.5 text-black"
          placeholder="Search"
          ref={inputRef}
        />
      </div>
    </div>
  );
};

export default Search;
