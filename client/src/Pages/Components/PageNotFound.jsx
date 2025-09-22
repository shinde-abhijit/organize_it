import React from 'react';

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-9xl font-bold text-gray-300">404</h1>
      <h2 className="text-3xl font-semibold mt-4 text-gray-700">Page Not Found</h2>
      <p className="text-gray-500 mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Home
      </a>
    </div>
  );
};

export default PageNotFound;
