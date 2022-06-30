let lengthOfList = 20;
const target = localStorage.getItem("target");
const timeOfExs = localStorage.getItem("timeOfExs");
const imgURL = localStorage.getItem("imgURL");
const background = localStorage.getItem("background");

function getNumOfRepeatInAWorkout() {
    var numOfRepeatInAWorkout = 0;
    if (timeOfExs == 10)
        numOfRepeatInAWorkout = 15;
    else if (timeOfExs == 20)
        numOfRepeatInAWorkout = 30;
    else if (timeOfExs == 30)
        numOfRepeatInAWorkout = 45;
    localStorage.removeItem("timeOfExs");
    return numOfRepeatInAWorkout;
}

function createImgCode() {
    let code = '<img src="../' + imgURL + '" alt="">';
    localStorage.removeItem("imgURL");
    return code;
}

function setBackgroundForHeader() {
    document.getElementsByClassName("header")[0].classList.add(background);
    localStorage.removeItem("background");
}

let workoutListById = [];

function addWorkoutInList(id) {
    workoutListById.push(id);
}

function convertListToString(list) {
    let string = "";
    for (let i = 0; i < list.length; i++) {
        string += " " + list[i];
    }
    return string.trim();
}

function getWorkoutListByBodyPart(bodyPart) {
    let started = performance.now();
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://exercisedb.p.rapidapi.com/exercises/bodyPart/" + bodyPart,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
            "X-RapidAPI-Key": "24c7aefa92msh65d245d3e2bf9d2p1359acjsn201d3a869065"
        }
    };
    $.ajax(settings).done(function (response) {
        let workoutList = {};
        if (response.length > lengthOfList) {
            for (let j = 0; j < lengthOfList; j++) {
                workoutList[j] = response[Math.floor(Math.random() * (response.length + 1))];
                document.getElementById("list-workout").innerHTML +=
                    '<div class="workout-card">' +
                    '<div class="workout-content">' +
                    '<div class="workout-name">' +
                    workoutList[j].name +
                    '</div>' +
                    '<div class="num-of-repeat">x' +
                    getNumOfRepeatInAWorkout() +
                    '</div>' +
                    '</div>' +
                    '<div class="workout-gif">' +
                    '<img src="' +
                    workoutList[j].gifUrl +
                    '" alt="workout gif"></div>' +
                    '</div>';
                addWorkoutInList(workoutList[j].id);
            }
        } else {
            for (let i = 0; i < Math.floor(lengthOfList / (response.length)); i++) {
                for (let j = 0; j < response.length; j++) {
                    workoutList[j] = response[Math.floor(Math.random() * (response.length))];
                    document.getElementById("list-workout").innerHTML +=
                        '<div class="workout-card">' +
                        '<div class="workout-content">' +
                        '<div class="workout-name">' +
                        workoutList[j].name +
                        '</div>' +
                        '<div class="num-of-repeat">x' +
                        getNumOfRepeatInAWorkout() +
                        '</div>' +
                        '</div>' +
                        '<div class="workout-gif">' +
                        '<img src="' +
                        workoutList[j].gifUrl +
                        '" alt="workout gif"></div>' +
                        '</div>';
                    addWorkoutInList(workoutList[j].id);
                }
            }
        }
    });
    let ended = performance.now();
    setTimeout(function () {
        localStorage.setItem("idWorkoutList", convertListToString(workoutListById));
    }, (ended - started) * 1000);
}

window.onload = function () {
    document.getElementById("title").innerHTML = target + " workout";
    document.getElementsByClassName("header")[0].innerHTML += createImgCode();
    document.getElementById("num-of-workout").innerHTML = lengthOfList.toString();
    setBackgroundForHeader();
    document.getElementById("total-minute").innerHTML = timeOfExs;
    getWorkoutListByBodyPart(target);
    localStorage.removeItem("target");
    localStorage.setItem("numOfRepeat", getNumOfRepeatInAWorkout());
    localStorage.setItem("numOfWorkout", lengthOfList.toString());
}

function transToWorkoutDetail() {
    window.location = '../HTML/workout-detail.html';
}

