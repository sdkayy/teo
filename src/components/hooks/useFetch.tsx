import React, { useEffect } from 'react';

export default (url: string, options: any) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  useEffect(() => {
    const fetchReq = async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      }
    };
    fetchReq();
  }, []);
  return { response, error };
};
