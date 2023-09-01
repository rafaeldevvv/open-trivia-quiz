import React from "react";

export default function FinalScreen({correctQuestions, numberOfQuestions}) {
   return (
      <div>
         <p>
            n out of m questions
         </p>
         <p>
            N%
         </p>
         <p>
            score
         </p>
         <button>
            Play again
         </button>
         <button>
            Change category
         </button>
      </div>
   )
}