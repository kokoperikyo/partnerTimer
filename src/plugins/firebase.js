import Vue from 'vue'
import {
  firestorePlugin
} from 'vuefire'
import firebase from "@firebase/app";
import '@firebase/firestore';


Vue.use(firestorePlugin)

const firebaseApp = firebase.initializeApp({
  // ここにfirebaseのapi情報をコピペします。
  apiKey: "AIzaSyB5xGhEdQQy0eCHcWQqY5-rnI2IAvYGgnU",
  authDomain: "partnertimer-46d47.firebaseapp.com",
  databaseURL: "https://partnertimer-46d47.firebaseio.com",
  projectId: "partnertimer-46d47",
  storageBucket: "partnertimer-46d47.appspot.com",
  messagingSenderId: "607371623460",
  appId: "1:607371623460:web:ed67a6190005256a24ecb1",
  measurementId: "G-KP0XQQ7ZJH"

});

export const db = firebaseApp.firestore();