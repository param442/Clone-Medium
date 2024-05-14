import { createContext, useContext } from "react";
export const ThemeContext = createContext(null);
export const ThemeProvider = ThemeContext.Provider;
const useTheme = () => useContext(ThemeContext);
export default useTheme;
