import React, { useEffect, useMemo } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import Link from "next/link";
import Card from "@/components/shared/card/Card";
import LoadImage from "@/components/shared/image/LoadImage";
import SkeletonCard from "@/components/shared/card/SkeletonCard";
import { useGetRentsQuery } from "@/services/rent/rentApi";

const BestSelling = ({ className }) => {
  const { data, isLoading, error } = useGetRentsQuery();
  const tours = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (error) {
      console.log(error?.data?.message);
    }
  }, [error]);

  return (
    <section id="flights" className="py-12">
      <Container className={`${className}`}>
        <section className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-row justify-between items-center">
            <article className="flex flex-col gap-y-4">
              <h1 className="lg:text-5xl md:text-4xl text-3xl font-serif whitespace-normal">
                Best Selling
              </h1>
              <p className="text-base  font-serif">
                Here are some of our best selling tours across all of our
                destinations
              </p>
            </article>
            <div className="text-primary border-b-2 border-b-transparent hover:border-b-primary transition-all">
              <Link
                href="/tours"
                className="flex flex-row gap-x-1 items-center whitespace-nowrap"
              >
                See More <BiRightArrowAlt />
              </Link>
            </div>
          </div>

          <div className="flex overflow-x-scroll scrollbar-hide space-x-4">
            {tours?.length === 0 || isLoading
              ? Array.from({ length: 4 }, (_, index) => (
                  <SkeletonCard
                    key={index}
                    className="flex-shrink-1 w-full sm:w-auto"
                  />
                ))
              : tours.map((tour) => (
                  <div
                    key={tour._id}
                    className="flex-shrink-1 w-full sm:w-auto"
                  >
                    <Card tour={tour} />
                  </div>
                ))}
          </div>
        </section>
      </Container>
    </section>
  );
};

export default BestSelling;
