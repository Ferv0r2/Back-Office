import React from "react";
import SEO from "layout/SEO";
import Navbar from "layout/Navbar";
import Sidebar from "layout/Sidebar";

const Layout = (props) => {
  return (
    <>
      <SEO />
      <div className="bg-[#1a2035] font-[MavenPro]">
        <Navbar />
        <Sidebar />
        <main className="pt-12 pl-80 pr-12 min-h-screen">{props.children}</main>
      </div>
    </>
  );
};

export default Layout;
