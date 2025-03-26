import React from "react";
import bgVideo from "../assets/bg.mp4";
import PageReplacementVisualizer from "./PageReplacementVisualizer";

const Home = () => {
  return (
    <div className="relative min-h-screen w-full bg-[rgb(2,0,36)] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="w-full h-full object-cover opacity-90"
          autoPlay
          muted
          loop
          playsInline
          style={{ filter: "brightness(0.9)" }}
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(2,0,36,0.1)] via-transparent to-[rgba(2,0,36,0.2)]"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <PageReplacementVisualizer />
      </div>
    </div>
  );
};

export default Home;
