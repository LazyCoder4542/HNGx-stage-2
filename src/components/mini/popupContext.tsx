import React, { createContext, useState, useContext, useCallback } from "react";

const PopupContext = createContext<IPopupContext | null>(null);

interface IProps {
  children: React.ReactNode;
}
type IPopupContext = {
    value: string | null;
    triggerPopup: (text: string) => void;
    clearPopup: () => void;
  };

export const PopupProvider = ({ children }: IProps) => {
  const [value, setValue] = useState<string | null>(null);
  const triggerPopup = useCallback((text: string) => setValue(text), []);
  const clearPopup = useCallback(() => setValue(null), []);
  console.log("here");
  
  return (
    <PopupContext.Provider value={{ value, triggerPopup, clearPopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
export type { IPopupContext };
