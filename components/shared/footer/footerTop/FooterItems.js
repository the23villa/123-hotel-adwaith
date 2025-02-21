/**
 * Title: Write a program using JavaScript on FooterItems
.
 * Date: 15, August 2023
 */

import Link from "next/link";
import React from "react";

const FooterItems = () => {
  const items = [
    {
      id: 1,
      name: "Quick Links",
      href: [
        {
          id: 11,
          name: "How to Book",
          href: "/how-to-book",
        },
        {
          id: 12,
          name: "Site Map",
          href: "/site-map",
        },
        {
          id: 13,
          name: "Careers",
          href: "/careers",
        },
        {
          id: 14,
          name: "About Us",
          href: "/about-us",
        },
        {
          id: 15,
          name: "Blogs",
          href: "/blogs",
        },
      ],
    },
    {
      id: 3,
      name: "Support",
      href: [
        {
          id: 31,
          name: "Contact Us",
          href: "/contact-us",
        },
        {
          id: 32,
          name: "Legal Notice",
          href: "/legal-notice",
        },
        {
          id: 33,
          name: "FAQs",
          href: "/faqs",
        },
      ],
    },
  ];

  return (
    <section>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 text-white">
        {items.map(({ id, name, href }) => (
          <div key={id} className="flex flex-col gap-y-2 font-serif">
            <h2 className="text-lg">{name}</h2>
            <ul className="text-sm flex flex-col gap-y-1">
              {href.map(({ id, name, href }) => (
                <li key={id} className=" font-serif">
                  <Link href={href}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FooterItems;
