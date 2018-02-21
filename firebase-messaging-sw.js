importScripts('https://www.gstatic.com/firebasejs/4.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.10.0/firebase-messaging.js');

firebase.initializeApp({
    "messagingSenderId": "998390484019"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload){
    console.log('Messagem recebida de background');
    return self.registration.showNotification({}, {});
})

