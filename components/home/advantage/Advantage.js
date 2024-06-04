/**
 * Title: Write a program using JavaScript on Advantage
.
 * Date: 30, August 2023
 */

import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import LoadImage from "@/components/shared/image/LoadImage";
import React from "react";
import AdvantageArticle from "./AdvantageArticle";
import AdvantageBanner from "./AdvantageBanner";

const Advantage = () => {
  return (
    <section
      className="bg-no-repeat bg-center h-full py-12"
      style={{
        backgroundImage: "url(/assets/home-page/advantage/manDirect.svg)",
        backgroundPosition: "125% 80%",
        backgroundSize: "50% 50%",
      }}
    >
      <Container>
        <section className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-12">
            <article className="flex flex-col gap-y-4">
              <h1 className="lg:text-5xl font-serif md:text-4xl text-3xl whitespace-normal">
                Choosing Us
              </h1>
              <p className="text-base font-serif">
                We are committed to providing you with the best possible service
                and value for your money.
              </p>
            </article>

            <div className="grid md:grid-cols-2 md:items-center grid-cols-1 gap-8">
              <AdvantageBanner />
              <AdvantageArticle />
            </div>
          </div>
        </section>
      </Container>
    </section>
  );
};

export default Advantage;
