
import { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js';
import Routes from "./Routes"
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18n from "./i18n";
import GoToTop from "../src/GoToTop";

const App = () => {
  const LANG_SECRET_KEY = 'DHKJHHKJHHDKJJJ@@##!89';
  useEffect(() => {
    if (localStorage.getItem('selectedLanguage') === null) {
      // Securely store the language in local storage using CryptoJS
      const encryptedLanguage = CryptoJS.AES.encrypt(
        "english",
        LANG_SECRET_KEY
      ).toString();
      localStorage.setItem('selectedLanguage', encryptedLanguage);
    }
  }, [localStorage.getItem('selectedLanguage')])
  return (
    <>
      <GoToTop />
      <Routes />
      <ToastContainer />
    </>
  );
};

export default App;