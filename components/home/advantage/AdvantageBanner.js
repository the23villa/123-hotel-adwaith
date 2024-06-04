/**
 * Title: Write a program using JavaScript on AdvantageBanner
.
 * Date: 30, August 2023
 */

import LoadImage from "@/components/shared/image/LoadImage";
import React from "react";

const AdvantageBanner = () => {
  return (
    <LoadImage
      src="/assets/home-page/banner/choose.jpg"
      alt={"advantage"}
      height={633}
      width={541}
      className="w-full rounded border border-primary"
    />
  );
};

export default AdvantageBanner;
