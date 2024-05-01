import React from "react";

const CustomParagraph = ({ text, customClass }) => {
  return <p className={customClass}>{text}</p>;
};

export default CustomParagraph;
