"use client";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { formatCustomDate } from "../../utils/formatDate";

import { useDispatch, useSelector } from "react-redux";
import { setNews } from "../../store/newsSlice";
import { useSearchParams } from 'next/navigation';


export default function NewsList() {
  // const [articles, setArticles] = useState([]);
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.news.newsItems);
  const searchParams = useSearchParams();
  const search_q = searchParams.get('search');


  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(13); // default
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 5072d672a4674471b1f385d8f4903a17

  const fetchNews = async (page = 1) => {
    // const search = localStorage.getItem("searchHis");

    if (!search_q) {
      try {
        const response = await fetch(`/api/news?page=${page}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        dispatch(setNews(data?.response?.results || []));
        setTotal(data?.response?.total || 0);
        setPageSize(data?.response?.pageSize || 13);
        setCurrentPage(page);
        // setArticles(data?.response?.results || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }
    // localStorage.removeItem('searchHis');
  };

  useEffect(() => {
      fetchNews(currentPage);
  }, [dispatch, search_q]);

  const totalPages = Math.ceil(total / pageSize);

  const handleNext = () => {
    if (currentPage < totalPages) {
      fetchNews(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      fetchNews(currentPage - 1);
    }
  };
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    fetchNews(event.selected + 1);
  };

  return (
    <div>
      <h1>Top Headlines</h1>
      <div className="news-list">
        <div className="main-news">
          {articles.map(
            (article, index) =>
              index === 0 && (
                <div key={index} className="item md:flex-nowrap flex-wrap flex items-center gap-10">
                  <div className="image md:w-6/12 ">
                    <img
                      src={
                        article?.fields?.thumbnail ||
                        "https://placehold.co/600x400"
                      }
                      className="rounded-3xl"
                    />
                  </div>
                  <div className="content md:w-6/12">
                    <div className="pb-2">
                      <ul className="flex gap-[32px] news-top">
                        <li className="text-blue-800 font-semibold">
                          {" "}
                          {article?.sectionName}
                        </li>
                        <li className="text-gray-500">
                          {formatCustomDate(article?.webPublicationDate)}
                        </li>
                      </ul>
                    </div>
                    <p className="headline">
                      {article?.webTitle?.length > 65
                        ? article.webTitle.slice(0, 63) + "..."
                        : article.webTitle}
                    </p>
                    <p
                      className="description"
                      dangerouslySetInnerHTML={{
                        __html: (() => {
                          if (!article?.fields?.body) return "";
                          const doc = new DOMParser().parseFromString(
                            article.fields.body,
                            "text/html"
                          );
                          const text = doc.body.textContent || "";
                          return text.length > 150
                            ? text.slice(0, 150) + "..."
                            : text;
                        })(),
                      }}
                    ></p>
                  </div>
                </div>
              )
          )}
        </div>
        <div className="main-listing py-10">
          <div className="flex flex-wrap gap-[30px] ">
            {articles.map(
              (article, index) =>
                index != 0 && (
                  <div key={index} className="md:w-2/9  w-12/12">
                    <div className="item">
                      <img
                        src={
                          article?.fields?.thumbnail ||
                          "https://placehold.co/400"
                        }
                        className="rounded-3xl"
                      />
                      <div className="pt-3 pb-2">
                        <ul className="flex gap-[24px] news-top">
                          <li className="text-blue-800 font-semibold">
                            {article?.sectionName}
                          </li>
                          <li className="text-gray-500">
                            {formatCustomDate(article?.webPublicationDate)}
                          </li>
                        </ul>
                      </div>
                      <p className="headline">
                        {article?.webTitle?.length > 64
                          ? article.webTitle.slice(0, 64) + "..."
                          : article.webTitle}
                      </p>
                      <p
                        className="description"
                        dangerouslySetInnerHTML={{
                          __html: (() => {
                            if (!article?.fields?.body) return "";
                            const doc = new DOMParser().parseFromString(
                              article.fields.body,
                              "text/html"
                            );
                            const text = doc.body.textContent || "";
                            return text.length > 150
                              ? text.slice(0, 150) + "..."
                              : text;
                          })(),
                        }}
                      ></p>
                    </div>
                  </div>
                )
            )}
          </div>
          <ReactPaginate
            previousLabel={"←"}
            className="justify-center mt-10 flex-wrap md:flex-nowwrap flex gap-2"
            nextLabel={"→"}
            pageCount={totalPages}
            onPageChange={handlePageClick}
            containerClassName={"flex gap-2"}
            pageLinkClassName={"px-3 py-1 border rounded"}
            previousLinkClassName={"px-3 py-1 border rounded"}
            nextLinkClassName={"px-3 py-1 border rounded"}
            activeLinkClassName={"bg-blue-500 text-white"}
          />
          {/* <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-5 py-2 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              ← Previous
            </button>

            <span className="text-gray-700 font-medium">
              Page <span className="font-bold">{currentPage}</span> of{" "}
              <span className="font-bold">{totalPages}</span>
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-5 py-2 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Next →
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
