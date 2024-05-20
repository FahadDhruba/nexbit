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


        //const dashRef = query(ref(db, `Questions/${user.uid}/mains/`), orderByValue('details/paper'));
        const dashRef = ref(db, `Questions/${user.uid}/mains/`);

        onValue(dashRef, (snapshot) => {
            const dashRefData = snapshot.val();

            //condition importent

            console.log(dashRefData);


            if (dashRefData === null) {
                // condition { if data is null then show null div}
                document.getElementById('dataTable').innerHTML = `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"> <td colspan="6" class="py-2"> Sorry...!!! No Data Found... </td> </tr>`;
            } else {

                let tableRowData = '';

                for (let exam in dashRefData) {
                    // Accessing data for a specific entry

                    let examid = exam;

                    let examData = dashRefData[exam];

                    let examName = examData.details.examName;
                    let sub = examData.details.sub;
                    let paper = examData.details.paper;
                    let chapter = examData.details.chapter;

                    let mcqcount = 0;

                    for (let y in examData.mcq) {
                        mcqcount += 1;
                    }

                    let cqcount = 0;

                    for (let z in examData.cq) {
                        cqcount += 1;
                    }

                    tableRowData += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"> <th scope="row" class="px-3 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"> ${examName} </br> <span class="text-gray-400 text-sm"> ( ${examid} ) </span> </th> <td class="px-3 py-2"> ${sub}-${paper} </td> <td class="px-3 py-2"> ${chapter} </td> <td class="px-3 py-2"> ${mcqcount}-${cqcount} </td> <td class="px-3 py-2"> <a href="../actions/?eid=${examid}" class="font-bold text-green-600 rounded-sm bg-gray-100 px-2 py-1 dark:text-green-500 hover:underline"> Print </a> </td> <td class="px-3 py-2"> <a href="#" class="font-bold text-blue-600 dark:text-blue-500 hover:underline">Edit</a> <button id="${examid}" class="delBtn font-bold text-red-600 dark:text-red-500 hover:underline">Delete</button> </td> </tr>`;
                }

                document.getElementById('dataTable').innerHTML = tableRowData;

                var divs = document.getElementsByClassName("delBtn");

                // Add click event listener to each Button

                for (var i = 0; i < divs.length; i++) {
                    divs[i].addEventListener("click", function () {
                        // Find Button's Id when its clicked

                        var examId = this.id;


                        let text = `Confirm Droping this Exam.\nExam ID : ${examId}`;

                        if (confirm(text) == true) {
                            examDelete(examId, user.uid);
                        } else {

                        }

                    });
                }

                //&&
            }
        });

    } else {
        // User is signed out

        window.location.href = "../../signin/";
    }
});


function examDelete(examId, userUID) {
    set(ref(db, `Questions/${userUID}/mains/${examId}`), {});
          }
