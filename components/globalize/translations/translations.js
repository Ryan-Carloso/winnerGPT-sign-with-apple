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

import loginTranLationFr from './login/fr'
import loginTranLationPt from './login/pt'
import loginTranLationEs from './login/es'
import loginTranLationEn from './login/en'


import globaltext from './globaltext'

const translations = {
  en: {
    ...settingsTranslationsEn,
    ...aboutTranslationsEn,
    ...teamsTranslationsEn,
    ...loginTranLationEn,
    ...globaltext.en
    
  },
  es: {
    ...settingsTranslationsEs,
    ...aboutTranslationsEs,
    ...teamsTranslationsEs,
    ...loginTranLationEs,

    ...globaltext.es

  },
  fr: {
    ...settingsTranslationsFr,
    ...aboutTranslationsFr,
    ...teamsTranslationsFr,
    ...loginTranLationFr,
    ...globaltext.fr

  },
  pt: {
    ...settingsTranslationsPt,
    ...aboutTranslationsPt,
    ...teamsTranslationsPt,
    ...loginTranLationPt,
    ...globaltext.pt

  },
};

export default translations;
