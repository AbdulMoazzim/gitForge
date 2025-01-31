import { createContext, useState } from "react"

export const data = createContext();

export function DataProvider({ children }) {
  const [sections, setSections] = useState([]);
  
  return <data.Provider value={[sections, setSections]}>{children}</data.Provider>
}