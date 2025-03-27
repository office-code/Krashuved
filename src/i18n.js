import { useEffect, useState } from 'react'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import CryptoJS from 'crypto-js'; // Import CryptoJS
import LanguageDetector from 'i18next-browser-languagedetector'

const fallbackLng = ['english']
const availableLanguages = ['english', 'guinea']


const LANG_SECRET_KEY = 'DHKJHHKJHHDKJJJ@@##!89';

// Get encrypted language from localStorage & convert into decrypted language
const encryptedLanguageValue = localStorage.getItem('selectedLanguage');
const bytes = CryptoJS.AES.decrypt(String(encryptedLanguageValue), LANG_SECRET_KEY);
const decryptedLanguageValue = bytes.toString(CryptoJS.enc.Utf8);
// console.log(decryptedLanguageValue,"decryptedLanguageValue")
i18n.use(Backend)
    // .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: decryptedLanguageValue || "english",
        fallbackLng,
        detection: {
            checkWhitelist: true
        },
        debug: false,
        whitelist: availableLanguages,
        interpolation: {
            escapeValue: false // no need for react. it escapes by default
        }
    });

export default i18n