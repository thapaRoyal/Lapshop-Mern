import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingToRedirects = () => {
  const [count, setCount] = useState(5);
  let history = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && history.push('/');

    // cleanup
    return () => clearInterval(interval);
  }, [count, history]);
  return (
    <div className="container p-5 text-center">
      <p>Redirecting you in {count} seconds</p>
      <LoadingOutlined className="h1" />
    </div>
  );
};

export default LoadingToRedirects;
