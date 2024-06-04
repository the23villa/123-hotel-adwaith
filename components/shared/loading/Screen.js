/**
 * Title: Write a program using JavaScript on Screen
.
 * Date: 17, November 2023
 */

import React from "react";
import LoadImage from "../image/LoadImage";

const Screen = () => {
  return (
    <section className="flex justify-center items-center h-screen w-screen bg-secondary/10">
      <LoadImage
        src="/load.gif"
        alt="loading"
        height={300}
        width={300}
        className=""
      />
    </section>
  );
};

export default Screen;
