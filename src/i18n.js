import en from './locales/en.json';
import es from './locales/es.json';

import {createI18n} from "vue-i18n";
const savedLanguage = localStorage.getItem('language') || 'en';

const i18n = createI18n({
    legacy: false,
    locale: savedLanguage,
    globalInjection: true,
    messages: {
        en,
        es
    }
});

export default i18n;
