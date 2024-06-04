/**
 * Title: Write a program using JavaScript on HighlightText
.
 */

import React from "react";

const HighlightText = ({ children }) => {
  return <span className="text-blue-200">{children}</span>;
};

export default HighlightText;
