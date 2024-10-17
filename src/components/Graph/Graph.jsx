import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";
import "./Graph.css";

const ExpensesDonut = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "donut",
        height: 350,
      },
      labels: ["Income", "Expenses"],
      colors: ["#00E396", "#FF4560"],
      legend: {
        position: "bottom",
      },
      plotOptions: {
        donut: {
          size: "70%",
        },
      },
      dataLabels: {
        enabled: true,
      },
    },
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/expenses");
        const data = response.data;

        let totalIncome = 0;
        let totalExpenses = 0;

        data.forEach((item) => {
          if (item.type === "credit") {
            totalIncome += item.amount;
          } else if (item.type === "debit") {
            totalExpenses += item.amount;
          }
        });

        console.log("Total Income:", totalIncome);
        console.log("Total Expenses:", totalExpenses);

        setChartData((prevState) => ({
          ...prevState,
          series: [totalIncome, totalExpenses],
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchExpenses();
  }, []);

  console.log("Chart Data:", chartData);

  return (
    <div className="pieContainer">
      <h2>Income vs Expenses</h2>
      <ApexCharts
        options={chartData.options}
        series={chartData.series}
        type="donut"
        height={350}
      />
    </div>
  );
};

export default ExpensesDonut;
