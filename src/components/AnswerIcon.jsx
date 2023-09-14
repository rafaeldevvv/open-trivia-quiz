import React from "react";

export default function AnswerIcon({ isCorrect }) {
   if (isCorrect) {
     return (
       <img
         className="answer-icon"
         aria-hidden="true"
         alt=""
         src="images/tick.png"
       />
     );
   } else {
     return (
       <img
         className="answer-icon"
         aria-hidden="true"
         alt=""
         src="images/block.svg"
       />
     );
   }
 }