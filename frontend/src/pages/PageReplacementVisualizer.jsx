import React, { useState } from "react";
import FIFOPageReplacement from "../Algorithms/FIFOPageReplacement";
import LRUPageReplacement from "../Algorithms/LRUPageReplacement";
import LFUPageReplacement from "../Algorithms/LFUPageReplacement";

const PageReplacementVisualizer = () => {
  const [algorithm, setAlgorithm] = useState(null);

  // Algorithm color theme mapping
  const themeColors = {
    fifo: "blue",
    lru: "purple",
    lfu: "green",
  };

  // Get current theme color
  const currentColor = algorithm ? themeColors[algorithm] : "gray";

  // Algorithm descriptions
  const algorithmInfo = {
    fifo: {
      title: "First-In First-Out (FIFO)",
      description:
        "The FIFO page replacement algorithm works by replacing the oldest page in memory when a new page needs to be loaded and no free frames are available. It operates like a queue, where the first page to enter memory is the first to be replaced.",
      advantages: "Simple to implement and understand.",
      disadvantages:
        "May replace frequently used pages, leading to more page faults. Vulnerable to Belady's Anomaly.",
    },
    lru: {
      title: "Least Recently Used (LRU)",
      description:
        "The LRU page replacement algorithm works by replacing the page that has not been used for the longest period of time. It tracks when each page was last accessed and removes the least recently used page when a new page needs to be loaded.",
      advantages:
        "Better performance than FIFO as it utilizes temporal locality of reference.",
      disadvantages:
        "More complex to implement and requires tracking page access history.",
    },
    lfu: {
      title: "Least Frequently Used (LFU)",
      description:
        "The LFU page replacement algorithm replaces the page that has been used least frequently. It keeps a counter of how many times each page has been referenced and removes the page with the lowest count when a fault occurs.",
      advantages:
        "Works well for stable access patterns and can outperform LRU in some workloads.",
      disadvantages:
        "May retain pages that were frequently used in the past but are no longer needed. Requires additional overhead to maintain frequency counters.",
    },
  };

  return (
    <div className="min-h-screen text-black py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Page Replacement Algorithm Visualizer
        </h1>

        {/* Algorithm Selection */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Select an Algorithm
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setAlgorithm("fifo")}
              className={`px-6 py-3 rounded-lg font-medium transition-all 
                ${
                  algorithm === "fifo"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50"
                }`}
            >
              First-In First-Out (FIFO)
            </button>

            <button
              onClick={() => setAlgorithm("lru")}
              className={`px-6 py-3 rounded-lg font-medium transition-all 
                ${
                  algorithm === "lru"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-purple-50"
                }`}
            >
              Least Recently Used (LRU)
            </button>

            <button
              onClick={() => setAlgorithm("lfu")}
              className={`px-6 py-3 rounded-lg font-medium transition-all 
                ${
                  algorithm === "lfu"
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-green-50"
                }`}
            >
              Least Frequently Used (LFU)
            </button>
          </div>
        </div>

        {/* Algorithm Description */}
        {algorithm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-3">
              {algorithmInfo[algorithm].title}
            </h2>

            <p className="text-gray-700">
              {algorithmInfo[algorithm].description}
            </p>

            <div className="mt-3 text-sm text-gray-600">
              <strong>Advantages:</strong> {algorithmInfo[algorithm].advantages}
              <br />
              <strong>Disadvantages:</strong>{" "}
              {algorithmInfo[algorithm].disadvantages}
            </div>
          </div>
        )}

        {/* Load the selected algorithm component */}
        {algorithm === "fifo" && <FIFOPageReplacement />}
        {algorithm === "lru" && <LRUPageReplacement />}
        {algorithm === "lfu" && <LFUPageReplacement />}

        {/* Default message when no algorithm is selected */}
        {!algorithm && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No Algorithm Selected
            </h3>
            <p className="mt-2 text-gray-600">
              Please select one of the page replacement algorithms above to view
              its visualization.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageReplacementVisualizer;
