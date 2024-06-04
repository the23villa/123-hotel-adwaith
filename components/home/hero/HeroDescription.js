/**
 * Title: Write a program using JavaScript on BannerDescription
.
 */

import Button from "@/components/shared/button/Button";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import React from "react";

const HeroDescription = () => {
  return (
    <section className="lg:col-span-8 md:col-span-6">
      <article className="flex flex-col gap-y-12">
        <div className="flex flex-col gap-y-8">
          <h1 className="lg:text-7xl md:text-5xl text-white text-3xl whitespace-normal">
            Book Your Dream Stay And Make <HighlightText>Memory</HighlightText>
          </h1>
        </div>
        {/* <div>
          <Button
            className="px-[18px] py-[13px]"
            onClick={() => window.open("/tours", "_self")}
          >
            Check Now
          </Button>
        </div> */}
      </article>
    </section>
  );
};

export default HeroDescription;
