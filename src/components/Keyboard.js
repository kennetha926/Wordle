/* eslint-disable */
import React, {useContext, useCallback, useEffect} from 'react';
import {AppContext} from '../App';
import Key from "./Key"; 

function Keyboard() {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const {disabledLetters, currAttempt, gameOver, onEnter, onDelete, onSelectLetter} = useContext(AppContext);
  
  const handleKeyboard = useCallback((event) => {
    if (gameOver.gameOver) return; 
    if (event.key === "Enter"){
      onEnter();
    } else if (event.key === "Backspace") {
      onDelete();
    } else {
      keys1.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys2.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys3.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
    }
  }, [currAttempt]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {keys1.map((key, i) => {
        return <React.Fragment key={`${key}_${i}`}><Key keyVal={key} disabled={disabledLetters.includes(key)} /></React.Fragment>
      })}
      </div>
      <div className="line2">
      {keys2.map((key, i) => {
        return <React.Fragment key={`${key}_${i}`}><Key keyVal={key} disabled={disabledLetters.includes(key)}  /></React.Fragment>
      })}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey />
      {keys3.map((key, i) => {
        return <React.Fragment key={`${key}_${i}`}><Key keyVal={key} disabled={disabledLetters.includes(key)} /></React.Fragment>
      })}
       <Key keyVal={"DELETE"} bigKey />
      </div>
    </div>
  )
}

export default Keyboard;