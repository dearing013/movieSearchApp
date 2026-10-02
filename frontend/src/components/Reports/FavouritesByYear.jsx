import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

/**
 * FavouritesByYear
 * - Reads state.auth.favouriteMovies
 * - Extracts a single year per movie (prefers a parsed start year from ranges like "1999–2001")
 * - Groups counts by year and shows a simple bar chart
 */
const parseYear = (yearRaw) => {
  if (!yearRaw) return null;
  const s = String(yearRaw).trim();
  // try to find any 4-digit year (common formats and ranges)
  const match = s.match(/\b(18|19|20)\d{2}\b/);
  if (match) return parseInt(match[0], 10);
  // if it's a range like "1999–2001" without explicit digits captured above, normalize and take first part
  const normalized = s.replace(/[–—]/g, "-");
  const first = normalized.split("-")[0]?.trim();
  const n = parseInt(first, 10);
  return Number.isNaN(n) ? null : n;
};

const FavouritesByYear = ({ title = "Favourite movies by year" }) => {
  const favourites = useSelector((state) => state.auth?.favouriteMovies ?? []);

  // debug: inspect incoming favourites to confirm Year fields
  // Remove or comment out in production
  console.log("FavouritesByYear - favourites sample:", favourites.slice(0, 10));

  const data = useMemo(() => {
    const counts = (favourites || []).reduce((acc, m) => {
      const rawYear = m?.Year ?? m?.year ?? m?.Released ?? "";
      const year = parseYear(rawYear);
      if (!year) return acc;
      acc[year] = (acc[year] ?? 0) + 1;
      return acc;
    }, {});

    const years = Object.keys(counts)
      .map((y) => parseInt(y, 10))
      .filter((y) => !Number.isNaN(y))
      .sort((a, b) => a - b);

    return years.map((y) => ({ year: String(y), count: counts[y] }));
  }, [favourites]);

  if (!data.length) {
    return (
      <div style={{ width: "100%", height: 220, padding: 12 }}>
        <h4 style={{ margin: 4 }}>{title}</h4>
        <div style={{ color: "#666", marginTop: 12 }}>
          No favourite movies with valid year data to display. Check console to inspect favourites Year values.
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: 320 }}>
      <h4 style={{ margin: "8px 0" }}>{title}</h4>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 24 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -8 }} />
          <YAxis allowDecimals={false} label={{ value: "Count", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend verticalAlign="top" height={28} />
          <Bar dataKey="count" name="Saved" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FavouritesByYear;