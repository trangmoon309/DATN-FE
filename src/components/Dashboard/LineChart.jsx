import React from "react";
import { Line } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'
import Chart from 'chart.js/auto'

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Successful Transactions",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "Fail Transactions",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774"
    }
  ]
};

export default function LineChart({datas}) {
  Chart.register(CategoryScale)
  return (
    <div className="App">
      <Line data={data} />
    </div>
  );
}
