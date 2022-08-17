import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, []);

  return <div className="flex flex-wrap pt-12 pl-80 pr-12 min-h-screen" />;
};

export default Dashboard;
