// importScripts(
//   "https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js"
// ); //ojo! se agrega un -compat al lado de la url...
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js"
// ); //ojo! se agrega un -compat al lado de la url...

// //en public no se puede modularizar, por eso importamos como importscript.
// // // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // import { getMessaging } from "firebase/messaging";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDpBrGNe70fzg4AaJ9lb9K6j1PtZDeI20g",
//   authDomain: "frodoneta-5d9e4.firebaseapp.com",
//   projectId: "frodoneta-5d9e4",
//   storageBucket: "frodoneta-5d9e4.appspot.com",
//   messagingSenderId: "280874418081",
//   appId: "1:280874418081:web:030998f386f5d79117d5e0",
//   measurementId: "G-9H6SZC0X5B",
// };

// // Initialize Firebase en service worker
// const app = firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging(app);

// //PREVIO A MOSTRAR NOTIFICACIONES
// messaging.onBackgroundMessage((payload) => {
//   console.log("Recibiste msg mientras estabas ausente en la app");
//   const notificationTitle = payload.notification.title; //deberia consologuear payload pra inspeccionar todo
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "/logo192.png", //-----------------------------   ¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡CAMBIAR ICONO!!!!!!!!!!!!!!!!!!!!!
//   };

//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   );
// });
