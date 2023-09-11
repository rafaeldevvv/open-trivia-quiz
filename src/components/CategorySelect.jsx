import React from "react";
import Spinner from "./Spinner";
import FormField from "./FormField";
import Select from "./Select";

export default function CategorySelect({isLoading, selectedCategoryId, categories, onChange}) {
   return (
     <FormField label="Category" labelIsFor="category-select">
       <div
         style={{
           display: isLoading ? "flex" : "block",
           gap: "1rem",
           alignItems: "center",
         }}
       >
         <Select
           id="category-select"
           options={categories}
           value={selectedCategoryId}
           defaultOption={"Any category"}
           onChange={(value) =>
             onChange(value === "any" ? null : Number(value))
           }
           disabled={isLoading}
         />
         {isLoading && <Spinner loadingTarget="categories" size={20} />}
       </div>
     </FormField>
   );
 }
 