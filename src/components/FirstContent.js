import React from "react";

function FirstContent({ renderColoredText, onClick }) {
  return (
    <>
      <div className="textDiv">
        <h1 className="text-right">{renderColoredText("Fruit")}</h1>
        <h1 className="text-right">{renderColoredText("23")}</h1>
      </div>
      <div className="buttonDiv">
        <button onClick={onClick}>Let's get fruity</button>
      </div>
    </>
  );
}

export default FirstContent;
