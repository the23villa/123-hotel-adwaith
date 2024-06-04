import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import React from "react";
import BreakdownArticle from "./BreakdownArticle";
import FeatureTour from "./FeatureTour";

const Steps = () => {
  return (
    <section className="py-12">
      <Container>
        <section className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <article className="flex flex-col gap-y-4">
              <h1 className="lg:text-5xl md:text-4xl text-3xl font-serif whitespace-normal">
                Premier & Simple
              </h1>
              <p className="text-base">
                Your Dream Getaway is Just 3 Steps Away - Book Now With Ease!
              </p>
            </article>
          </div>

          <div className="grid md:items-center gap-12 md:grid-cols-1 grid-cols-1">
            <div className="grid md:items-center gap-8 grid-cols-12">
              <div className="col-span-12">
                <BreakdownArticle />
              </div>
            </div>
          </div>
        </section>
      </Container>
    </section>
  );
};

export default Steps;
