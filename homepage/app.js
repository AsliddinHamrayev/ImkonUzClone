const selectBtn = document.querySelector('.buttons');
const regions = document.querySelector('.regions-box');
const clickBtn = document.querySelector('.btn-click');
const medicine = document.querySelector('.medicine-flex')
const animation = document.querySelector('.medicine-animation')
const clickAnimation = document.querySelector('.medicine__btn')


selectBtn.addEventListener('click', () => {
    regions.classList.toggle('regions-box_block')
})

medicine.addEventListener('click', () => {
    animation.classList.toggle('medicine-animation-visibility')
})


const profile = document.querySelector('.profile-settings')
const profilebtn = document.querySelector('.profile-box')

profilebtn.addEventListener('click', () => {
    profile.classList.toggle('profile-settings-visible')
})


/*Weather*/


// Weather


// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "a9c81a4224e486fa11716f1b7dc754c1";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    // descElement.innerHTML = weather.description;
    // locationElement.innerHTML = `${weather.city}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});


// Modal

const closeBtn = document.querySelector('.closeBtn')
const commentBox = document.querySelector('.comment-box1')
const openBtn = document.getElementById('commentBtn')

closeBtn.addEventListener('click', () => {
    commentBox.style.display = 'none'
    document.body.style.overflow = "scroll"
})

openBtn.addEventListener('click', () => {
    commentBox.style.display = 'block'
    document.body.style.overflow = "hidden"
})

document.getElementById("addComment").addEventListener('click', () => {
    commentBox.style.display = 'none'
    document.body.style.overflow = "scroll"
})








// Comment 







const noteListDiv = document.querySelector(".comment-box");
let noteID = 1;
class Note {
    constructor(id, title, content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }
}

//Add event Listeners

function eventListeners(){
    document.addEventListener("DOMContentLoaded", displayNotes);
    document.getElementById("addComment").addEventListener("click", addNewNote); 

    noteListDiv.addEventListener("click", deleteNote);
    document.getElementById("delete-all-btn").addEventListener("click", deleteAllNotes);
   
  }

//get item from local storage 
function getDataFromStorage() {
    return localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
}

eventListeners();


//add new note to the list

function addNewNote(){
    const noteTitle = document.getElementById("name");
    const noteName = document.getElementById("Sname")
    const noteContent = document.getElementById("commentContent");

    if(ValidateInput(noteTitle, noteContent)){
        let notes = getDataFromStorage();
        let noteItem = new Note(noteID, noteTitle.value, noteContent.value);
        noteID++
        notes.push(noteItem);
        createNote(noteItem);
        //saving to local storage
        localStorage.setItem("notes", JSON.stringify(notes));
        noteTitle.value = "";
        noteContent.value = "";
    }
}


//Input validation 

function ValidateInput(title,content){
    if(title.value !== "" && content.value !== ""){
        return true;
    } else {
        if(title.value === "") {title.classList.add("warning");}
        if(content.value === "") {content.classList.add("warning");}
    }

    setTimeout(() => {
        title.classList.remove("warning");
        content.classList.remove("warning");
    }, 1600)
}



function createNote(noteItem){
    const div = document.createElement("div");
    div.classList.add("note-item");
    div.setAttribute("data-id", noteItem.id);
    div.innerHTML = `
    <div class="post-content">
    
                        <div class="post-detail">
                            <div class="detail-box">
                                <img src="../image/NGC7822_Yizhou_960.jpg" alt="" class="post__img">
                            <div class="post-info">
                                <h1 class="post__name">${noteItem.title}</h1>
                                <h1 class="post__title">Uzbekistan GTL <span>haqida sharh qoldirdi</span></h1>
                            </div>
                            </div>
                            <i class="image__detail">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="block" style="pointer-events: none;"><path d="M12 10C13.104 10 14 10.896 14 12C14 13.104 13.104 14 12 14C10.896 14 10 13.104 10 12C10 10.896 10.896 10 12 10ZM5 10C6.104 10 7 10.896 7 12C7 13.104 6.104 14 5 14C3.896 14 3 13.104 3 12C3 10.896 3.896 10 5 10ZM19 10C20.104 10 21 10.896 21 12C21 13.104 20.104 14 19 14C17.896 14 17 13.104 17 12C17 10.896 17.896 10 19 10Z" fill="#989898"></path></svg>
                            </i>
                        </div>

                        
                        <div class="rating">
                            <img src="../image/rating/003.png" alt="" class="rating__img">
                            <span>•</span>
                            <h4 class="post__date">Bugun 8:59</h4>
                        </div>

                        <p class="post__comment">${noteItem.content}</p>
                        <button class="btn btn__delete" id="addComment">Delete</button>
                    </div>
    `
    noteListDiv.appendChild(div);
}

//display all the notes from our local storage

function displayNotes(){
    let notes = getDataFromStorage();
    if(notes.length > 0) {
        noteID = notes[notes.length - 1].id;
        noteID++;
    } else {
        noteID = 1;
    }

    notes.forEach(item => {
        createNote(item);
    })
}

//delete a note 

function deleteNote(e){
    if(e.target.classList.contains("btn")){
        e.target.parentElement.remove();
        let divID = e.target.parentElement.dataset.id;
        let notes = getDataFromStorage();
        let newNotesList = notes.filter(item => {
            return item.id !== parseInt(divID);
        });
        localStorage.removeItem("notes", JSON.stringify(newNotesList));
    }
}

// delete all notes

function deleteAllNotes(){
    localStorage.removeItem("notes");
    let noteList = document.querySelectorAll(".note-item");
    if(noteList.length > 0) {
        noteList.forEach(item => {
            noteListDiv.removeChild(item);
        });
    }
    noteID = 1;
}


// Firebase 

auth.onAuthStateChanged(user => {
    console.log(user);
    if (user) {
        
    } else{
        window.location.href = "../Login/index.html"
    }
})


const logout = document.getElementById('logout')

logout.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e);
    auth.signOut().then(() => {
        console.log('user signed out');
        window.location.href = "../Login/index.html"
    })
})