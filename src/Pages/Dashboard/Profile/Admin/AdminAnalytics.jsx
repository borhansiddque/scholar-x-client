import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import axios from "axios";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const AdminAnalytics = () => {
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [appliedRes, usersRes, scholarshipsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/all-applied-scholarships`),
          axios.get(`${import.meta.env.VITE_API_URL}/users`),
          axios.get(`${import.meta.env.VITE_API_URL}/all-scholarships`),
        ]);

        const appliedCount = appliedRes.data.length;
        const usersCount = usersRes.data.length;
        const scholarshipsCount = scholarshipsRes.data.scholarships.length;

        setSummaryData([
          { name: "Applied", count: appliedCount },
          { name: "Users", count: usersCount },
          { name: "Scholarships", count: scholarshipsCount },
        ]);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        System Summary Overview
      </h2>
      {summaryData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={summaryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8">
              {summaryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500">Loading summary data...</p>
      )}
    </div>
  );
};

export default AdminAnalytics;
