import React from "react";

export default function LiveParagraph({ text, type = "calm" }) {
   /* type can be "calm", "urgent" */
   return (
     <p aria-live="polite" className={`alert-paragraph ${type}`}>
       {text}
     </p>
   );
 }