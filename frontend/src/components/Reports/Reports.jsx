import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { useSelector } from "react-redux";
import FavouritesByYear from "./FavouritesByYear";

const baselineDates = [
  "2026-09-20",
  "2026-09-21",
  "2026-09-22",
  "2026-09-23",
  "2026-09-24",
  "2026-09-25",
];


const Reports = () => {

  const favourites = useSelector((state) => state.auth?.favouriteMovies ?? []);
  console.log("favourites in Reports", favourites);
  const savedCount = Array.isArray(favourites) ? favourites.length : 0;

  const pointsCount = Math.max(savedCount, baselineDates.length);
  const data = Array.from({ length: pointsCount }).map((_, i) => {
    const savedVal = Math.min(i + 1, savedCount);
    return {
      date: baselineDates[i] ?? `T${i + 1}`,
      saved: savedVal, // will be used as X axis numeric value
      index: i + 1, // plotted on Y axis
    };
  });

   return (
    <div style={{ width: "100%", height: 320, margin: "43px 0 0 0", }} aria-label="Saved movies over time">
      <h3 style={{ margin: "8px 0" }}>Saved Movies - {localStorage.userName}</h3>
      <div style={{ fontSize: 14, marginBottom: 8 }}>Current saved count: {savedCount}</div>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 32 }}>
          <CartesianGrid strokeDasharray="3 3" />
          {/* X axis shows the number of saved movies (numeric) */}
          <XAxis
            dataKey="saved"
            type="number"
            domain={[0, "dataMax"]}
            tickCount={Math.max(savedCount + 1, 5)}
            label={{ value: "Saved movies (count)", position: "insideBottom", offset: -8 }}
          />
          {/* Y axis is a simple index to give the line some vertical range */}
          <YAxis dataKey="index" allowDecimals={false} label={{ value: "Point", angle: -90, position: "insideLeft" }} />
          <Tooltip formatter={(value, name, payload) => {
    
            if (name === 'index') return [`#${value}`, 'Point'];
            if (name === 'saved') return [value, 'Saved count'];
            return [value, name];
          }} />
          <Legend verticalAlign="top" height={36} />
          {/* draw the line using the index as Y; X is taken from dataKey on XAxis */}
          <Line type="monotone" dataKey="index" stroke="#1976d2" strokeWidth={2} dot />
        </LineChart>
      </ResponsiveContainer>

      <FavouritesByYear />
    </div>
  );
};

export default Reports;