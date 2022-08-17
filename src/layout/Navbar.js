import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { TiHome } from "react-icons/ti";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="flex ml-80 pt-12 text-zinc-200 text-sm">
      <div className="flex opacity-70 items-center">
        <Link href="/">
          <TiHome className="text-lg" />
        </Link>
        <p className="ml-2">/</p>
      </div>
      <p className="ml-2">
        {router.pathname === "/"
          ? "DASHBOARD"
          : router.pathname.slice(1).toUpperCase()}
      </p>
    </div>
  );
};

export default Navbar;
