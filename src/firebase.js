import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBvQYeTe9Ji7jAoct7_bwGjVkHrWb7S018",
    authDomain: "fir-tutorial-app-f4724.firebaseapp.com",
    databaseURL: "https://fir-tutorial-app-f4724.firebaseio.com",
    projectId: "fir-tutorial-app-f4724",
    storageBucket: "fir-tutorial-app-f4724.appspot.com",
    messagingSenderId: "534736022006",
    appId: "1:534736022006:web:756caed7a3cd3e41"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;