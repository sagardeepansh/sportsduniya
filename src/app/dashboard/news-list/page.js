"use client"
import { useEffect, useState } from "react";

export default function NewsList() {
  const [articles, setArticles] = useState([]);
  const newsItems = [
    { id: 1, title: 'India wins World Cup', summary: 'India clinched the title in a thrilling final match.' },
    { id: 2, title: 'Messi retires', summary: 'The football legend announces retirement from international play.' },
    { id: 3, title: 'Olympics 2024 Preview', summary: 'Highlights of athletes to watch out for in Paris.' },
  ];

  // 5072d672a4674471b1f385d8f4903a17

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div>
      <h1>Top Headlines</h1>
      {articles.map((article, index) => (
        <div key={index}>
          <h3>{article.title}</h3>
          {/* <p>{article.description}</p> */}
        </div>
      ))}
    </div>
  );
}
