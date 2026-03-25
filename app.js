import { db } from "./firebase.js";

import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

async function loadDashboard(){

const notesSnap = await getDocs(collection(db,"notes"));
document.getElementById("notesCount").innerText = notesSnap.size;

const resourcesSnap = await getDocs(collection(db,"resources"));
document.getElementById("resourcesCount").innerText = resourcesSnap.size;

const announcementsSnap = await getDocs(collection(db,"announcements"));
document.getElementById("announcementsCount").innerText = announcementsSnap.size;

const deadlinesSnap = await getDocs(collection(db,"deadlines"));
document.getElementById("deadlinesCount").innerText = deadlinesSnap.size;

}

loadDashboard();