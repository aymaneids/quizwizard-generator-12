import React, { useEffect, useState } from 'react';

const LoadingPage = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-page fixed inset-0 bg-[#0d0d0d] flex justify-center items-center z-50">
      <div className="counter text-center relative w-[200px]">
        <p className="text-[40px] font-thin text-[#f60d54]">loading</p>
        <h1 className="text-white text-[60px] -mt-[10px]">{counter}%</h1>
        <div 
          className="h-[1px] bg-[#f60d54] transition-all duration-50 ease-linear" 
          style={{ width: `${counter}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingPage;