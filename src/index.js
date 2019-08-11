import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";

import "firebase/auth";
import "firebase/firestore";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

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

firebase.auth().languageCode = "nb";
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    ReactDOM.render(<App />, document.getElementById("root"), () =>
      document.getElementById("loader").setAttribute("style", "display: none")
    );
  } else {
    ui.start("#firebaseui-auth-container", uiConfig);
  }
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
