/**
 * Title: Write a program using JavaScript on Location
.
 * Date: 21, October 2023
 */

import React, { useMemo } from "react";
import dynamic from "next/dynamic";

const Location = ({ location }) => {
  const GeoLocation = useMemo(
    () =>
      dynamic(() => import("./GeoLocation"), {
        loading: () => <p>Map is loading...</p>,
        ssr: false,
      }),
    []
  );

  return (
    <div className="flex flex-col gap-y-1.5 z-10">
      <h2 className="md:text-xl text-lg">Location</h2>
      <GeoLocation location={location} zoom={10} height="400px" />
    </div>
  );
};

export default Location;