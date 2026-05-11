import TourArchiveLayout from "./TourArchiveLayout"
import TourGrid from "./TourGrid"
import TourFilters from "./TourFilters"
import { useState } from "react";
export default function TourPackage({tours} : any){
     
   return (
     <div>
        <TourArchiveLayout sidebar={<TourFilters />}>
        <TourGrid tours={tours} />
      </TourArchiveLayout>

     </div>
   )
}