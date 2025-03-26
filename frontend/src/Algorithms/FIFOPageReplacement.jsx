import React, { useState, useEffect } from 'react';
import CodeSnippet from '../components/CodeSnippet';

const FIFOPageReplacement = () => {
  // State management
  const [frames, setFrames] = useState(3);
  const [pageSequence, setPageSequence] = useState('1,2,3,4,1,2,5,1,2,3,4,5');
  const [speed, setSpeed] = useState(1000);
  const [simulationMatrix, setSimulationMatrix] = useState([]);
  const [faultCount, setFaultCount] = useState(0);
  const [hitCount, setHitCount] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showCode, setShowCode] = useState(false);

  // Parse page sequence
  const getPageSequence = () => {
    return pageSequence.split(',').map(page => page.trim()).filter(page => page !== '');
  };

  const code = `
  import React, { useState, useEffect } from 'react';

const FIFOPageReplacement = () => {
  // State management
  const [frames, setFrames] = useState(3);
  const [pageSequence, setPageSequence] = useState('1,2,3,4,1,2,5,1,2,3,4,5');
  const [speed, setSpeed] = useState(1000);
  const [simulationMatrix, setSimulationMatrix] = useState([]);
  const [faultCount, setFaultCount] = useState(0);
  const [hitCount, setHitCount] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Parse page sequence
  const getPageSequence = () => {
    return pageSequence.split(',').map(page => page.trim()).filter(page => page !== '');
  };

 

  // Reset simulation
  const resetSimulation = () => {
    setSimulationMatrix([]);
    setFaultCount(0);
    setHitCount(0);
    setCurrentStep(0);
    setIsComplete(false);
    setIsRunning(false);
  };

  // Run FIFO algorithm
  const runFIFO = () => {
    resetSimulation();
    const pages = getPageSequence();
    const queue = [];
    const matrix = [];
    let pageFaults = 0;
    let pageHits = 0;

    // Initialize matrix with empty frames
    const initialState = Array(frames).fill('-');
    matrix.push({
      step: 0,
      page: null,
      frames: [...initialState],
      queue: [],
      isFault: false,
      isHit: false
    });

    pages.forEach((page, index) => {
      const currentFrames = [...matrix[matrix.length - 1].frames];
      let isFault = false;
      let isHit = false;
      const currentQueue = [...queue];

      // Check if page is already in frames
      if (currentFrames.includes(page)) {
        // Page hit
        isHit = true;
        pageHits++;
      } else {
        // Page fault
        isFault = true;
        pageFaults++;

        if (currentFrames.includes('-')) {
          // If there's an empty frame then use it
          const emptyIndex = currentFrames.indexOf('-');
          currentFrames[emptyIndex] = page;
          currentQueue.push(page);
        } else {
          // Replace the oldest page (first in queue)
          const oldestPage = currentQueue.shift();
          const replaceIndex = currentFrames.indexOf(oldestPage);
          currentFrames[replaceIndex] = page;
          currentQueue.push(page);
        }
      }

      // Add the current state to the matrix
      matrix.push({
        step: index + 1,
        page,
        frames: [...currentFrames],
        queue: [...currentQueue],
        isFault,
        isHit
      });
    });

    setSimulationMatrix(matrix);
    setFaultCount(pageFaults);
    setHitCount(pageHits);
  };

  // Run animation
  const runAnimation = () => {
    if (simulationMatrix.length === 0) {
      runFIFO();
    }

    setIsRunning(true);
  };

  // Step through animation
  useEffect(() => {
    let timer;

    if (isRunning && currentStep < simulationMatrix.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, speed);
    } else if (currentStep >= simulationMatrix.length - 1 && isRunning) {
      setIsComplete(true);
      setIsRunning(false);
    }

    return () => clearTimeout(timer);
  }, [isRunning, currentStep, simulationMatrix, speed]);

  // Render frames
  const renderFrames = () => {
    if (simulationMatrix.length === 0 || currentStep >= simulationMatrix.length) {
      return null;
    }

    const currentState = simulationMatrix[currentStep];
    
    return (
      <div className="grid grid-cols-1 gap-6 w-full">
        <div className="flex justify-center items-center space-x-4">
          {currentState.frames.map((frame, idx) =>
              {frame}
            </div>
          ))}
        </div>
        {currentStep > 0 && (
          <div className="flex justify-center items-center">
            <div className={}>
              {currentState.isFault ? 'Page Fault' : 'Page Hit'}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render sequence
  const renderSequence = () => {
    if (simulationMatrix.length === 0) {
      return null;
    }

    const pages = getPageSequence();
    
    return (
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {pages.map((page, idx) => {
            {page}
          </div>
        ))}
      </div>
    );
  };

  // Render results
  const renderResults = () => {
    if (!isComplete && simulationMatrix.length === 0) return null;
    
    const hitRate = (hitCount / (hitCount + faultCount)) * 100 || 0;
    const faultRate = (faultCount / (hitCount + faultCount)) * 100 || 0;
    
    return (
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-2">Results</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Page Hits: {hitCount}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{hitRate.toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Page Faults: {faultCount}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div className="bg-red-500 h-2.5 rounded-full" style={{ width: }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{faultRate.toFixed(2)}%</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">FIFO Page Replacement Algorithm</h2>

      {/* Configuration */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Configuration</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Frames</label>
            <input 
              type="number" 
              min="1" 
              max="10"
              value={frames}
              onChange={(e) => setFrames(parseInt(e.target.value))}
              disabled={isRunning}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page Reference Sequence</label>
            <input 
              type="text" 
              value={pageSequence}
              onChange={(e) => setPageSequence(e.target.value)}
              disabled={isRunning}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Example: 1,2,3,4,1,2,5,1,2,3,4,5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Animation Speed (ms)</label>
            <input 
              type="range" 
              min="200" 
              max="2000" 
              step="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              disabled={isRunning}
              className="w-full"
            />
            <p className="text-sm text-gray-500 text-center">{speed} ms</p>
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={runAnimation}
            disabled={}
          >
            {isComplete ? 'Run Again' : 'Run Simulation'}
          </button>
          
          <button>
            Reset
          </button>
        </div>
      </div>

      {/* Visualization */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Visualization</h3>
        
        {simulationMatrix.length > 0 ? (
          <div>
            <div className="mb-6">
              {currentStep > 0 && (
                <p className="text-center mb-2 text-gray-700">
                  Current Page: <span className="font-bold text-blue-700">{simulationMatrix[currentStep].page}</span>
                </p>
              )}
              {renderFrames()}
            </div>
            {renderSequence()}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Click "Run Simulation" to start the visualization
          </div>
        )}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderResults()}
        
      </div>
    </div>
  );
};

export default FIFOPageReplacement;
  
  `;
 

  // Reset simulation
  const resetSimulation = () => {
    setSimulationMatrix([]);
    setFaultCount(0);
    setHitCount(0);
    setCurrentStep(0);
    setIsComplete(false);
    setIsRunning(false);
  };

  // Run FIFO algorithm
  const runFIFO = () => {
    resetSimulation();
    const pages = getPageSequence();
    const queue = [];
    const matrix = [];
    let pageFaults = 0;
    let pageHits = 0;

    // Initialize matrix with empty frames
    const initialState = Array(frames).fill('-');
    matrix.push({
      step: 0,
      page: null,
      frames: [...initialState],
      queue: [],
      isFault: false,
      isHit: false
    });

    pages.forEach((page, index) => {
      const currentFrames = [...matrix[matrix.length - 1].frames];
      let isFault = false;
      let isHit = false;
      const currentQueue = [...queue];

      // Check if page is already in frames
      if (currentFrames.includes(page)) {
        // Page hit
        isHit = true;
        pageHits++;
      } else {
        // Page fault
        isFault = true;
        pageFaults++;

        if (currentFrames.includes('-')) {
          // If there's an empty frame then use it
          const emptyIndex = currentFrames.indexOf('-');
          currentFrames[emptyIndex] = page;
          currentQueue.push(page);
        } else {
          // Replace the oldest page (first in queue)
          const oldestPage = currentQueue.shift();
          const replaceIndex = currentFrames.indexOf(oldestPage);
          currentFrames[replaceIndex] = page;
          currentQueue.push(page);
        }
      }

      // Add the current state to the matrix
      matrix.push({
        step: index + 1,
        page,
        frames: [...currentFrames],
        queue: [...currentQueue],
        isFault,
        isHit
      });
    });

    setSimulationMatrix(matrix);
    setFaultCount(pageFaults);
    setHitCount(pageHits);
  };

  // Run animation
  const runAnimation = () => {
    if (simulationMatrix.length === 0) {
      runFIFO();
    }

    setIsRunning(true);
  };

  // Step through animation
  useEffect(() => {
    let timer;

    if (isRunning && currentStep < simulationMatrix.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, speed);
    } else if (currentStep >= simulationMatrix.length - 1 && isRunning) {
      setIsComplete(true);
      setIsRunning(false);
    }

    return () => clearTimeout(timer);
  }, [isRunning, currentStep, simulationMatrix, speed]);

  // Render frames
  const renderFrames = () => {
    if (simulationMatrix.length === 0 || currentStep >= simulationMatrix.length) {
      return null;
    }

    const currentState = simulationMatrix[currentStep];
    
    return (
      <div className="grid grid-cols-1 gap-6 w-full">
        <div className="flex justify-center items-center space-x-4">
          {currentState.frames.map((frame, idx) => (
            <div 
              key={idx}
              className={`w-16 h-16 flex items-center justify-center text-xl font-semibold border-2 
                ${frame === '-' ? 'border-gray-300 text-gray-400' : 'border-blue-500 bg-blue-100 text-blue-800'}`}
            >
              {frame}
            </div>
          ))}
        </div>
        {currentStep > 0 && (
          <div className="flex justify-center items-center">
            <div className={`text-lg font-semibold px-4 py-2 rounded-lg 
              ${currentState.isFault ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {currentState.isFault ? 'Page Fault' : 'Page Hit'}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render sequence
  const renderSequence = () => {
    if (simulationMatrix.length === 0) {
      return null;
    }

    const pages = getPageSequence();
    
    return (
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {pages.map((page, idx) => (
          <div 
            key={idx} 
            className={`w-10 h-10 flex items-center justify-center text-sm border 
              ${idx === currentStep - 1 ? 'bg-blue-500 text-white border-blue-700' : 
                idx < currentStep - 1 ? 'bg-gray-200 text-gray-700 border-gray-300' : 
                'bg-white text-gray-700 border-gray-300'}`}
          >
            {page}
          </div>
        ))}
      </div>
    );
  };

  // Render results
  const renderResults = () => {
    if (!isComplete && simulationMatrix.length === 0) return null;
    
    const hitRate = (hitCount / (hitCount + faultCount)) * 100 || 0;
    const faultRate = (faultCount / (hitCount + faultCount)) * 100 || 0;
    
    return (
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-2">Results</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Page Hits: {hitCount}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${hitRate}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{hitRate.toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Page Faults: {faultCount}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${faultRate}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{faultRate.toFixed(2)}%</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">FIFO Page Replacement Algorithm</h2>

      {/* Configuration */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Configuration</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Frames</label>
            <input 
              type="number" 
              min="1" 
              max="10"
              value={frames}
              onChange={(e) => setFrames(parseInt(e.target.value))}
              disabled={isRunning}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page Reference Sequence</label>
            <input 
              type="text" 
              value={pageSequence}
              onChange={(e) => setPageSequence(e.target.value)}
              disabled={isRunning}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Example: 1,2,3,4,1,2,5,1,2,3,4,5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Animation Speed (ms)</label>
            <input 
              type="range" 
              min="200" 
              max="2000" 
              step="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              disabled={isRunning}
              className="w-full"
            />
            <p className="text-sm text-gray-500 text-center">{speed} ms</p>
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={runAnimation}
            disabled={isRunning || getPageSequence().length === 0}
            className={`px-4 py-2 rounded-md font-medium ${isRunning 
              ? 'bg-gray-300 text-gray-700 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {isComplete ? 'Run Again' : 'Run Simulation'}
          </button>
          
          <button
            onClick={resetSimulation}
            disabled={isRunning || simulationMatrix.length === 0}
            className={`px-4 py-2 rounded-md font-medium ${isRunning || simulationMatrix.length === 0
              ? 'bg-gray-300 text-gray-700 cursor-not-allowed' 
              : 'bg-red-600 text-white hover:bg-red-700'}`}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Visualization */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Visualization</h3>
        
        {simulationMatrix.length > 0 ? (
          <div>
            <div className="mb-6">
              {currentStep > 0 && (
                <p className="text-center mb-2 text-gray-700">
                  Current Page: <span className="font-bold text-blue-700">{simulationMatrix[currentStep].page}</span>
                </p>
              )}
              {renderFrames()}
            </div>
            {renderSequence()}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Click "Run Simulation" to start the visualization
          </div>
        )}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderResults()}
        
      </div>


      <div className="p-6">
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <span className="material-icons">
              {showCode ? "Hide Code" : "Show Code"}
            </span>
            {showCode ? " " : " "}
          </button>
        </div>

        {showCode && (
          <div className="transition-all duration-300 ease-in-out">
            <CodeSnippet
              code={code}
              language="React"
              title="FIFO Implementation Example"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FIFOPageReplacement;