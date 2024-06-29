import React from "react";
import LoadImage from "../image/LoadImage";

const Screen = () => {
  return (
    <section className="flex justify-center items-center h-screen w-screen bg-secondary/10">
      <div className="relative">
        <LoadImage
          src="/assets/loading1.gif"
          alt="loading"
          height={300}
          width={300}
          className=""
        />
        <LoadImage
          src="/assets/logo2.png"
          alt="logo"
          height={200}
          width={200}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </section>
  );
};

export default Screen;
