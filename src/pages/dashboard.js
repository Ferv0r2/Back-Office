import React from "react";
import HighChart from "components/Chart/HighChart";

function Dashboard() {
  const chartData = [40000, 50000, 60000, 70000, 100000, 1240000, 1243012];
  const chartData2 = [1040000, 1240000, 1243012];
  const chartData3 = [40000, 50000, 60000, 70000];

  return (
    <div className="flex flex-wrap pt-12 pl-80 pr-12 min-h-screen">
      <div className="max-w-2xl m-8">
        <HighChart chartData={chartData} />
      </div>
      <div className="max-w-2xl m-8">
        <HighChart chartData={chartData2} />
      </div>
      <div className="max-w-2xl m-8">
        <HighChart chartData={chartData3} />
      </div>
    </div>
  );
}

export default Dashboard;
