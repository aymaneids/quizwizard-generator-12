import React from 'react';

interface LoadingPageProps {
  progress: number;
}

const LoadingPage = ({ progress }: LoadingPageProps) => {
  return (
    <div className="loading-page fixed inset-0 bg-background/80 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#0d0d0d] p-8 rounded-lg shadow-xl border border-[#f60d54]/20">
        <div className="counter text-center relative w-[200px]">
          <p className="text-[40px] font-thin text-[#f60d54]">loading</p>
          <h1 className="text-white text-[60px] -mt-[10px]">{Math.round(progress)}%</h1>
          <div 
            className="h-[1px] bg-[#f60d54] transition-all duration-300 ease-linear" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;