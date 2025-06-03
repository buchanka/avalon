import React from 'react';
import ProductCards from "../components/ProductCards";
import FilterButton from "../components/FilterButton";
import SortButton from "../components/SortButton";
import CollectionBadges from "../components/CollectionBadges";
function Catalog(){
return(
    <>
     <div className="flex flex-col gap-4 md:flex-row md:justify-between px-4 md:px-20 py-4">
        <FilterButton/>
        <CollectionBadges/>
        <SortButton/>
    </div>
    <ProductCards></ProductCards>
    <ProductCards></ProductCards>
    </>
)
}

export default Catalog