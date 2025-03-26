import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeSnippet = ({ code, language, title }) => {
  return (
    <div className="max-w-3xl mx-auto rounded-lg overflow-hidden shadow-2xl">
      {/* Header Bar */}
      <div className="bg-[#1e1e1e] px-4 py-2 flex items-center">
        {/* Fake Traffic Lights */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        {/* Title */}
        <div className="flex-1 text-center text-gray-400 text-sm">
          {title} <span className="text-gray-500 ml-2">{language}</span>
        </div>
      </div>

      {/* Code Content */}
      <div className="relative">
        <SyntaxHighlighter
          language={language.toLowerCase()}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1.5rem",
            backgroundColor: "#1e1e1e",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
          showLineNumbers={true}
          wrapLines={true}
        >
          {code}
        </SyntaxHighlighter>

        {/* Copy Button */}
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded text-sm transition-colors duration-200"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default CodeSnippet;
