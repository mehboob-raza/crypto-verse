import React, { createContext, useContext, useEffect, useState } from "react";

// export const CryptoState = () => {
//   useContext(Crypto);
// };

export const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("PKR");
  const [symbol, setSymbol] = useState("RS");
  console.log("currency currency", currency);

  useEffect(() => {
    if (currency === "PKR") setSymbol("RS");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);
  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;
