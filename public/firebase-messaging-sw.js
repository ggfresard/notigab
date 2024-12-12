importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging.js")

firebase.initializeApp({
    apiKey: "AIzaSyD3qGi-krjE0uSKVJTiOSIMXmY90BhKeI4",
    authDomain: "notigab-43f93.firebaseapp.com",
    projectId: "notigab-43f93",
    storageBucket: "notigab-43f93.firebasestorage.app",
    messagingSenderId: "393986789317",
    appId: "1:393986789317:web:776f6a3fa81a1d156c45ac",
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
    console.log("Received background message: ", payload)
})
