// utils/api.js
import axios from 'axios';

export const fetchData = async (url, setLoading, setError, setData) => {
  setLoading(true);
  setError(null);
  try {
    const response = await axios.get(url);
    setData(response.data);
    setLoading(false);
  } catch (error) {
    setError(error);
    setLoading(false);
  }
};