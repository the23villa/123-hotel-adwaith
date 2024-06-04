import Container from "@/components/shared/container/Container";
import React from "react";

const Offer = () => {
  return (
    <section>
      <Container>
        <div className="w-full h-full flex flex-col gap-y-12 mt-5 mb-5">
          <article className="flex flex-col gap-y-4">
            <h1 className="lg:text-5xl font-serif md:text-4xl text-3xl whitespace-normal">
              Something for everyone
            </h1>
          </article>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-5">
            <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded cursor-pointer">
              <h2 className="text-xl font-semibold">Couples</h2>
              <p className="text-sm">2 guests</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded cursor-pointer">
              <h2 className="text-xl font-semibold">Small Families</h2>
              <p className="text-sm">3-8 guests</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded cursor-pointer">
              <h2 className="text-xl font-semibold">Big Families</h2>
              <p className="text-sm">9-14 guests</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded cursor-pointer">
              <h2 className="text-xl font-semibold">Large Groups</h2>
              <p className="text-sm">14+ guests</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Offer;
