// src/translations/translations.js
import settingsTranslationsEn from './settings/en';
import settingsTranslationsEs from './settings/es';
import settingsTranslationsFr from './settings/fr';
import settingsTranslationsPt from './settings/pt';

import aboutTranslationsEn from './about/en';
import aboutTranslationsEs from './about/es';
import aboutTranslationsFr from './about/fr';
import aboutTranslationsPt from './about/pt';

import teamsTranslationsEn from './teamscreen.js/en'
import teamsTranslationsEs from './teamscreen.js/es'
import teamsTranslationsPt from './teamscreen.js/pt'
import teamsTranslationsFr from './teamscreen.js/fr'



import globaltext from './globaltext'

const translations = {
  en: {
    ...settingsTranslationsEn,
    ...aboutTranslationsEn,
    ...teamsTranslationsEn,
    ...globaltext.en
  },
  es: {
    ...settingsTranslationsEs,
    ...aboutTranslationsEs,
    ...teamsTranslationsEs,

    ...globaltext.es

  },
  fr: {
    ...settingsTranslationsFr,
    ...aboutTranslationsFr,
    ...teamsTranslationsFr,
    ...globaltext.fr

  },
  pt: {
    ...settingsTranslationsPt,
    ...aboutTranslationsPt,
    ...teamsTranslationsPt,
    ...globaltext.pt

  },
};

export default translations;
