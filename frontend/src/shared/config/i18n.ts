import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { Lang } from '../constants';

i18n
	.use(HttpBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: Lang.EN,
		supportedLngs: Object.values(Lang),

		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json',
		},

		ns: ['common'],
		defaultNS: 'common',

		interpolation: {
			escapeValue: false,
		},

		detection: {
			lookupLocalStorage: 'lang',
			order: ['localStorage', 'cookie', 'navigator'],
			caches: ['localStorage'],
		},

		react: {
			useSuspense: true,
		},
	});

export default i18n;
