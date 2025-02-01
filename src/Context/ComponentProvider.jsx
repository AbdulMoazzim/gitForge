import { createContext } from "react"
import Introduction from "../Components/Introduction";
import ToolsComponent from "../Components/ToolsComponent";
import CodingPlatformsComponent from "../Components/CodingPlatform";
import Contact from "../Components/Contact";
import CustomSection from "../Components/CustomSection";

export const component = createContext();

export function ComponentProvider({ children }) {
  const comp = {
    "Introduction": Introduction,
    "Contact": Contact,
    "Coding Platforms Stats":  CodingPlatformsComponent,
    "Tools and Languages": ToolsComponent,
    "Custom Section": CustomSection
  }
  
  return <component.Provider value={comp}>{children}</component.Provider>
}