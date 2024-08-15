import React, { useState, useEffect } from "react";
import "./styles/SecondContent.css";

const IMAGE_COUNT = 10;

function SecondContent() {
  const [images, setImages] = useState([]);
  const [imagePaths, setImagePaths] = useState([]);
  const [audioPaths, setAudioPaths] = useState([]);
  const [showClickText, setShowClickText] = useState(true);

  useEffect(() => {
    const importAll = (r) => r.keys().map(r);
    setImagePaths(
      importAll(
        require.context("/public/assets/pictures", false, /\.(png|jpe?g|svg)$/)
      )
    );
    setAudioPaths(
      importAll(require.context("/public/assets/audios", false, /\.(mp3|wav)$/))
    );

    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === "r") {
        resetScreen();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const getRandomPosition = () => {
    const xMargin = window.innerWidth * 0.125;
    const yMargin = window.innerHeight * -0.175;

    return {
      x: Math.random() * (window.innerWidth * 0.65) + xMargin,
      y: Math.random() * (window.innerHeight * 0.65) + yMargin,
      rotation: Math.random() * 90 - 45,
    };
  };

  const getRandomImage = () =>
    imagePaths[Math.floor(Math.random() * imagePaths.length)];

  const getRandomAudio = () =>
    audioPaths[Math.floor(Math.random() * audioPaths.length)];

  const handleScreenClick = () => {
    if (showClickText) {
      setShowClickText(false);
    }

    const { x, y, rotation } = getRandomPosition();

    const newImage = {
      id: Date.now(),
      src: getRandomImage(),
      style: {
        top: `${y}px`,
        left: `${x}px`,
        "--rotation": `${rotation}deg`,
      },
    };

    const audio = new Audio(getRandomAudio());
    audio.play();

    setImages((prev) => {
      if (prev.length >= IMAGE_COUNT) {
        const updatedImages = [...prev.slice(1), newImage];
        return updatedImages;
      } else {
        return [...prev, newImage];
      }
    });
  };

  const resetScreen = () => {
    setImages([]);
    setShowClickText(true);
  };

  return (
    <div className="second-content" onClick={handleScreenClick}>
      {showClickText && <h1 className="fade-in">Click on the screen</h1>}
      {images.map((image) => (
        <img
          key={image.id}
          src={image.src}
          alt="Random"
          className="random-image bounce-in"
          style={{
            ...image.style,
            transform: `rotate(${image.style["--rotation"]})`,
          }}
        />
      ))}
    </div>
  );
}

export default SecondContent;
