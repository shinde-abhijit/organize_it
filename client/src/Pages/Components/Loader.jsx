import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-14 h-14 border-4 border-red-500 border-dashed rounded-full animate-spin" ></div>
    </div>
  );
};

export default Loader;
