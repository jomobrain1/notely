const rawApiUrl = import.meta.env.VITE_API_URL || "https://notely-dusky.vercel.app/api";

export const API_URL = rawApiUrl.replace(/\/+$/, "");
