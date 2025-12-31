import React from "react";

const SkeletonCard = () => {
  return (
    <div className="animate-pulse mt-5 mb-5 bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-md flex flex-col gap-3">
      <div className="h-40 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
      <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
      <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded"></div>
      <div className="h-8 w-full bg-gray-300 dark:bg-gray-600 rounded-full mt-2"></div>
    </div>
  );
};

export default SkeletonCard;
