import React, { useState } from "react";

const FIFOSimulator = () => {
  const [frames, setFrames] = useState(Array(10).fill(null));
  const [pageFaults, setPageFaults] = useState(0);
  const [nextPage, setNextPage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const addFrame = () => {
    if (!nextPage) return;

    const newFrames = [...frames];
    const pageNum = parseInt(nextPage);

    // Check if page already exists
    if (!newFrames.includes(pageNum)) {
      newFrames[currentIndex] = pageNum;
      setPageFaults((prev) => prev + 1);
      setCurrentIndex((currentIndex + 1) % frames.length);
    }

    setFrames(newFrames);
    setNextPage("");
  };

  const reset = () => {
    setFrames(Array(10).fill(null));
    setPageFaults(0);
    setCurrentIndex(0);
    setNextPage("");
  };

  const efficiency = Math.round(
    ((frames.filter((f) => f !== null).length - pageFaults) /
      Math.max(1, frames.filter((f) => f !== null).length)) *
      100
  );

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">FIFO Algorithm Simulation</h4>

      {/* Memory Frames Display */}
      <div className="grid grid-cols-10 gap-1">
        {frames.map((frame, index) => (
          <div
            key={index}
            className={`aspect-square flex items-center justify-center border ${
              frame !== null ? "bg-blue-200 text-blue-900" : "bg-blue-100/20"
            } rounded`}
          >
            {frame}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4  ">
        <input
          type="number"
          value={nextPage}
          onChange={(e) => setNextPage(e.target.value)}
          className="w-24 px-3 py-2 rounded text-white placeholder:text-white border-2 border-white "
          placeholder="Pages"
        />
        <button
          onClick={addFrame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Add Frame
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="space-y-1 text-sm">
        <p>Page Faults: {pageFaults}</p>
        <p>Efficiency: {efficiency}%</p>
      </div>
    </div>
  );
};

export default FIFOSimulator;
