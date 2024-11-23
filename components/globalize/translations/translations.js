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


import AuthTransLationFr from './auth/fr'
import AuthTransLationPt from './auth/pt'
import AuthTransLationEs from './auth/es'
import AuthTransLationEn from './auth/en'

import NotifyTransLationFr from './notify/fr'
import NotifyTransLationPt from './notify/pt'
import NotifyTransLationEs from './notify/es'
import NotifyTransLationEn from './notify/en'



import globaltext from './globaltext'

const translations = {
  en: {
    ...settingsTranslationsEn,
    ...aboutTranslationsEn,
    ...teamsTranslationsEn,
    ...loginTransLationEn,
    ...SubsTransLationEn,
    ...AuthTransLationEn,
    ...NotifyTransLationEn,

    ...globaltext.en
    
  },
  es: {
    ...settingsTranslationsEs,
    ...aboutTranslationsEs,
    ...teamsTranslationsEs,
    ...loginTransLationEs,
    ...SubsTransLationEs,
    ...AuthTransLationEs,
    ...NotifyTransLationEs,
    ...globaltext.es

  },
  fr: {
    ...settingsTranslationsFr,
    ...aboutTranslationsFr,
    ...teamsTranslationsFr,
    ...loginTransLationFr,
    ...SubsTransLationFr,
    ...AuthTransLationFr,
    ...NotifyTransLationFr,
    ...globaltext.fr

  },
  pt: {
    ...settingsTranslationsPt,
    ...aboutTranslationsPt,
    ...teamsTranslationsPt,
    ...loginTransLationPt,
    ...SubsTransLationPt,
    ...AuthTransLationPt,
    ...NotifyTransLationPt,
    ...globaltext.pt

  },
};

export default translations;
