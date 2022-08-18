import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function HighChart(props) {
  const { chartType, chartData } = props;

  const options = {
    chart: {
      type: chartType,
      backgroundColor: "#202940",
      shadow: true,
      borderRadius: 20,
      spacingTop: 40,
      spacingLeft: 40,
      spacingRight: 40,
      spacingBottom: 20,
    },
    title: {
      text: "Metaoneer",
      style: {
        color: "#ffffff",
      },
    },
    credits: {
      enabled: false,
    },
    // xAxis: {
    //   type: "category",
    // },
    xAxis: {
      gridLineWidth: 1,
    },
    yAxis: {
      gridLineWidth: 1,
    },
    legend: {
      reversed: true,
      margin: 8,
      textColor: "#fff",
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
