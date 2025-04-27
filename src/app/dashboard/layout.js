"use client";
import { useState } from "react";
import {
  Home,
  Users,
  Settings,
  BarChart,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { setNews } from "../store/newsSlice";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchHis") || ""
  );
  const [category, setCategory] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Users, label: "News/Blogs", href: "/dashboard/news-list" },
    { icon: BarChart, label: "Payout", href: "/dashboard/payout" },
    // { icon: Settings, label: "Settings", href: "#" },
  ];

  const fetchNewsSearch = async (searchdata) => {
    let url = `/api/news/search`;
    const params = new URLSearchParams();

    if (searchQuery) params.append("q", searchdata || searchQuery);
    if (category) params.append("section", category);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    // console.log('data', data)
    dispatch(setNews(data?.response?.results || []));
    router.push(`/dashboard/news-list?search=${searchQuery}`);
    localStorage.setItem("searchHis", searchQuery);

    // setArticles(data.response.results || []);
  };

  const handleremove = (e) => {
    e.preventDefault();
    setSearchQuery("");
    localStorage.removeItem("searchHis");
    router.push(`/dashboard/news-list`);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    fetchNewsSearch();
  };

  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
    });

    if (res.ok) {
      router.push("/login");
      localStorage.setItem("token", "");
      document.cookie = `token=; path=/; Secure; HttpOnly`;
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
        >
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
          </div>
          <nav className="mt-6">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </a>
            ))}
            <a
              onClick={(e) => handleLogout()}
              href="#"
              className="flex items-center px-4 py-2 mt-6 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-700 transition"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap justify-between items-center gap-4 py-4">
                {/* Mobile menu toggle */}
                <button className="block lg:hidden" onClick={toggleSidebar}>
                  <svg
                    className="w-6 h-6 text-gray-900 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                {/* Welcome Text */}
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex-1 text-center md:text-left">
                  Welcome Back!
                </h2>

                {/* Search Form */}
                <form
                  onSubmit={handleSearch}
                  className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto"
                >
                  <div className="relative flex-1 md:flex-none">
                    <input
                      type="text"
                      placeholder="Search news..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border border-gray-300 rounded-3xl text-sm px-4 py-2 w-full md:w-64"
                    />
                    {searchQuery && (
                      <svg
                        onClick={(e) => handleremove(e)}
                        className="absolute right-3 top-2.5 w-5 h-5 text-gray-500 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </div>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-gray-300 rounded-3xl text-sm px-4 py-2 w-full md:w-40"
                  >
                    <option value="">All Categories</option>
                    <option value="business">Business</option>
                    <option value="sport">Sport</option>
                    <option value="technology">Technology</option>
                    <option value="environment">Environment</option>
                    <option value="world">World</option>
                  </select>

                  <button
                    type="submit"
                    className="bg-blue-800 text-white text-sm px-4 py-2 rounded-3xl hover:bg-blue-700 transition"
                  >
                    Search
                  </button>
                </form>

                {/* User Info */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleDarkMode}
                    className="text-gray-900 dark:text-gray-200"
                  >
                    {darkMode ? (
                      <Sun className="w-5 h-5 hidden md:block" />
                    ) : (
                      <Moon className="w-5 h-5 hidden md:block" />
                    )}
                  </button>
                  <span className="hidden md:block text-gray-700 dark:text-gray-300 text-sm">
                    John Doe
                  </span>
                  <img
                    className="h-8 w-8 hidden md:block rounded-full"
                    src="https://i.pravatar.cc/150"
                    alt="User avatar"
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
