
import "./App.css";
import { useState } from "react";

function App() {
  const [digits, setDigits] = useState(
    Array.from({ length: 10 }, (_, index) => index)
  );

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    const sourceIndex = Number(
      e.dataTransfer.getData("text/plain")
    );

    if (
      !Number.isInteger(sourceIndex) ||
      sourceIndex < 0 ||
      sourceIndex >= digits.length ||
      sourceIndex === dropIndex
    ) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newDigits = [...digits];

    const [draggedDigit] = newDigits.splice(sourceIndex, 1);
    newDigits.splice(dropIndex, 0, draggedDigit);

    setDigits(newDigits);

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Drag & Drop Digits</h1>

        <p className="description">
          Drag the boxes to reorder the digits 0–9.
        </p>

        <div className="drop-board">
          {digits.map((digit, index) => (
            <div
              key={digit}
              className={`drop-item ${
                draggedIndex === index ? "dragging" : ""
              } ${
                dragOverIndex === index &&
                draggedIndex !== index
                  ? "drag-over"
                  : ""
              }`}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              {digit}
            </div>
          ))}
        </div>

        <p className="tip">
          Tip: Try reordering to make{" "}
          <span className="tip-highlight">0123456789</span>{" "}
          or reverse it!
        </p>
      </div>
    </div>
  );
}

export default App;
