"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const useGallery = () => {
  const [galeries, setGaleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchGaleries = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}/api/galery`);
        setGaleries(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGaleries();
  }, [baseURL]);

  return { galeries, loading, error };
};

export default useGallery;
