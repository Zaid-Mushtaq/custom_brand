// locals.js
import React, { createContext, useContext, useState } from "react";
import { IntlProvider } from "react-intl";
import enTranslations from "../translations/en-US.json";
import nlTranslations from "../translations/nl-NL.json";

const LocalsContext = createContext();

export const LocalsProvider = ({ children }) => {
  const [locale, setLocale] = useState("en"); // Default locale is "en"

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
  };

  const messages = {
    en: enTranslations,
    nl: nlTranslations,
  };

  return (
    <LocalsContext.Provider value={{ locale, changeLocale }}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </LocalsContext.Provider>
  );
};

export const useLocals = () => {
  const context = useContext(LocalsContext);
  if (!context) {
    throw new Error("useLocals must be used within a LocalsProvider");
  }
  return context;
};
