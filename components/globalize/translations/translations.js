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

import loginTransLationFr from './login/fr'
import loginTransLationPt from './login/pt'
import loginTransLationEs from './login/es'
import loginTransLationEn from './login/en'


import SubsTransLationFr from './subs/fr'
import SubsTransLationPt from './subs/pt'
import SubsTransLationEs from './subs/es'
import SubsTransLationEn from './subs/en'



import globaltext from './globaltext'

const translations = {
  en: {
    ...settingsTranslationsEn,
    ...aboutTranslationsEn,
    ...teamsTranslationsEn,
    ...loginTransLationEn,
    ...SubsTransLationEn,
    ...globaltext.en
    
  },
  es: {
    ...settingsTranslationsEs,
    ...aboutTranslationsEs,
    ...teamsTranslationsEs,
    ...loginTransLationEs,
    ...SubsTransLationEs,
    ...globaltext.es

  },
  fr: {
    ...settingsTranslationsFr,
    ...aboutTranslationsFr,
    ...teamsTranslationsFr,
    ...loginTransLationFr,
    ...SubsTransLationFr,
    ...globaltext.fr

  },
  pt: {
    ...settingsTranslationsPt,
    ...aboutTranslationsPt,
    ...teamsTranslationsPt,
    ...loginTransLationPt,
    ...SubsTransLationPt,
    ...globaltext.pt

  },
};

export default translations;
