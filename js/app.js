import { auth, db } from "./firebase.js";

import { onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

import { doc, getDoc }
from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const sidebar = document.getElementById("sidebar");

onAuthStateChanged(auth, async(user)=>{

if(!user){
window.location="index.html";
return;
}

const userDoc = await getDoc(doc(db,"users",user.uid));

if(!userDoc.exists()){
alert("User role not found");
return;
}

const role = userDoc.data().role;

/* =====================
STUDENT SIDEBAR
===================== */

if(role==="student"){

sidebar.innerHTML = `
<h3>StudySync</h3>

<a href="dashboard.html">Dashboard</a>

<a href="notes.html">Professor Notes</a>

<a href="resources.html">My Resources</a>

<a href="deadlines.html">Deadlines</a>

<a href="announcements.html">Announcements</a>

<a href="timetable.html">Timetable</a>

<a href="mark-attendance.html">Mark Attendance</a>

<a href="#" id="logoutBtn">Logout</a>
`;

}

/* =====================
TEACHER SIDEBAR
===================== */

if(role==="teacher"){

sidebar.innerHTML = `
<h3>StudySync</h3>

<a href="attendance.html">Attendance Session</a>

<a href="notes.html">Upload Notes</a>

<a href="deadlines.html">Deadlines</a>

<a href="announcements.html">Announcements</a>

<a href="#" id="logoutBtn">Logout</a>
`;

}

/* =====================
LOGOUT
===================== */

document.getElementById("logoutBtn").onclick = async()=>{

await signOut(auth);

window.location="index.html";

};

});