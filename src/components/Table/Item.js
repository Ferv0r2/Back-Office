import Safe from "components/Utils/Safe";
import Danger from "components/Utils/Danger";
import React from "react";

const Item = ({ className, authors }) => {
  return (
    <div className={`${className} flex rounded-md py-6 px-4`}>
      <div className="w-2/5 flex items-center">
        <p>{authors.source}</p>
      </div>
      <div className="w-1/5">{authors.type}</div>
      <div className="w-1/5">
        {authors.health === "Safe" ? <Safe /> : <Danger />}
      </div>
      <div className="w-1/5">{authors.lastscan}</div>
      <button className="w-1/5 text-left hover:text-blue-400">Edit</button>
    </div>
  );
};

export default Item;
