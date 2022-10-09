import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Title,
} from "chart.js";
function OrderGraph({ order }) {
  ChartJS.register(
    BarElement,
    PointElement,
    LineElement,
    LinearScale,
    CategoryScale,
    Title
  );

  const totalOrdered = order.reduce(
    (sum, item) => (sum = [...sum, item.totalOrdered]),
    []
  );

  const date = order.reduce((sum, item) => {
    const formatted = moment(item.date).format("DD/MM/YYYY");
    return (sum = [...sum, formatted]);
  }, []);

  const data = {
    labels: date,
    datasets: [
      {
        label: date,
        data: totalOrdered,
        borderColor: "rgba(0, 99, 29, 0.5)",
      },
    ],
  };
  return (
    <div className="w-[1200px]">
      <Line
        data={data}
        options={{
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: true,
              text: "ยอดสัั่งซื้อทั้งหมดต่อวัน",
            },
          },
        }}
      />
    </div>
  );
}

export default OrderGraph;
