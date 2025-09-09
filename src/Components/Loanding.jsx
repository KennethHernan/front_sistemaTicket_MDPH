import React from "react";
import img from "../assets/logoMDPH.png";

const Loading = () => {
  return (
    <div className="overflow-y-auto bg-white">
      <div className="fixed top-0 left-0 w-full min-h-full flex items-center justify-center">
        <img src={img} className="w-1/4 animate-pulse"/>
      </div>
    </div>
  );
};

export default Loading;
