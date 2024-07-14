import React, { useState } from "react";

function App() {
  const [boldActive, setBoldActive] = useState(false);
  const [text, setText] = useState("");

  const handleBold = (selectionStart, selectionEnd) => {
    if (!boldActive) return; // Don't apply bolding if button not active

    const selectedText = text.slice(selectionStart, selectionEnd);
    const newText = text.slice(0, selectionStart); // Text before selection
    const afterText = text.slice(selectionEnd); // Text after selection

    // Check if selected text is already bold (wrapped in <b>)
    const isAlreadyBold =
      selectedText.startsWith("<b>") && selectedText.endsWith("</b>");

    let formattedText;
    if (isAlreadyBold) {
      // Remove bold tags if already bolded
      formattedText = newText + selectedText.slice(3, -4) + afterText;
    } else {
      // Apply bold tags if not already bolded
      formattedText = newText + `<b>${selectedText}</b>` + afterText;
    }

    setText(formattedText);
  };

  const handleButtonClick = () => {
    setBoldActive(!boldActive); // Toggle bold button state
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        {boldActive ? "Stop Bolding" : "Start Bolding"}
      </button>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onSelectionChange={(e) => {
          const { selectionStart, selectionEnd } = e.target;
          if (selectionStart !== selectionEnd) {
            handleBold(selectionStart, selectionEnd);
          }
        }}
      />
    </div>
  );
}

export default App;
