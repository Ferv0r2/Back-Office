import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Card from "components/UI/Card";
import contents from "layout/navContents";

const Sidebar = () => {
  const router = useRouter();

  const navItem = contents.map((v) => {
    return (
      <Link href={v.url}>
        <li
          key={v.id}
          className={`${
            router.pathname === v.url ? "bg-red-500 rounded-md" : ""
          } flex items-center list-none p-3 my-2 cursor-pointer`}
        >
          {v.icon}
          <p className="ml-3">{v.name}</p>
        </li>
      </Link>
    );
  });

  return (
    <header className="fixed top-4 left-4 w-64">
      <Card className="bg-[#1f283e] text-zinc-100 p-4 h-[95vh]">
        <p className="py-4 font-bold text-lg text-center">METAONEER</p>
        <div className="my-2 h-px bg-gradient-to-r from-zinc-200 to-slate-500" />
        <nav className="p-2">{navItem}</nav>
      </Card>
    </header>
  );
};

export default Sidebar;
