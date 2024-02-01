import { initializeApp } from 'firebase/app';
    import { getDatabase, ref, set, onValue } from 'firebase/database';

    var firebaseConfig = {
        apiKey: "YOUR_WEB_API_KEY",
        authDomain: "deft-cove-363816.firebaseapp.com",
        projectId: "deft-cove-363816",
        storageBucket: "deft-cove-363816.appspot.com",
        messagingSenderId: "467462296842",
        appId: "1:467462296842:web:bce6c704f4d70208e896f3"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Get a reference to the Firebase Realtime Database
    const database = getDatabase(app);

    // Function to get the client's IP address
    function getClientIP(callback) {
        fetch('https://api64.ipify.org?format=json')
            .then(response => response.json())
            .then(data => callback(data.ip))
            .catch(error => console.error('Error fetching IP:', error));
    }

    console.log(database);