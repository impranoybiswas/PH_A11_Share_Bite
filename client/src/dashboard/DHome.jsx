import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useMyFoods from "../hooks/useMyFoods";
import useFoods from "../hooks/useFoods";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DHome() {
const { foods } = useFoods()
  const { myFoods } = useMyFoods();

  console.log(myFoods);

  const totalFoods = foods.length;
  const totalMyFoods = myFoods.length;

  

  const cards = [
    {
      name: "Total Foods",
      count: totalFoods,
    },
    {
      name: "My Foods",
      count: totalMyFoods,
    },
  ];

  // Bar chart data
  const chartData = {
    labels: ["Total Foods", "My Foods"],
    datasets: [
      {
        label: "Food Contribution",
        data: [totalFoods || 0, totalMyFoods || 0],
        backgroundColor: ["rgba(255, 99, 132, 0.7)", "rgba(54, 162, 235, 0.7)"],
        borderRadius: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Food Contribution Overview" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="pt-10 px-2 pb-5 space-y-10">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((item, index) => (
          <div
            key={index}
            className="w-full h-52 shadow-md rounded-lg overflow-hidden flex justify-center items-center border border-secondary relative flex-col gap-5 bg-secondary/10 hover:shadow-lg transition-all duration-300 py-5"
          >
            <span className="w-28 h-28 lg:w-40 lg:h-40 rounded-full shadow-sm flex justify-center items-center bg-secondary text-white text-3xl md:text-5xl font-bold">
              {item.count}
            </span>
            <h1 className="text-xl lg:text-3xl font-semibold text-secondary">
              {item.name}
            </h1>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-base-100 p-5 rounded-lg shadow-md">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
