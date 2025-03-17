import React from "react";
import bgVideo from "../assets/bg.mp4";

const Home = () => {
  return (
    <div className=" w-full bg-[rgb(2,0,36)]">

      <div className=" h-150 ">
        <video className=" w-full  " autoPlay muted loop >
          <source src={bgVideo}  type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className=" h-screen ">

      </div>
    </div>
  );
};

export default Home;
