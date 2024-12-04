import React, { createContext, useContext, useState, useEffect } from "react";

const DonationContext = createContext();

const STORAGE_KEY = "donation_history";

export function DonationProvider({ children }) {
  const [donations, setDonations] = useState(() => {
    const savedDonations = localStorage.getItem(STORAGE_KEY);
    return savedDonations ? JSON.parse(savedDonations) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(donations));
  }, [donations]);

  const addDonation = (donation) => {
    setDonations((prev) => [
      ...prev,
      {
        ...donation,
        id: Date.now(),
        date: new Date().toLocaleDateString(),
      },
    ]);
  };

  const clearHistory = () => {
    setDonations([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <DonationContext.Provider value={{ donations, addDonation, clearHistory }}>
      {children}
    </DonationContext.Provider>
  );
}

export const useDonations = () => useContext(DonationContext);
