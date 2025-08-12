import React from "react";
import StatCard from "./StatCard";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const visitorData = [
  { name: 'Jan-Jun', visitors: 5000000, color: '#1e40af' },
];

function Charts() {
  const populationGrowthData = [
    { name: '2021', population: 5228000 },
    { name: '2022', population: 5461000 },
    { name: '2023', population: 5708000 },
    { name: '2024', population: 5957000 },
  ];

  return (
    <div className="min-h-screen min-w-screen snap-start bg-gray-100 p-4 md:p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-10">Addis Ababa City Stats</h1>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-10">
          <StatCard
            title="Population"
            value={5957000}
            unit="2025 Est."
            icon="👥"
          />
          <StatCard
            title="Area"
            value={527}
            unit="sq. km"
            icon="🗺️"
          />
          <StatCard
            title="Visitors"
            value={5000000}
            unit="past 6 months"
            icon="✈️"
          />
          <StatCard
            title="Revenue"
            value={111000000000}
            unit="Birr (past 6 months)"
            icon="💰"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Population Growth Chart */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4">Population Growth (2021-2024)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={populationGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                  domain={[5000000, 'auto']}
                />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="population" stroke="#3b82f6" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Visitor Stats Chart */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4">Visitors (Past 6 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip />
                <Bar dataKey="visitors" fill="#1e40af" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
