import React from "react";

const Difference = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Page Replacement Algorithms
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Compare different page replacement algorithms and understand their
          characteristics, advantages, and trade-offs.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
          <h2 className="text-2xl font-semibold text-white">
            Algorithm Comparison
          </h2>
        </div>

        <div className="overflow-x-auto p-6">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-lg font-semibold text-gray-900 bg-gray-50 rounded-tl-lg">
                  Feature
                </th>
                <th className="px-6 py-4 text-left text-lg font-semibold text-blue-700 bg-blue-50">
                  FIFO
                </th>
                <th className="px-6 py-4 text-left text-lg font-semibold text-purple-700 bg-purple-50">
                  LRU
                </th>
                <th className="px-6 py-4 text-left text-lg font-semibold text-green-700 bg-green-50">
                  LFU
                </th>
                <th className="px-6 py-4 text-left text-lg font-semibold text-red-700 bg-red-50 rounded-tr-lg">
                  Optimal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 font-medium text-gray-900">
                  Replacement Policy
                </td>
                <td className="px-6 py-4 text-blue-800">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Replaces oldest page
                  </div>
                </td>
                <td className="px-6 py-4 text-purple-800">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Replaces least recently used page
                  </div>
                </td>
                <td className="px-6 py-4 text-green-800">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Replaces least frequently used page
                  </div>
                </td>
                <td className="px-6 py-4 text-red-800">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                    Replaces page that won't be used for the longest time
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 font-medium text-gray-900">
                  Implementation
                </td>
                <td className="px-6 py-4">Simple queue</td>
                <td className="px-6 py-4">Requires access history</td>
                <td className="px-6 py-4">Requires frequency counters</td>
                <td className="px-6 py-4">Requires future knowledge</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 font-medium text-gray-900">
                  Performance
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Good for sequential access
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                    Good for temporal locality
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Good for stable access patterns
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                    Optimal under perfect knowledge
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 font-medium text-gray-900">
                  Belady's Anomaly
                </td>
                <td className="px-6 py-4 text-red-600">Susceptible</td>
                <td className="px-6 py-4 text-green-600">Not susceptible</td>
                <td className="px-6 py-4 text-green-600">Not susceptible</td>
                <td className="px-6 py-4 text-green-600">Not susceptible</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 font-medium text-gray-900">
                  Overhead
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-green-200 rounded-full">
                      <div className="w-4 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="ml-2">Low</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-yellow-200 rounded-full">
                      <div className="w-8 h-2 bg-yellow-500 rounded-full"></div>
                    </div>
                    <span className="ml-2">Medium</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-red-200 rounded-full">
                      <div className="w-12 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <span className="ml-2">Medium to High</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-blue-200 rounded-full">
                      <div className="w-10 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="ml-2">High</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Difference;
