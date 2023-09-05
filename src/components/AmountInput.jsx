import React from "react";
import FormField from "./FormField";

export default function AmountInput({
   max,
   onChange,
   value,
   categoryName,
   difficulty,
   displayWarning,
 }) {
   return (
     <FormField
       label={
         <>
           Number of questions{" "}
           <span aria-label="required" title="required">
             *
           </span>
         </>
       }
       labelIsFor="number-of-questions"
     >
       <input
         type="number"
         min="5"
         max={max}
         onChange={(e) => onChange(Number(e.target.value))}
         value={value}
         required
         id="number-of-questions"
       />
       {displayWarning && (
         <p className="max-number-questions" role="alert">
           {max} questions available for {categoryName}, {difficulty} difficulty
         </p>
       )}
     </FormField>
   );
 }