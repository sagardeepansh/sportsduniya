// components/ArticleAuthorChart.js
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ArticleAuthorChart = ({ articles }) => {
  // Process data to get counts by author
  const authorCounts = articles.reduce((acc, article) => {
    const author = article?.fields?.byline || "Unknown";
    acc[author] = (acc[author] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for Chart.js
  const data = {
    labels: Object.keys(authorCounts),
    datasets: [
      {
        label: "Articles by Author",
        data: Object.values(authorCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
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
        text: "Article Distribution by Author",
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default ArticleAuthorChart;