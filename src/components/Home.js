import React, { useState } from "react";
import FirstContent from "./FirstContent";
import SecondContent from "./SecondContent";
import "./styles/Home.css";

function Home() {
  const [showFirstContent, setShowFirstContent] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const headingColorList = [
    "#3d9ec4",
    "#cfae28",
    "#26bec8",
    "#f55748",
    "#b280b9",
  ];

  const renderColoredText = (text) => {
    return text.split("").map((char, index) => {
      const color = headingColorList[index % headingColorList.length];
      return (
        <span key={index} style={{ color: color }}>
          {char}
        </span>
      );
    });
  };

  const handleClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowFirstContent(false);
      setFadeOut(false);
    }, 500);
  };

  const calculateYearDifference = () => {
    const currentDate = new Date();
    const targetDate = new Date("2001-08-16");
    const yearDifference = currentDate.getFullYear() - targetDate.getFullYear();
    return yearDifference;
  };

  return (
    <div className={`content ${fadeOut ? "fade-out" : "fade-in"}`}>
      {showFirstContent ? (
        <FirstContent
          renderColoredText={renderColoredText}
          onClick={handleClick}
          year={calculateYearDifference()}
        />
      ) : (
        <SecondContent />
      )}
    </div>
  );
}

export default Home;
