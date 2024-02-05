
      import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
      import { getAnalytics, logEvent, } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
      import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
      import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

      const firebaseConfig = {
        apiKey: "AIzaSyDMkHagk9VF0Ek3HQi1ewDO8j6Y1mvS94U",
        authDomain: "nexusbyte-9d357.firebaseapp.com",
        databaseURL: "https://nexusbyte-9d357-default-rtdb.firebaseio.com",
        projectId: "nexusbyte-9d357",
        storageBucket: "nexusbyte-9d357.appspot.com",
        messagingSenderId: "630594067402",
        appId: "1:630594067402:web:5eac3d5dd5686fb2aa4d33",
        measurementId: "G-8C9BLJ7QKB"
      };

      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);

      const auth = getAuth();
      auth.languageCode = "it";

      const provider = new GoogleAuthProvider();

      const database = getDatabase(app);

      function writeUserData(
        photoURL,
        email,
        creationTime,
        displayName,
        uid,
        phoneNumber,
        pool
      ) {
        const db = getDatabase();
        set(ref(db, "users/" + uid), {
          photoURL: photoURL,
          email: email,
          creationTime: creationTime,
          displayName: displayName,
          uid: uid,
          phoneNumber: phoneNumber,
          pool: pool,
        })
        .then(() => {
          // Data saved successfully!
          
          document.getElementById("res").innerHTML = "Signing you In..."

        })
        .catch((error) => {
          // The write failed...
        });
        
      }

      function signInInitiator() {
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            
            const poor = JSON.stringify(user);

            writeUserData(
              user.photoURL,
              user.email,
              user.metadata.creationTime,
              user.displayName,
              user.uid,
              user.phoneNumber,
              poor
            );
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
          
      }

      var signInBtn = document.getElementById("signInBtn");

      signInBtn.addEventListener("click", signInInitiator);
    
