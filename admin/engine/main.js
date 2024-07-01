// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getAnalytics
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import {
    getDatabase,ref,set,onValue,query,update,get,orderByChild,orderByValue
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import {
    getAuth,signInWithPopup,GoogleAuthProvider,signInWithRedirect,onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDMkHagk9VF0Ek3HQi1ewDO8j6Y1mvS94U",
    authDomain: "nexusbyte-9d357.firebaseapp.com",
    databaseURL: "https://nexusbyte-9d357-default-rtdb.firebaseio.com",
    projectId: "nexusbyte-9d357",
    storageBucket: "nexusbyte-9d357.appspot.com",
    messagingSenderId: "630594067402",
    appId: "1:630594067402:web:5eac3d5dd5686fb2aa4d33",
    measurementId: "G-8C9BLJ7QKB",
};


// firebase code

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Initialise Database

const db = getDatabase(app);

// auth setup

const auth = getAuth();

auth.languageCode = "it";

const provider = new GoogleAuthProvider();

// Check user signed in or not

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in

        // document.getElementById("userUID").innerHTML = user.uid;

        document.getElementById("userName").innerHTML = user.displayName;

        document.getElementById("userMail").innerHTML = user.email;

        document.getElementById("userImg").src = user.photoURL;

        function filterFunction() {
            const input = document.getElementById("boardRef");
            const filter = input.value.toUpperCase();
            const div = document.getElementById("reffilHolder");
            const a = div.getElementsByTagName("button");
            for (let i = 0; i < a.length; i++) {
              txtValue = a[i].textContent || a[i].innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = "";
              } else {
                a[i].style.display = "none";
              }
            }
          }
        

    } else {
        // User is signed out

        window.location.href = "../../signin/";
    }
});


function examDelete(examId, userUID) {
    set(ref(db, `Questions/${userUID}/mains/${examId}`), {});
          }
