import React from 'react'

const Difference = () => {
  return (
  <>
    {/* Comparison Table - Always visible */}
    <div className=" max-w-5xl mx-auto bg-white rounded-lg shadow-xl p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Algorithm Comparison</h2>
        
        <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
            <thead>
            <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Feature</th>
                <th className="px-4 py-2 text-left">FIFO</th>
                <th className="px-4 py-2 text-left">LRU</th>
                <th className="px-4 py-2 text-left">LFU</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            <tr>
                <td className="px-4 py-2 font-medium">Replacement Policy</td>
                <td className="px-4 py-2">Replaces oldest page</td>
                <td className="px-4 py-2">Replaces least recently used page</td>
                <td className="px-4 py-2">Replaces least frequently used page</td>
            </tr>
            <tr>
                <td className="px-4 py-2 font-medium">Implementation</td>
                <td className="px-4 py-2">Simple queue</td>
                <td className="px-4 py-2">Requires access history</td>
                <td className="px-4 py-2">Requires frequency counters</td>
            </tr>
            <tr>
                <td className="px-4 py-2 font-medium">Performance</td>
                <td className="px-4 py-2">Good for sequential access</td>
                <td className="px-4 py-2">Good for temporal locality</td>
                <td className="px-4 py-2">Good for stable access patterns</td>
            </tr>
            <tr>
                <td className="px-4 py-2 font-medium">Belady's Anomaly</td>
                <td className="px-4 py-2">Susceptible</td>
                <td className="px-4 py-2">Not susceptible</td>
                <td className="px-4 py-2">Not susceptible</td>
            </tr>
            <tr>
                <td className="px-4 py-2 font-medium">Overhead</td>
                <td className="px-4 py-2">Low</td>
                <td className="px-4 py-2">Medium</td>
                <td className="px-4 py-2">Medium to High</td>
            </tr>
            </tbody>
        </table>
        </div>
    </div>
  </>
  )
}

export default Difference
