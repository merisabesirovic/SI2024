import React, { useEffect } from "react";
import "./GoogleTranslate.css";

// Declare the global 'google' variable for TypeScript
declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslate = () => {
  useEffect(() => {
    // Check if the Google Translate script is already loaded
    const existingScript = document.querySelector(
      'script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]'
    );

    if (!existingScript) {
      // Assign the initialization function to the global `googleTranslateElementInit`
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "sr", // Set Serbian as the original language
              includedLanguages: "en", // Only translate to English
              layout:
                window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
          );
        }
      };

      // Dynamically add the Google Translate script
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.head.appendChild(script);
    } else {
      console.log("Google Translate script already loaded.");
    }
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
