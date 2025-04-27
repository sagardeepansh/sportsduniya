"use client";

import { useState } from "react";
import ArticleTypeChart from "@/app/components/ArticleTypeChart";
import ArticleAuthorChart from "@/app/components/ArticleAuthorChart";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const articles = useSelector((state) => state.news.newsItems);
  // console.log("articles", articles);
  return (
    <div>
      <div className="flex flex-wrap md:flex-nowwrap">
        <div className="md:w-6/12 w-12/12 my-5 md:my-0">
          <h2>By Type</h2>
          <ArticleTypeChart articles={articles} />
        </div>
        <div className="md:w-6/12 w-12/12  my-5 md:my-0">
          <h2>By Author</h2>
          <ArticleAuthorChart articles={articles} />
        </div>
      </div>
    </div>
  );
}
