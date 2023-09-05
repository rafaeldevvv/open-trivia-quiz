import React from "react";

export default function FormField({ children, label, labelIsFor }) {
   return (
     <div className="form-field">
       <label htmlFor={labelIsFor}>{label}</label>
       {children}
     </div>
   );
 }