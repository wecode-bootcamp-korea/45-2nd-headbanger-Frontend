// useFetchData.js

import { useEffect } from 'react';

const useFetchData = (url, dispatch, setProductData) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        dispatch(setProductData(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [url, dispatch, setProductData]);
};

export default useFetchData;
