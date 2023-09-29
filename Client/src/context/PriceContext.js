import React, { createContext, useContext } from 'react';

const PriceContext = createContext();

export function usePrice() {
  return useContext(PriceContext);
}

export function PriceProvider({ children }) {
  const formatPrice = (number, currencySymbol = '₹') => {
    return `${currencySymbol}${number.toFixed(2)}`;
  };
  const value = {
    formatPrice,
  };

  return (
    <PriceContext.Provider value={value}>
      {children}
    </PriceContext.Provider>
  );
}
