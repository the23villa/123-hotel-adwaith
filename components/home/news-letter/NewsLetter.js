import axios from "axios";
import React, { useState } from "react";
import LoadImage from "@/components/shared/image/LoadImage";
import Button from "@/components/shared/button/Button";
import Container from "@/components/shared/container/Container";
import { BiHotel } from "react-icons/bi";

const NewsLetter = () => {
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const toggleAdditionalContent = () => {
    setShowAdditionalContent(!showAdditionalContent);
  };

  const handleSubscribe = async () => {
    try {
      const response = await axios.post("/api/subscribe", { email });
      if (response.data.success) {
        setVisible(true);
        // Additional logic if needed
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <section className="h-full py-12">
      <Container>
        <section className="w-full h-full lg:gap-x-4 gap-y-12 grid grid-cols-12">
          <div className="lg:col-span-7 col-span-12 bg-slate-200 rounded relative p-8">
            <LoadImage
              src="/assets/home-page/newsletter/air-ticket.svg"
              alt="ticket"
              height={285}
              width={612}
              className="h-[285px] w-full object-contain absolute lg:-top-4 -top-8 lg:-right-[8rem] md:right-[4rem] -right-[1rem]"
            />
            <LoadImage
              src="/assets/home-page/newsletter/target-circle.svg"
              alt="ticket"
              height={50}
              width={50}
              className="h-[50px] w-[50px] object-contain absolute lg:top-4 md:top-1 lg:left-[9.4rem] md:-left-[0.6rem] -left-[0.4rem]"
            />
            <article className="flex flex-col gap-y-4 h-full">
              <h2 className="lg:text-4xl md:text-2xl text-xl z-50">
                Prepare Yourself & Explore The Beauty Of The World
              </h2>
              <p className="text-sm">
                We&apos;ll send you exclusive offer and sneak peeks of our best
                deals. Plus travel tips and the latest advice on where you can
                go{" "}
              </p>
              <label
                htmlFor="newsletter"
                className="mt-auto flex flex-row gap-x-2 z-50"
              >
                {visible ? (
                  <span className="text-primary drop-shadow">
                    You are Successfully Subscribed!
                  </span>
                ) : (
                  <>
                    <input
                      type="email"
                      name="newsletter"
                      id="newsletter"
                      disabled={visible}
                      placeholder="Enter your email"
                      className="w-full rounded border-1 border-primary text-sm z-50"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                      className="px-4 py-1 text-xs"
                      onClick={handleSubscribe}
                    >
                      Subscribe
                    </Button>
                  </>
                )}
              </label>
            </article>
          </div>
        </section>
      </Container>
    </section>
  );
};

export default NewsLetter;
