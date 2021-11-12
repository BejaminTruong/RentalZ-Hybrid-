import React, { useState, createContext } from "react";
export const RentalContext = createContext();
export const DataProvider = (props) => {
  const [rental, setRental] = useState([]);
  return (
    <RentalContext.Provider value={[rental, setRental]}>
      {props.children}
    </RentalContext.Provider>
  );
};
