import React from "react";
import HighChart from "components/Chart/HighChart";

const Dashboard = () => {
  const chartData = [40000, 50000, 60000, 70000, 100000, 1240000, 1243012];
  const chartData2 = [1040000, 1240000, 1243012];
  const chartData3 = [40000, 50000, 60000, 70000];
  const chartData4 = [2000, 6125, 34355, 40000, 50000, 60000, 110000];

  return (
    <div className="flex flex-wrap">
      <div className="max-w-2xl m-8">
        <HighChart chartType="bar" chartData={chartData} />
      </div>
      <div className="max-w-2xl m-8">
        <HighChart chartType="pie" chartData={chartData2} />
      </div>
      <div className="max-w-2xl m-8">
        <HighChart chartType="spline" chartData={chartData3} />
      </div>
      <div className="max-w-2xl m-8">
        <HighChart chartType="scatter" chartData={chartData4} />
      </div>
    </div>
  );
};

export default Dashboard;
