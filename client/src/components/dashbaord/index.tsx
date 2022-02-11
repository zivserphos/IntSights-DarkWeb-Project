/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import Doughnut from "./Doughnut";
import Barchart from "./BarChart";

const Dashboard = function ({ percentage }: { percentage: Percentage }) {
  return (
    <div className="dashboardDiv">
      <div className="doughnutDiv">
        {/* @ts-ignore */}
        <Doughnut percentage={percentage} />
      </div>
      <Barchart percentage={percentage} />
    </div>
  );
};

export default Dashboard;
