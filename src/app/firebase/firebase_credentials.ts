// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyDwSnxafVJ2l_KpERqKl2u9HVlPXYVyjrU",
  authDomain: "angular-todo-8f13b.firebaseapp.com",
  databaseURL: "https://angular-todo-8f13b-default-rtdb.firebaseio.com",
  projectId: "angular-todo-8f13b",
  storageBucket: "angular-todo-8f13b.appspot.com",
  messagingSenderId: "924127136671",
  appId: "1:924127136671:web:fa304e4cc1bdad62a44baa",
  measurementId: "G-XXWMH4LW51"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// primary firebase config
export const environment = {
    production: true,
    firebaseConfig:{
        apiKey: "AIzaSyDwSnxafVJ2l_KpERqKl2u9HVlPXYVyjrU",
        authDomain: "angular-todo-8f13b.firebaseapp.com",
        databaseURL: "https://angular-todo-8f13b-default-rtdb.firebaseio.com",
        projectId: "angular-todo-8f13b",
        storageBucket: "angular-todo-8f13b.appspot.com",
        messagingSenderId: "924127136671",
        appId: "1:924127136671:web:fa304e4cc1bdad62a44baa",
        measurementId: "G-XXWMH4LW51"
    }
}