import React from 'react';

interface LoadingPageProps {
  progress: number;
}

const LoadingPage = ({ progress }: LoadingPageProps) => {
  return (
    <div className="loading-page fixed inset-0 bg-background/80 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#0d0d0d] p-8 rounded-lg shadow-xl border border-[#f60d54]/20">
        <div className="page">
          <div className="page__loader">
            <div className="uia-text-loader" data-uia-text-loader-type="uia-text-loader-type-1">
              <div className="uia-text-loader__text">
                {'Loading'.split('').map((letter, index) => (
                  <span key={index} className="uia-text-loader__letter">
                    <span className="uia-text-loader__letter-placeholder" aria-hidden="true">{letter}</span>
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="counter text-center relative w-[200px] mt-4">
          <h1 className="text-white text-[40px]">{Math.round(progress)}%</h1>
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