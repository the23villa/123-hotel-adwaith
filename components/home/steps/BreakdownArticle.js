import React, { useState, useEffect } from "react";
import { BiCar } from "react-icons/bi";
import { MdLocationCity, MdPayment } from "react-icons/md";

const BreakdownArticle = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const items = [
    {
      title: "Choose our home",
      icon: (
        <MdLocationCity
          className={`w-8 h-8 ${isScrolled ? "text-primary" : ""}`}
        />
      ),
      description: "Start your journey by selecting your ideal home.",
    },
    {
      title: "Secure and Easy Payment",
      icon: (
        <MdPayment className={`w-8 h-8 ${isScrolled ? "text-primary" : ""}`} />
      ),
      description:
        "Effortless transactions for a worry-free travel experience.",
    },
    {
      title: "Reach Agency on Selected Date",
      icon: <BiCar className={`w-8 h-8 ${isScrolled ? "text-primary" : ""}`} />,
      description: "Contact us to finalize on the chosen date.",
    },
  ];

  return (
    <section className="flex lg:flex-wrap lg:flex-row flex-col gap-4">
      {items.map(({ title, icon, description }, index) => (
        <article
          key={index}
          className="group border border-secondary hover:border-primary transition-colors delay-100 ease-linear p-4 rounded flex flex-col gap-y-2.5 relative overflow-hidden lg:flex-1 lg:basis-60"
        >
          <span className="border w-fit p-2 rounded-primary border-secondary group-hover:border-primary transition-colors delay-100 ease-linear">
            {icon}
          </span>
          <div className="flex flex-col gap-y-0.5 z-10">
            <h2 className="text-lg">{title}</h2>
            <p className="text-sm">{description}</p>
          </div>
          <span
            className={`absolute -bottom-10 right-4 text-secondary/50 text-9xl font-sans ${
              isScrolled ? "group-hover:-bottom-0" : ""
            } transition-all delay-100 ease-linear`}
          >
            0{index + 1}
          </span>
        </article>
      ))}
    </section>
  );
};

export default BreakdownArticle;
