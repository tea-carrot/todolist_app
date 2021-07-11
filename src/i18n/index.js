import i18n from 'i18n-js';
import {I18nManager} from 'react-native';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en';
import ko from './locales/ko';

i18n.translations = {
  en,
  ko,
};
i18n.locale
i18n.fallbacks = true;

const defaultLanguage = {languageTag: 'en', isRTL: false};
const availableLanguages = Object.keys(i18n.translations);

i18n.locale = languageTag;

export default i18n;
