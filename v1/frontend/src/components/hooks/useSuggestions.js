import { useState, useEffect } from "react";
import axios from "axios";

export function useSuggestions(query, endpoint) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/${endpoint}?namePrefix=${query}`);
        setSuggestions(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setSuggestions([]);
      }
    };

    fetchData();
  }, [query, endpoint]);

  return suggestions;
}
