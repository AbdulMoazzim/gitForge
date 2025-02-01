import { createContext, useState } from "react"
import { useLocalStorage } from "../Hooks/useLocalStorage";

export const data = createContext();

export function DataProvider({ children }) {
  const [sections, setLocalStorage] = useLocalStorage();
  
  return <data.Provider value={[sections, setLocalStorage]}>{children}</data.Provider>
}