"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatCustomDate } from "../../utils/formatDate";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useSelector } from "react-redux";

export default function NewsList() {
  // const [articles, setArticles] = useState([]);
  const articles = useSelector((state) => state.news.newsItems);
  const [rate, setRate] = useState(localStorage.getItem("payoutRate") || 10);

  useEffect(() => {
      localStorage.setItem("payoutRate", rate);
  }, [rate]);

  const authorCount = articles.reduce((acc, article) => {
    const author = article?.fields?.byline || "Unknown";
    acc[author] = (acc[author] || 0) + 1;
    return acc;
  }, {});

  const exportCSV = () => {
    const headers = ["Author", "Articles", "Payout"];
    const rows = Object.entries(authorCount).map(([author, count]) => [
      author,
      count,
      `$${(count * rate).toFixed(2)}`,
    ]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "payouts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    
    const tableColumn = ["Author", "Articles", "Payout"];
    const tableRows = Object.entries(authorCount).map(([author, count]) => [
      author,
      count,
      `$${(count * rate).toFixed(2)}`,
    ]);
  
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });
  
    doc.save("payouts.pdf");
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Payouts</h2>

      <div className="mb-4">
        <label className="font-medium">Rate per article: </label>
        <input
          type="text"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="border px-2 py-1 ml-2"
        />
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={exportCSV}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Export CSV
        </button>
        <button
          onClick={exportPDF}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Export PDF
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
            <th className="border border-gray-300 px-4 py-2">Articles</th>
            <th className="border border-gray-300 px-4 py-2">Payout</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(authorCount).map(([author, count]) => (
            <tr key={author}>
              <td className="border border-gray-300 px-4 py-2">{author}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{count}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                ${(count * rate).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
