import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function HighChart(props) {
  const { chartData } = props;

  const options = {
    chart: {
      type: "bar",
      backgroundColor: "#f7f7f7",
      shadow: true,
      borderRadius: 20,
    },
    title: {
      text: "Metaoneer",
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      type: "category",
    },
    legend: {
      reversed: true,
      margin: 8,
    },
    plotOptions: {
      series: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
          format: "<b>{point.y}</b>",
        },
      },
    },
    series: [{ name: "data", data: chartData }],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default HighChart;
