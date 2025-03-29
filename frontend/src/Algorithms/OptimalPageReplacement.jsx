import React, { useState, useEffect } from "react";
import CodeSnippet from "../components/CodeSnippet";

const OptimalPageReplacement = () => {
  const [frames, setFrames] = useState(3);
  const [pageStr, setPageStr] = useState("1,2,3,4,1,2,5,1,2,3,4,5");
  const [delay, setDelay] = useState(1000);
  const [matrix, setMatrix] = useState([]);
  const [faults, setFaults] = useState(0);
  const [hits, setHits] = useState(0);
  const [step, setStep] = useState(0);
  const [active, setActive] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const code = `
// Optimal Page Replacement Algorithm implementation
function optimalPageReplacement(pageSequence, numFrames) {
  const frames = Array(numFrames).fill("-");
  const result = [];
  let pageFaults = 0;
  let pageHits = 0;

  // Initialize result with empty state
  result.push({
    step: 0,
    page: null,
    frames: [...frames],
    victim: null,
    nextUse: {},
    fault: false,
    hit: false
  });

  for (let i = 0; i < pageSequence.length; i++) {
    const page = pageSequence[i];
    const prevFrames = [...result[result.length - 1].frames];
    let fault = false;
    let hit = false;
    let victim = null;
    let nextUse = {};

    // Check if page already in frames
    if (prevFrames.includes(page)) {
      hit = true;
      pageHits++;
    } else {
      fault = true;
      pageFaults++;

      // If there's an empty frame, use it
      if (prevFrames.includes("-")) {
        const emptyIndex = prevFrames.indexOf("-");
        prevFrames[emptyIndex] = page;
      } else {
        // Find when each page in memory will be used next
        for (const frameItem of prevFrames) {
          // Look ahead in sequence to find next use
          let nextUseIndex = -1;
          for (let j = i + 1; j < pageSequence.length; j++) {
            if (pageSequence[j] === frameItem) {
              nextUseIndex = j;
              break;
            }
          }

          // If page will never be used again, it's optimal to replace
          if (nextUseIndex === -1) {
            victim = frameItem;
            nextUse[frameItem] = "never";
            break;
          } else {
            nextUse[frameItem] = nextUseIndex - i;
          }
        }

        // If no page will never be used again, replace the one with the furthest next use
        if (victim === null) {
          let furthestUse = -1;
          for (const frameItem of prevFrames) {
            if (nextUse[frameItem] > furthestUse) {
              furthestUse = nextUse[frameItem];
              victim = frameItem;
            }
          }
        }

        // Replace the victim with the new page
        const victimIndex = prevFrames.indexOf(victim);
        prevFrames[victimIndex] = page;
      }
    }

    // Add frame state to result
    result.push({
      step: i + 1,
      page,
      frames: [...prevFrames],
      victim,
      nextUse,
      fault,
      hit
    });
  }

  return {
    sequence: result,
    faults: pageFaults,
    hits: pageHits
  };
}`;

  const getPages = () =>
    pageStr
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

  const clearSim = () => {
    setMatrix([]);
    setFaults(0);
    setHits(0);
    setStep(0);
    setFinished(false);
    setActive(false);
  };

  const runOptimal = () => {
    clearSim();
    const pages = getPages();
    const result = [];
    let pageFaults = 0,
      pageHits = 0;

    const blank = Array(frames).fill("-");
    result.push({
      step: 0,
      page: null,
      frames: [...blank],
      victim: null,
      nextUse: {},
      fault: false,
      hit: false,
    });

    pages.forEach((page, idx) => {
      const curFrames = [...result[result.length - 1].frames];
      let fault = false,
        hit = false;
      let victim = null;
      let nextUse = {};

      if (curFrames.includes(page)) {
        hit = true;
        pageHits++;
      } else {
        fault = true;
        pageFaults++;

        // If there's an empty frame, use it
        if (curFrames.includes("-")) {
          const emptyIdx = curFrames.indexOf("-");
          curFrames[emptyIdx] = page;
        } else {
          // For each frame, find when it will be used next
          for (const frameItem of curFrames) {
            // Find next usage in future
            let found = false;
            for (let j = idx + 1; j < pages.length; j++) {
              if (pages[j] === frameItem) {
                nextUse[frameItem] = j - idx;
                found = true;
                break;
              }
            }
            
            // If page won't be used again, it's the best candidate for replacement
            if (!found) {
              victim = frameItem;
              nextUse[frameItem] = "∞";
              break;
            }
          }

          // If no page will never be used again, replace the one with furthest next use
          if (victim === null) {
            let furthestUse = -1;
            for (const frameItem of curFrames) {
              if (typeof nextUse[frameItem] === "number" && nextUse[frameItem] > furthestUse) {
                furthestUse = nextUse[frameItem];
                victim = frameItem;
              }
            }
          }

          // Replace the victim page
          const replaceIdx = curFrames.indexOf(victim);
          curFrames[replaceIdx] = page;
        }
      }

      result.push({
        step: idx + 1,
        page,
        frames: [...curFrames],
        victim,
        nextUse,
        fault,
        hit,
      });
    });

    setMatrix(result);
    setFaults(pageFaults);
    setHits(pageHits);
  };

  // Animation starter
  const startAnim = () => {
    if (!matrix.length) runOptimal();
    setActive(true);
  };

  // Step through animation
  useEffect(() => {
    let timer;

    if (active && step < matrix.length - 1) {
      timer = setTimeout(() => setStep((p) => p + 1), delay);
    } else if (step >= matrix.length - 1 && active) {
      setFinished(true);
      setActive(false);
    }

    return () => clearTimeout(timer);
  }, [active, step, matrix, delay]);

  // Render memory frames
  const displayFrames = () => {
    if (!matrix.length || step >= matrix.length) return null;

    const curr = matrix[step];
    const pages = getPages();
    
    // Get future references for visualization
    const futureRefs = {};
    if (step > 0 && curr.frames) {
      curr.frames.forEach(frame => {
        if (frame !== "-") {
          // Find next usage
          let nextIdx = null;
          for (let i = step; i < pages.length; i++) {
            if (pages[i] === frame) {
              nextIdx = i;
              break;
            }
          }
          futureRefs[frame] = nextIdx !== null ? nextIdx - step + 1 : "∞";
        }
      });
    }

    return (
      <div className="grid grid-cols-1 gap-6 w-full">
        <div className="flex justify-center items-center space-x-4">
          {curr.frames.map((frame, i) => (
            <div key={i} className="relative">
              <div
                className={`w-16 h-16 flex items-center justify-center text-xl font-semibold border-2 
                  ${
                    frame === "-"
                      ? "border-gray-300 text-gray-400"
                      : step > 0 && curr.victim === frame
                      ? "border-red-500 bg-red-100 text-red-800"
                      : "border-blue-500 bg-blue-100 text-blue-800"
                  }`}
              >
                {frame}
              </div>
              {frame !== "-" && step > 0 && (
                <div className="absolute -bottom-6 left-0 right-0 text-xs text-gray-500 text-center">
                  Next use: {futureRefs[frame]}
                </div>
              )}
            </div>
          ))}
        </div>
        {step > 0 && (
          <div className="flex justify-center items-center mt-10">
            <div
              className={`text-lg font-semibold px-4 py-2 rounded-lg 
              ${
                curr.fault
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {curr.fault ? "Page Fault" : "Page Hit"}
              {curr.fault && curr.victim && (
                <span className="ml-2 text-sm">
                  (Replaced page {curr.victim})
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render page table
  const displayPageTable = () => {
    if (!matrix.length || matrix.length <= 1) return null;

    // Get all steps except the initial empty state
    const tableData = matrix.slice(1);

    return (
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="py-2 px-4 border-b">Step</th>
              <th className="py-2 px-4 border-b">Page</th>
              <th className="py-2 px-4 border-b">Memory Frames</th>
              <th className="py-2 px-4 border-b">Victim Page</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr 
                key={index} 
                className={`
                  ${index < step ? "bg-gray-50" : ""}
                  ${index === step - 1 ? "bg-blue-50" : ""}
                `}
              >
                <td className="py-2 px-4 border-b text-center">{row.step}</td>
                <td className="py-2 px-4 border-b text-center font-medium">{row.page}</td>
                <td className="py-2 px-4 border-b text-center">
                  <div className="flex justify-center space-x-2">
                    {row.frames.map((frame, i) => (
                      <div 
                        key={i}
                        className={`w-8 h-8 flex items-center justify-center text-sm border 
                          ${frame === "-" 
                            ? "border-gray-300 text-gray-400" 
                            : frame === row.victim && row.fault
                            ? "border-red-500 bg-red-50 text-red-800"
                            : "border-blue-500 bg-blue-50 text-blue-800"
                          }`}
                      >
                        {frame}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {row.victim ? (
                    <span className="text-red-600 font-medium">{row.victim}</span>
                  ) : (
                    <span className="text-gray-400">None</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <span 
                    className={`px-2 py-1 rounded text-xs font-medium
                      ${row.fault 
                        ? "bg-red-100 text-red-700" 
                        : "bg-green-100 text-green-700"
                      }`}
                  >
                    {row.fault ? "Page Fault" : "Page Hit"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render input sequence
  const drawSequence = () => {
    if (!matrix.length) return null;

    const allPages = getPages();

    return (
      <div className="flex flex-wrap justify-center gap-2 mt-8">
        {allPages.map((p, i) => (
          <div
            key={i}
            className={`w-10 h-10 flex items-center justify-center text-sm border 
              ${
                i === step - 1
                  ? "bg-blue-500 text-white border-blue-700"
                  : i < step - 1
                  ? "bg-gray-200 text-gray-700 border-gray-300"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
          >
            {p}
          </div>
        ))}
      </div>
    );
  };

  // Explanation for optimal algorithm
  const algorithmExplanation = () => {
    return (
      <>
      </>
    );
  };

  // Results and statistics
  const results = () => {
    if (!finished && !matrix.length) return null;

    const hitRate = (hits * 100) / (hits + faults) || 0;
    const faultRate = (faults * 100) / (hits + faults) || 0;

    return (
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-2">Results</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Page Hits: {hits}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${hitRate}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{hitRate.toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Page Faults: {faults}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div
                className="bg-red-500 h-2.5 rounded-full"
                style={{ width: `${faultRate}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {faultRate.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Optimal Page Replacement Algorithm
      </h2>

      {/* Config section */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Configuration</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Frames
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={frames}
              onChange={(e) => setFrames(parseInt(e.target.value))}
              disabled={active}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Page Reference Sequence
            </label>
            <input
              type="text"
              value={pageStr}
              onChange={(e) => setPageStr(e.target.value)}
              disabled={active}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Example: 1,2,3,4,1,2,5,1,2,3,4,5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Animation Speed (ms)
            </label>
            <input
              type="range"
              min="200"
              max="2000"
              step="100"
              value={delay}
              onChange={(e) => setDelay(parseInt(e.target.value))}
              disabled={active}
              className="w-full"
            />
            <p className="text-sm text-gray-500 text-center">{delay} ms</p>
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={startAnim}
            disabled={active || !getPages().length}
            className={`px-4 py-2 rounded-md font-medium ${
              active
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {finished ? "Run Again" : "Run Simulation"}
          </button>

          <button
            onClick={clearSim}
            disabled={active || !matrix.length}
            className={`px-4 py-2 rounded-md font-medium ${
              active || !matrix.length
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Algorithm explanation */}
      {algorithmExplanation()}

      {/* Visualization section */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Visualization</h3>

        {matrix.length > 0 ? (
          <div>
            <div className="mb-8">
              {step > 0 && (
                <p className="text-center mb-4 text-gray-700">
                  Current Page:{" "}
                  <span className="font-bold text-blue-700">
                    {matrix[step].page}
                  </span>
                </p>
              )}
              {displayFrames()}
            </div>
            {drawSequence()}

            {/* Page Table */}
            <div className="mt-12 bg-white rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-center">Page Table</h3>
              {displayPageTable()}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Click "Run Simulation" to start the visualization
          </div>
        )}
      </div>

      {/* Results section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{results()}</div>

      <div className="p-6">
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-900 transition-colors duration-200"
          >
            <span className="material-icons">{showCode ? " " : " "}</span>
            {showCode ? "Hide Code" : "Show Code"}
          </button>
        </div>

        {showCode && (
          <div className="transition-all duration-300 ease-in-out">
            <CodeSnippet
              code={code}
              language="JavaScript"
              title="Optimal Page Replacement Implementation"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OptimalPageReplacement;