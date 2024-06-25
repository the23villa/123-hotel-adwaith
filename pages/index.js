import Hero from "@/components/home/hero/Hero";
import Destination from "@/components/home/destination/Destination";
import Offer from "@/components/home/offer/Offer";
import Main from "@/layouts/Main";
import BestSelling from "@/components/home/bestSelling/BestSelling";
import Advantage from "@/components/home/advantage/Advantage";
import PopularDestination from "@/components/home/popular-destination/PopularDestination";
import Head from "next/head";
import Steps from "@/components/home/steps/Steps";
import Blogs from "@/components/home/blogs/Blogs";
import Reviews from "@/components/shared/review/Reviews";
import Gallery from "@/components/home/gallery/Gallery";
import NewsLetter from "@/components/home/news-letter/NewsLetter";
import Collection from "@/components/home/advantage/Collection";

export default function Home() {
  return (
    <main>
      <Head>
        <title>123 Hotel Booking</title>
      </Head>
      <Main>
        <Hero />
        <Steps />
        <BestSelling />
        <Offer />
        <Advantage />
        <Collection/>
        <Reviews />
        {/* <Gallery /> */}
        <NewsLetter />
      </Main>
    </main>
  );
}
