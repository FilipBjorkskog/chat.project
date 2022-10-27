// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, set } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAcGYac04ouUyv-gHOhdLE_UtPEJVYJzpw",
    authDomain: "chat-91252.firebaseapp.com",
    databaseURL: "https://chat-91252-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chat-91252",
    storageBucket: "chat-91252.appspot.com",
    messagingSenderId: "456294723984",
    appId: "1:456294723984:web:6a7ae238cddff03fa9c315",
    databaseURL: "https://chat-91252-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initializes Realtime Database and get a reference service
const db = getDatabase(app);

// create reference, where in the database we want to take info from
const chatRef = ref(db, '/chat');


// listens for database changes
onChildAdded(chatRef, function (data) {

    // create element and append to list element
    const message = document.createElement("li")
    message.innerText = new Date(data.key).toLocaleDateString("fi-Fi") + ": " +  data.val(); // copy message from input

    list.appendChild(message)
})

const input = document.querySelector("input");
const list = document.querySelector("ul")

input.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {

        // create 'unique' id for message
        const messageId = new Date();

        // send to database
        set(ref(db, "chat/" + messageId), input.value)


        // clear input
        input.value = "";
    }
})