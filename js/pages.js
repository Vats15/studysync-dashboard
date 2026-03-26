import { db, auth } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
updateDoc,
doc,
getDoc,
query,
orderBy
}
from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

let role="";
let userEmail="";

/* =====================
AUTH
===================== */

onAuthStateChanged(auth, async(user)=>{

if(!user){
window.location="index.html";
return;
}

userEmail=user.email;

const userDoc = await getDoc(doc(db,"users",user.uid));
role=userDoc.data().role;

initPage();

});

/* =====================
PAGE DETECTION
===================== */

function initPage(){

const page = window.location.pathname;

if(page.includes("notes")){
loadNotes();
}

if(page.includes("deadlines")){
loadDeadlines();
}

if(page.includes("announcements")){
loadAnnouncements();
}

if(page.includes("resources")){
loadResources();
}

}

/* =====================
NOTES
===================== */

async function loadNotes(){

const container=document.getElementById("notesContainer");

if(!container) return;

container.innerHTML="";

const snapshot = await getDocs(collection(db,"notes"));

snapshot.forEach(document=>{

const data=document.data();

container.innerHTML+=`

<div class="card">

<h3>${data.title}</h3>

<p style="opacity:0.7">
Uploaded by ${data.uploadedBy}
</p>

<button class="btn"
onclick="window.open('${data.pdfURL}')">
Open
</button>

</div>

`;

});

}

/* ADD NOTE */

window.addNote = async function(){

const title=document.getElementById("noteTitle").value;
const link=document.getElementById("noteLink").value;

if(!title || !link){
alert("Fill all fields");
return;
}

await addDoc(collection(db,"notes"),{

title:title,
pdfURL:link,
uploadedBy:userEmail,
date:new Date().toISOString()

});

location.reload();

};

/* =====================
DEADLINES
===================== */

async function loadDeadlines(){

const container=document.getElementById("deadlineContainer");

if(!container) return;

container.innerHTML="";

const q=query(collection(db,"deadlines"),orderBy("dueDate"));

const snapshot=await getDocs(q);

snapshot.forEach(document=>{

const data=document.data();
const id=document.id;

container.innerHTML+=`

<div class="card">

<h3>${data.title}</h3>

<p>${data.subject}</p>

<p style="opacity:0.7">
Due: ${data.dueDate}
</p>

${
role==="teacher" ?

`<button class="btn"
onclick="deleteDeadline('${id}')">
Delete
</button>`

: ""
}

</div>

`;

});

}

/* ADD DEADLINE */

window.addDeadline = async function(){

const title=document.getElementById("title").value;
const subject=document.getElementById("subject").value;
const date=document.getElementById("dueDate").value;

await addDoc(collection(db,"deadlines"),{

title,
subject,
dueDate:date

});

location.reload();

};

/* DELETE DEADLINE */

window.deleteDeadline = async function(id){

await deleteDoc(doc(db,"deadlines",id));

location.reload();

};

/* =====================
ANNOUNCEMENTS
===================== */

async function loadAnnouncements(){

const container=document.getElementById("announcementsContainer");

if(!container) return;

container.innerHTML="";

const q=query(collection(db,"announcements"),orderBy("date","desc"));

const snapshot=await getDocs(q);

snapshot.forEach(document=>{

const data=document.data();
const id=document.id;

container.innerHTML+=`

<div class="card">

<p>${data.text}</p>

<p style="opacity:0.7">
${new Date(data.date).toLocaleDateString()}
</p>

${
role==="teacher" ?

`<button class="btn"
onclick="deleteAnnouncement('${id}')">
Delete
</button>`

: ""
}

</div>

`;

});

}

/* ADD ANNOUNCEMENT */

window.addAnnouncement = async function(){

const text=document.getElementById("announcementText").value;

await addDoc(collection(db,"announcements"),{

text,
postedBy:userEmail,
date:new Date().toISOString()

});

location.reload();

};

/* DELETE */

window.deleteAnnouncement = async function(id){

await deleteDoc(doc(db,"announcements",id));

location.reload();

};

/* =====================
RESOURCES
===================== */

async function loadResources(){

const container=document.getElementById("resourceContainer");

if(!container) return;

container.innerHTML="";

const snapshot = await getDocs(collection(db,"resources"));

snapshot.forEach(document=>{

const data=document.data();

if(
data.uploadedBy===userEmail ||
(data.sharedWith && data.sharedWith.includes(userEmail))
){

container.innerHTML+=`

<div class="card">

<h3>${data.title}</h3>

<button class="btn"
onclick="window.open('${data.url}')">
Open
</button>

</div>

`;

}

});

}

/* ADD RESOURCE */

window.uploadResource = async function(){

const title=document.getElementById("title").value;
const link=document.getElementById("driveLink").value;
const share=document.getElementById("shareEmail").value;

let emails=[];

if(share){
emails=share.split(",");
}

await addDoc(collection(db,"resources"),{

title,
url:link,
uploadedBy:userEmail,
sharedWith:emails

});

location.reload();

};

