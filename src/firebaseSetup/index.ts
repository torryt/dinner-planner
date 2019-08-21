import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBB73Tgl1hg-kvjZCCXTyTg3z73S7I5lf0",
  authDomain: "dinnerplanner-48f1d.firebaseapp.com",
  databaseURL: "https://dinnerplanner-48f1d.firebaseio.com",
  projectId: "dinnerplanner-48f1d",
  storageBucket: "",
  messagingSenderId: "879051241543",
  appId: "1:879051241543:web:946d49d59b962d39"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().languageCode = "nb-NO";
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult: any, redirectUrl: any) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      const loaderEl = document.getElementById("loader");
      if (loaderEl) {
        loaderEl.style.display = "none";
      }
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: window.location.pathname,
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
  // Terms of service url.
  // tosUrl: "<your-tos-url>",
  // Privacy policy url.
  // privacyPolicyUrl: "<your-privacy-policy-url>"
};

export { firebase, ui, uiConfig };
