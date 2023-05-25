// useFetchData.js 를 이용해 자료받은다음 리덕스로 올리는과정

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
