/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import "./dashboard.scss";

const Dashboard = function ({ percentage }: { percentage: Percentage }) {
  const { General, Crypto, DrugsAndWeapons, Hacking, AdultsContent } =
    percentage;
  Chart.register(ArcElement, DoughnutController, Tooltip, Legend, Title);
  const data = {
    labels: [
      "General",
      "Crypto",
      "Drugs And Weapons",
      "Hacking",
      "Illegal Adult Content",
    ],
    datasets: [
      {
        label: "% of pastes",
        data: [General, Crypto, DrugsAndWeapons, Hacking, AdultsContent],
        backgroundColor: [
          "rgb(0, 176, 38)",
          "rgb(252, 149, 23)",
          "rgb(70, 137, 219)",
          "rgb(255, 226, 5)",
          "rgb(215, 20, 55)",
        ],
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 12,
          },
          boxWidth: 10,
          boxHeight: 10,
        },
        position: "right",
      },
      title: {
        display: true,
        text: "% of pastes by category",
        font: {
          size: 20,
        },
      },
    },
  };
  return (
    <div className="wrap-doughnut">
      <div className="doughnutDiv">
        {/* @ts-ignore */}
        <Doughnut options={options} data={data} />
      </div>
    </div>
  );
};
export default Dashboard;
