import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import "./UserActivityChart.css";

const activityDescriptions = {
  22: { name: "Breathing Exercise", label: "Breath", color: "#72A0C1", className: "breathing-bar", textClass: "breathing" },
  23: { name: "Inspirational Quote", label: "Quote", color: "#A7C7E7", className: "quote-bar", textClass: "quote" },
  24: { name: "Joke Generator", label: "Joke", color: "#B5EAD7", className: "joke-bar", textClass: "joke" },
};

const UserActivityChart = ({ activities }) => {
  console.log("🚀 Raw Activities Data:", activities);

  if (!activities.length) return <p>No activities recorded yet.</p>;

  const activityCounts = activities.reduce((acc, activity) => {
    const activityId = Number(activity.name);
    acc[activityId] = (acc[activityId] || 0) + 1;
    return acc;
  }, {});

  console.log("🧐 Processed Activity Counts:", activityCounts);

  const chartData = Object.keys(activityCounts).map((id) => {
    const activity = activityDescriptions[id] || { name: `Unknown Activity (${id})`, label: `Unknown (${id})`, color: "#CCCCCC", className: "", textClass: "" };
    console.log(`🔄 Mapping "${id}" → "${activity.name}"`);
    
    return {
      name: activity.label,
      count: activityCounts[id],
      color: activity.color,
      className: activity.className,
    };
  });

  console.log("📊 Final Chart Data:", chartData);

  return (
    <div className="chart-container">
      <h3>Your Activity Overview</h3>
      <div className="graph-wrapper">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={chartData}
            barSize={window.innerWidth < 768 ? 60 : 150}
            margin={{
              top: 40,
              right: window.innerWidth < 768 ? 20 : 100,
              left: window.innerWidth < 768 ? 20 : 100,
              bottom: window.innerWidth < 768 ? 80 : 120,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: window.innerWidth < 768 ? 12 : 18 }} interval={0} />
            <YAxis tick={{ fontSize: window.innerWidth < 768 ? 12 : 16 }} />
            <Tooltip />
            {chartData.map((data, index) => (
              <Bar key={index} dataKey="count" fill={data.color} radius={[10, 10, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="activity-list">
        <h3>📋 Activity Breakdown:</h3>
        <ul>
          {Object.keys(activityCounts).map((id) => {
            const activity = activityDescriptions[id] || { name: `Unknown Activity (${id})`, textClass: "" };
            return (
              <li key={id} className={activity.textClass}>
                <strong>{activity.name}</strong>: {activityCounts[id]} times
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
  
};

export default UserActivityChart;
