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
        <main>{props.children}</main>
      </div>
    </>
  );
};

export default Layout;
