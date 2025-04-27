// components/ArticleTypeChart.js
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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const generateColors = (count) => {
  const colors = [];
  const baseColors = [
    "rgba(75, 192, 192, 0.6)", // teal
    "rgba(255, 99, 132, 0.6)", // red
    "rgba(54, 162, 235, 0.6)", // blue
    "rgba(153, 102, 255, 0.6)", // purple
    "rgba(255, 159, 64, 0.6)",  // orange
  ];

  for (let i = 0; i < count; i++) {
    colors.push(baseColors[i % baseColors.length]); // Loop through the baseColors array
  }

  return colors;
};

const ArticleTypeChart = ({ articles }) => {
  // Process data to get counts by article type
  const typeCounts = articles.reduce((acc, article) => {
    acc[article.sectionName] = (acc[article.sectionName] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for Chart.js
  const data = {
    labels: Object.keys(typeCounts),
    datasets: [
      {
        data: Object.values(typeCounts), // Values from typeCounts
        backgroundColor: generateColors(Object.keys(typeCounts).length),
        borderColor: generateColors(Object.keys(typeCounts).length).map(color => color.replace('0.6', '1')), // Make border colors more solid
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Article Distribution by Category",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ArticleTypeChart;