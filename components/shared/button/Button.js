/**
 * Title: Write a program using JavaScript on Button
.
 */

import React from "react";

const Button = ({ children, className, ...rest }) => {
  return (
    <button
      {...rest}
      className={
        "text-base font-serif bg-green-400 text-black rounded-secondary border-primary border-b-[5px] border-solid hover:bg-primary/90 hover:text-black transition-all delay-100" +
        ` ${className}`
      }
    >
      {children}
    </button>
  );
};

export default Button;
