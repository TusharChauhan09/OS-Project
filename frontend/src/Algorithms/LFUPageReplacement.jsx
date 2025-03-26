import React, { useState, useEffect } from "react";
import CodeSnippet from "../components/CodeSnippet";

const LFUPageReplacement = () => {
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
import React, { useState, useEffect } from "react";

const LFUPageReplacement = () => {
  // State vars with mixed naming for less predictability
  const [frames, setFrames] = useState(3);
  const [pageStr, setPageStr] = useState("1,2,3,4,1,2,5,1,2,3,4,5");
  const [delay, setDelay] = useState(1000);
  const [matrix, setMatrix] = useState([]);
  const [faults, setFaults] = useState(0);
  const [hits, setHits] = useState(0);
  const [step, setStep] = useState(0);
  const [active, setActive] = useState(false);
  const [finished, setFinished] = useState(false);

  // Parse sequence with compact syntax
  const getPages = () =>
    pageStr
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

  // Reset function
  const clearSim = () => {
    setMatrix([]);
    setFaults(0);
    setHits(0);
    setStep(0);
    setFinished(false);
    setActive(false);
  };

  // Run LFU algorithm
  const runLFU = () => {
    clearSim();
    const pages = getPages();
    const result = [];
    let pageFaults = 0,
      pageHits = 0;

    // Initial empty state
    const blank = Array(frames).fill("-");
    result.push({
      step: 0,
      page: null,
      frames: [...blank],
      freqs: {},
      fault: false,
      hit: false,
    });

    // Frequency counter for each page
    let freqs = {};

    pages.forEach((page, idx) => {
      const curFrames = [...result[result.length - 1].frames];
      let fault = false,
        hit = false;

      // Clone and update frequencies dictionary
      const updatedFreqs = { ...freqs };

      // Check if page exists in frames
      if (curFrames.includes(page)) {
        // Page hit
        hit = true;
        pageHits++;
        // Increment frequency counter for this page
        updatedFreqs[page] = (updatedFreqs[page] || 0) + 1;
      } else {
        // Page fault
        fault = true;
        pageFaults++;

        if (curFrames.includes("-")) {
          // Empty frame exists
          const emptyIdx = curFrames.indexOf("-");
          curFrames[emptyIdx] = page;
          // Initialize frequency for new page
          updatedFreqs[page] = 1;
        } else {
          // Need replacement - find LFU
          let lfuPage = null;
          let lowestFreq = Infinity;

          // First find the minimum frequency
          for (const frameItem of curFrames) {
            if (updatedFreqs[frameItem] < lowestFreq) {
              lowestFreq = updatedFreqs[frameItem];
              lfuPage = frameItem;
            }
          }

          // In case of tie, find the one that was loaded first (FIFO for same frequency)
          const sameFreq = curFrames.filter(
            (f) => updatedFreqs[f] === lowestFreq
          );
          if (sameFreq.length > 1) {
            lfuPage = sameFreq[0]; // First occurrence has lowest index
          }

          // Replace LFU page
          const replaceIdx = curFrames.indexOf(lfuPage);
          curFrames[replaceIdx] = page;
          // Initialize frequency for new page
          updatedFreqs[page] = 1;
        }
      }

      // Save current state to matrix
      result.push({
        step: idx + 1,
        page,
        frames: [...curFrames],
        freqs: { ...updatedFreqs },
        fault,
        hit,
      });

      // Update freqs for next iteration
      freqs = updatedFreqs;
    });

    setMatrix(result);
    setFaults(pageFaults);
    setHits(pageHits);
  };

  // Animation starter
  const startAnim = () => {
    if (!matrix.length) runLFU();
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

    return (
      <div className="grid grid-cols-1 gap-6 w-full">
        <div className="flex justify-center items-center space-x-4">
          {curr.frames.map((frame, i) => (
            <div key={i} className="relative">
              <div>
                {frame}
              </div>
              {frame !== "-" && curr.freqs && (
                <div className="absolute -bottom-6 left-0 right-0 text-xs text-gray-500 text-center">
                  Frequency: {curr.freqs[frame]}
                </div>
              )}
            </div>
          ))}
        </div>
        {step > 0 && (
          <div className="flex justify-center items-center mt-6">
            <div
              className={'text-lg font-semibold px-4 py-2 rounded-lg'}
            >
              {curr.fault ? "Page Fault" : "Page Hit"}
            </div>
          </div>
        )}
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
            className={'w-10 h-10 flex items-center justify-center text-sm border }
          >
            {p}
          </div>
        ))}
      </div>
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
                style={{ width:}}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{hitRate.toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Page Faults: {faults}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div
                className="bg-red-500 h-2.5 rounded-full"
                style={{ width:  }}
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
      <h2 className="text-2xl font-bold text-center mb-6 text-purple-800">
        LFU Page Replacement Algorithm
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            disabled={active || !getPages().length
          >
            {finished ? "Run Again" : "Run Simulation"}
          </button>

          <button
            onClick={clearSim}
            disabled={active || !matrix.length}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Visualization section */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Visualization</h3>

        {matrix.length > 0 ? (
          <div>
            <div className="mb-8">
              {step > 0 && (
                <p className="text-center mb-4 text-gray-700">
                  Current Page:{" "}
                  <span className="font-bold text-purple-700">
                    {matrix[step].page}
                  </span>
                </p>
              )}
              {displayFrames()}
            </div>
            {drawSequence()}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Click "Run Simulation" to start the visualization
          </div>
        )}
      </div>

      {/* Results section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results()}
      </div>

      <div className="p-6">
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-2 px-4 py-2 bg-[#01216B] text-white rounded-md hover:bg-[#162a73] transition-colors duration-200"
          >
            <span className="material-icons">
              {showCode ? 'code_off' : 'code'}
            </span>
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>
        </div>
        
        {showCode && (
          <div className="transition-all duration-300 ease-in-out">
            <CodeSnippet
              code={code}
              language="React"
              title="LFU Implementation Example"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LFUPageReplacement;

  
  
  
  
  
  `;

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

  const runLFU = () => {
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
      freqs: {},
      fault: false,
      hit: false,
    });

    let freqs = {};

    pages.forEach((page, idx) => {
      const curFrames = [...result[result.length - 1].frames];
      let fault = false,
        hit = false;

      const updatedFreqs = { ...freqs };

      if (curFrames.includes(page)) {
        hit = true;
        pageHits++;

        updatedFreqs[page] = (updatedFreqs[page] || 0) + 1;
      } else {
        fault = true;
        pageFaults++;

        if (curFrames.includes("-")) {
          const emptyIdx = curFrames.indexOf("-");
          curFrames[emptyIdx] = page;

          updatedFreqs[page] = 1;
        } else {
          let lfuPage = null;
          let lowestFreq = Infinity;

          for (const frameItem of curFrames) {
            if (updatedFreqs[frameItem] < lowestFreq) {
              lowestFreq = updatedFreqs[frameItem];
              lfuPage = frameItem;
            }
          }

          const sameFreq = curFrames.filter(
            (f) => updatedFreqs[f] === lowestFreq
          );
          if (sameFreq.length > 1) {
            lfuPage = sameFreq[0];
          }

          const replaceIdx = curFrames.indexOf(lfuPage);
          curFrames[replaceIdx] = page;

          updatedFreqs[page] = 1;
        }
      }

      result.push({
        step: idx + 1,
        page,
        frames: [...curFrames],
        freqs: { ...updatedFreqs },
        fault,
        hit,
      });

      // Update freqs for next iteration
      freqs = updatedFreqs;
    });

    setMatrix(result);
    setFaults(pageFaults);
    setHits(pageHits);
  };

  // Animation starter
  const startAnim = () => {
    if (!matrix.length) runLFU();
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
                      : "border-blue-500 bg-blue-100 text-blue-800"
                  }`}
              >
                {frame}
              </div>
              {frame !== "-" && curr.freqs && (
                <div className="absolute -bottom-6 left-0 right-0 text-xs text-gray-500 text-center">
                  Frequency: {curr.freqs[frame]}
                </div>
              )}
            </div>
          ))}
        </div>
        {step > 0 && (
          <div className="flex justify-center items-center mt-6">
            <div
              className={`text-lg font-semibold px-4 py-2 rounded-lg 
              ${
                curr.fault
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {curr.fault ? "Page Fault" : "Page Hit"}
            </div>
          </div>
        )}
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
      <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
        LFU Page Replacement Algorithm
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                : "bg-green-600 text-white hover:bg-green-700"
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

      {/* Visualization section */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Visualization</h3>

        {matrix.length > 0 ? (
          <div>
            <div className="mb-8">
              {step > 0 && (
                <p className="text-center mb-4 text-gray-700">
                  Current Page:{" "}
                  <span className="font-bold text-purple-700">
                    {matrix[step].page}
                  </span>
                </p>
              )}
              {displayFrames()}
            </div>
            {drawSequence()}
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
            className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-900 transition-colors duration-200"
          >
            <span className="material-icons">
              {showCode ? " " : " "}
            </span>
            {showCode ? "Hide Code" : "Show Code"}
          </button>
        </div>

        {showCode && (
          <div className="transition-all duration-300 ease-in-out">
            <CodeSnippet
              code={code}
              language="React"
              title="LFU Implementation Example"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LFUPageReplacement;
