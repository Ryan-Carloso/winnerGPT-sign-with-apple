import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Localization from 'expo-localization';
import translations from './translations/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Idioma padrão

  useEffect(() => {
    // Define o idioma padrão do dispositivo
    const userDefaultLanguage = Localization.locale.slice(0, 2); // 'en', 'pt', 'es', etc.
    console.log('Idioma padrão do usuário:', userDefaultLanguage);

    // Verifica se o idioma do usuário está entre os idiomas suportados
    if (['en', 'pt', 'es', 'fr'].includes(userDefaultLanguage)) {
      setLanguage(userDefaultLanguage);
    } else {
      setLanguage('en'); // Define o idioma padrão como 'en' caso contrário
    }
  }, []);

  const translate = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);