import React from "react";

export default function AlertParagraph({ text, type = "calm" }) {
   /* type can be "calm", "urgent" */
   return (
     <p role="alert" className={`alert-paragraph ${type}`}>
       {text}
     </p>
   );
 }