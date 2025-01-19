import HighlightText from "@/components/shared/highlightText/HighlightText";
import React from "react";

const HeroDescription = () => {

  return (
    <section className="lg:col-span-8 md:col-span-6 md:px-8 md:py-12 lg:py-1">
      <article className="flex flex-col gap-y-12 items-center md:items-start">
        <div className="flex flex-col gap-y-8 text-center md:text-left">
          <h1
            className={`text-4xl sm:text-5xl md:text-5xl lg:text-7xl text-white`}
          >
             Book Your Private Nest
          </h1>
        </div>
      </article>
    </section>
  );
};

export default HeroDescription;
