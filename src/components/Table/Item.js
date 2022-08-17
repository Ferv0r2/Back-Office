import React from "react";

const Item = ({ authors }) => {
  return (
    <div className="flex border-t-[1px] border-slate-200 py-6 px-4">
      <div className="w-2/5">{authors.author}</div>
      <div className="w-1/5">{authors.duty}</div>
      <div className="w-1/5">{authors.status ? "Online" : "Offline"}</div>
      <div className="w-1/5">{authors.employed}</div>
      <button className="w-1/5 text-left hover:text-blue-400">Edit</button>
    </div>
  );
};

export default Item;
