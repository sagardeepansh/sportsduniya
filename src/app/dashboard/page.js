'use client';

import { useState } from 'react';
import { Home, Users, Settings, BarChart, LogOut, Sun, Moon } from 'lucide-react';

export default function Dashboard() {
 
  return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Cards */}
              {[
                {
                  title: 'Total Users',
                  value: '1,234',
                  change: '+5.2% from last month',
                  color: 'text-green-400',
                },
                {
                  title: 'Revenue',
                  value: '$12,345',
                  change: '+8.1% from last month',
                  color: 'text-green-400',
                },
                {
                  title: 'Active Sessions',
                  value: '456',
                  change: '-2.3% from last month',
                  color: 'text-red-400',
                },
              ].map((card, idx) => (
                <div key={idx} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{card.title}</h3>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                  <p className={`mt-1 text-sm ${card.color}`}>{card.change}</p>
                </div>
              ))}
            </div>
  );
}
