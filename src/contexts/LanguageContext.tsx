"use client";
import * as React from "react";

interface ILanguageProviderProps {
  children: React.ReactNode;
}

// Create context with default value
interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  mode: string;
  setMode: (mode: string) => void;
}
export const LanguageContext = React.createContext<LanguageContextType>({
  language: "",
  setLanguage: () => {},
  mode: "",
  setMode: () => {},
});

const LanguageProvider: React.FunctionComponent<ILanguageProviderProps> = (
  props
) => {
  const [language, setLanguage] = React.useState<string>("en");
  const [mode, setMode] = React.useState<string>("light");
  return (
    <LanguageContext.Provider value={{ language, setLanguage, mode, setMode }}>
      {props.children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
