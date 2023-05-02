import React, { useState, useEffect } from "react";
import { Chart } from "chart.js/auto";
import axios from "../../../utils/axios";
import "./AdminChart.css";

const AdminChart = () => {
  const [bookings, setBookings] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  console.log(bookings);

  useEffect(() => {
    axios
      .get("/api/v1/get-revenue-booking")
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = document.getElementById("booking-chart").getContext("2d");
    console.log(ctx);
    const labels = bookings.map((booking) => booking.room_name);
    const revenue = bookings.map((booking) => parseFloat(booking.total_price));
    // console.log(revenue);
    const quantity = bookings.map((booking) => booking.quantity);
    // console.log(quantity);

    const newChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "revenue",
            data: revenue,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            yAxisID: "revenue-y-axis",
          },
          {
            label: "quantity",
            data: quantity,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            yAxisID: "quantity-y-axis",
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Doanh thu và Số lượng trên mỗi phòng đã đặt",
            font: {
              size: 18,
              weight: "bold",
            },
          },
        },
        scales: {
          "revenue-y-axis": {
            type: "linear",
            position: "left",
            ticks: {
              callback: function (value) {
                return value.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                  minimumFractionDigits: 0,
                });
              },
            },
            scaleLabel: {
              display: true,
              labelString: "Revenue",
            },
          },
          "quantity-y-axis": {
            type: "linear",
            position: "right",
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "Quantity",
            },
          },
        },
      },
    });
    setChartInstance(newChartInstance);
  }, [bookings]);

  return (
    <div className="adminChart_page">
      <canvas id="booking-chart" width="400" height="400"></canvas>
    </div>
  );
};

export default AdminChart;
