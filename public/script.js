      // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
      import {getDatabase, set ,get, update ,remove ,ref, child} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
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




const db = getDatabase();

var user = document.querySelector('.name-input');
var likeBtn = document.querySelector('.btn');
var insta = document.querySelector('.insta-input');

function submit(){
set(ref(db,'people/' + user.value),{
  Name:user.value,
  Instagram : insta.value
})
.then(()=>{
alert('sucess!')
})
.catch((error)=>{
alert(error)
});


}
likeBtn.addEventListener('click',submit);

