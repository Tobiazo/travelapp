import React, { createContext, useContext, useState } from 'react';


const FilterContext = createContext();



/*Her forklares formatet for filter, rekkefølge og format er viktig for å bruke filter riktig

Formatet for filtering per nå:
Filter ser slik ut [[ratingMin, RatingMax], [tags], [kontinenter], klima, showVisisted]

*/

export function FilterProvider({ children }) {
  const [filter, setFilter] = useState([[0,10], [], [], null, "Vis Begge"]);
  const value = { filter, setFilter };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}


export function useFilter() {
  return useContext(FilterContext);
}
