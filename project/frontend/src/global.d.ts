// global.d.ts
export {};

declare global {
  interface Window {
    google: any; // Declare the google object
    googleTranslateElementInit: () => void; // Declare the googleTranslateElementInit function
  }
}
