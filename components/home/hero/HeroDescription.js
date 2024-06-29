import HighlightText from "@/components/shared/highlightText/HighlightText";
import React, { useState, useEffect } from "react";

const HeroDescription = () => {
  const [isWhiteText, setIsWhiteText] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsWhiteText((prevState) => !prevState);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const textColor = isWhiteText ? "text-white" : "text-black";

  return (
    <section className="lg:col-span-8 md:col-span-6 md:px-8 md:py-12 lg:py-1">
      <article className="flex flex-col gap-y-12 items-center md:items-start">
        <div className="flex flex-col gap-y-8 text-center md:text-left">
          <h1
            className={`text-4xl sm:text-5xl md:text-5xl lg:text-7xl ${textColor} whitespace-normal leading-tight transition-colors duration-1000`}
          >
            Book Your Dream Stay And Make Memory
          </h1>
        </div>
      </article>
    </section>
  );
};

export default HeroDescription;
