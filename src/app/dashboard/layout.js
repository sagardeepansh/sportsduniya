'use client'
import { useState } from 'react';
import { Home, Users, Settings, BarChart, LogOut, Sun, Moon } from 'lucide-react';


export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Users, label: 'News/Blogs', href: '/dashboard/news-list' },
    { icon: BarChart, label: 'Analytics', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
  ];
  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 flex">
        <aside
          className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
        >
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          </div>
          <nav className="mt-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.label}
              </a>
            ))}
            <a
              href="#"
              className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 mt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <button className="lg:hidden" onClick={toggleSidebar}>
                  <svg
                    className="w-6 h-6 text-gray-900 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Welcome Back!</h2>
                <div className="flex items-center gap-4">
                  <button onClick={toggleDarkMode} className="text-gray-900 dark:text-gray-200">
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                  <span className="text-gray-700 dark:text-gray-300">John Doe</span>
                  <img className="h-8 w-8 rounded-full" src="https://i.pravatar.cc/150" alt="User avatar" />
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
          </main>
        </div>
      </div>
    </div>
  );
}
