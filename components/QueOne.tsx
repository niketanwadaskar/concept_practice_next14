import React, { useState, useEffect } from "react";

const SquareGrid = () => {
  const totalSquares = 60; // Total number of squares
  const rows = 6; // Number of rows
  const squaresPerRow = totalSquares / rows; // Number of squares per row

  const [squares, setSquares] = useState(Array(totalSquares).fill("black"));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSquares((prevSquares) => {
        const newSquares = [...prevSquares];
        newSquares[currentIndex] = "white";
        return newSquares;
      });

      // Increment the index to the next square
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSquares);
    }, 1000); // Update every second

    // Reset to black after all squares are white
    if (currentIndex === 0) {
      setSquares(Array(totalSquares).fill("black"));
    }

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [currentIndex]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${squaresPerRow}, 50px)`, gap: "5px" }}>
      {squares.map((color, index) => (
        <div
          key={index}
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};

export default SquareGrid;
