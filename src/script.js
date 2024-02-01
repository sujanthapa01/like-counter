      // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
      import {getDatabase, set ,get, update ,remove ,ref, child,onValue} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries

      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
        apiKey: "AIzaSyAdmq9JDsWdBdtTC2sIYloCtOPjTbuQXSA",
        authDomain: "deft-cove-363816.firebaseapp.com",
        databaseURL: "https://deft-cove-363816-default-rtdb.firebaseio.com",
        projectId: "deft-cove-363816",
        storageBucket: "deft-cove-363816.appspot.com",
        messagingSenderId: "467462296842",
        appId: "1:467462296842:web:bce6c704f4d70208e896f3",
        measurementId: "G-L361KEHQ1X",
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
    //   const analytics = getAnalytics(app);
    var msg = document.querySelector('.msg');
    const db = getDatabase();
    
    var user = document.querySelector('.name-input');
    var likeBtn = document.querySelector('.btn');
    var insta = document.querySelector('.insta-input');
    var likeCountElement = document.getElementById('likeCount');
    
    // Function to get the user's IP address
    function getIPAddress() {
      return fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(error => {
          console.error('Error fetching IP address:', error);
          return null;
        });
    }
    
    // Function to update the like count in the UI
    function updateLikeCountUI(count) {
      likeCountElement.innerText = count;
    }
    
    // Fetch and display the initial like count
    const likeCountRef = ref(db, 'posts/likeCount');
    onValue(likeCountRef, (snapshot) => {
      const currentLikeCount = snapshot.val() || 0;
      updateLikeCountUI(currentLikeCount);
    });
    
    // Function to check if the user has already liked when the page loads
    function checkLikedStatus() {
      getIPAddress().then(ipAddress => {
        if (!ipAddress) {
          console.error('Unable to retrieve IP address.');
          msg.innerText = 'liked '
          return;
        }
    
        const userRef = ref(db, `people/${ipAddress}`);
    
        get(child(userRef, 'liked')).then(snapshot => {
          const alreadyLiked = snapshot.val() === true;
    
          if (alreadyLiked) {
            msg.innerText = 'You already liked 😁';
            disableForm();
          }
        });
      });
    }
    
    // Call the function to check liked status when the page loads
    checkLikedStatus();
    
    likeBtn.addEventListener('click', submit);
    
    async function submit() {
      // Check if both input fields are filled
      if (user.value.trim() === '' || insta.value.trim() === '') {
        msg.innerText = 'Please fill in both your name and Instagram before liking. 😊';
        return;
      }
    
      const ipAddress = await getIPAddress();
    
      if (!ipAddress) {
        console.error('Unable to retrieve IP address.');
        return;
      }
    
      const userRef = ref(db, `people/${ipAddress}`);
    
      // Check if the user has already liked
      get(child(userRef, 'liked')).then(snapshot => {
        const alreadyLiked = snapshot.val() === true;
    
        if (alreadyLiked) {
          msg.innerText = 'You already liked 😁';
          return;
        }
    
        // If not already liked, proceed with the like
        set(userRef, {
          Name: user.value,
          Instagram: insta.value,
          liked: true // Mark the user as liked
        })
          .then(() => {
            msg.innerText = 'Thanks for the like! 😍';
    
            // Increment the individual user like count
            get(likeCountRef).then(snapshot => {
              const currentLikeCount = snapshot.val() || 0;
              set(likeCountRef, currentLikeCount + 1);
            });
    
            // Increment the total like count
            get(ref(db, 'posts/totalLikes')).then(snapshot => {
              const currentTotalLikeCount = snapshot.val() || 0;
              set(ref(db, 'posts/totalLikes'), currentTotalLikeCount + 1);
            });
    
            // Disable the form after a successful like
            disableForm();
          })
          .catch(error => {
            alert(error);
          });
      });
    }
    
    // Function to disable the form elements
    function disableForm() {
      user.disabled = true;
      insta.disabled = true;
      likeBtn.disabled = true;
      user.style.display = 'none';
      insta.style.display = 'none';
      likeBtn.style.display = 'none'

    }
    
    