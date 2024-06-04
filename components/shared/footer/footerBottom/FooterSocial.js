/**
 * Title: Write a program using JavaScript on FooterSocial
.
 * Date: 15, August 2023
 */

import Link from "next/link";
import React from "react";
import {
  BiLogoLinkedin,
  BiLogoGithub,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiLogoPinterest,
  BiLogoTiktok,
} from "react-icons/bi";
import Tooltip from "../../tooltip/Tooltip";

const FooterSocial = () => {
  const items = [
    {
      id: 3,
      name: "Facebook",
      icon: <BiLogoFacebook className="text-lg" />,
      href: "https://www.facebook.com",
    },
    {
      id: 4,
      name: "Instagram",
      icon: <BiLogoInstagram className="text-lg" />,
      href: "https://www.instagram.com",
    },
  ];

  return (
    <section>
      <div className="flex flex-row flex-wrap md:justify-normal justify-center items-center gap-2">
        {items.map((item) => (
          <span
            key={item.id}
            className="border border-primary/20 hover:border-primary rounded p-1 h-fit w-fit bg-white"
          >
            <Tooltip text={item.name}>
              <Link href={item.href} title={item.name}>
                {item.icon}
              </Link>
            </Tooltip>
          </span>
        ))}
      </div>
    </section>
  );
};

export default FooterSocial;
