"use strict";
exports.__esModule = true;
exports.environment = exports.app = exports.firebaseConfig = void 0;
// Import the functions you need from the SDKs you need
var app_1 = require("firebase/app");
exports.firebaseConfig = {
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
exports.app = app_1.initializeApp(exports.firebaseConfig);
// primary firebase config
exports.environment = {
    production: true,
    firebaseConfig: {
        apiKey: "AIzaSyDwSnxafVJ2l_KpERqKl2u9HVlPXYVyjrU",
        authDomain: "angular-todo-8f13b.firebaseapp.com",
        databaseURL: "https://angular-todo-8f13b-default-rtdb.firebaseio.com",
        projectId: "angular-todo-8f13b",
        storageBucket: "angular-todo-8f13b.appspot.com",
        messagingSenderId: "924127136671",
        appId: "1:924127136671:web:fa304e4cc1bdad62a44baa",
        measurementId: "G-XXWMH4LW51"
    }
};
