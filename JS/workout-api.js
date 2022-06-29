const numOfRepeatInAWorkout = 30;
const workoutTime = 15;

// 1 repeat time = 2 seconds

function getBodyPartList() {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        "method": "GET",
        "headers": {
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
            "X-RapidAPI-Key": "24c7aefa92msh65d245d3e2bf9d2p1359acjsn201d3a869065"
        }
    };
    $.ajax(settings).done(function (response) {
        let bodyParts = [];
        for (let i in response) {
            bodyParts.push({part: response[i], partId: response[i], chosen: Math.floor(Math.random() * 2)});
            if (bodyParts[i].chosen === 1) {
                document.getElementById("chosenList").innerHTML += `<li class="target-card chosen pink-pastel-background"
                                            onclick="chooseThisTag('#${bodyParts[i].partId}')"
                                            id="${bodyParts[i].partId}">` + bodyParts[i].part + `</li>`;
                document.getElementById("my-workout-list").innerHTML += ` <li class="target-card">` + bodyParts[i].part + `</li>`;
            } else if (bodyParts[i].chosen === 0) {
                document.getElementById("chosenList").innerHTML += `<li class="target-card"
                                            onclick="chooseThisTag('#${bodyParts[i].partId}')"
                                            id="${bodyParts[i].partId}">` + bodyParts[i].part + `</li>`;
            }
        }
    });
}
//getBodyPartList();

// for only 1 list of one part
function getWorkoutListByBodyPart(name) {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://exercisedb.p.rapidapi.com/exercises/bodyPart/" + name,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
            "X-RapidAPI-Key": "24c7aefa92msh65d245d3e2bf9d2p1359acjsn201d3a869065"
        }
    };
    $.ajax(settings).done(function (response) {
        let workoutList = {};
        for (let j = 0; j < workoutTime; j++) {
            workoutList[j] = response[Math.floor(Math.random() * (response.length + 1))];
            document.getElementById("list-workout").innerHTML += `
                <div class="workout-card">
                    <div class="workout-content">
                        <div class="workout-name">` + workoutList[j].name + `</div>
                        <div class="num-of-repeat">x ` + numOfRepeatInAWorkout + `</div>
                    </div>
                    <div class="workout-gif">
                        <img src="` + workoutList[j].gifUrl + `" alt="workout gif">
                    </div>
               </div>`;
        }
    });
}

function getYTVideoList(topic) {

}

const workoutCardType = ["beginner", "intermediate", "advanced", "following video", "challenge"];
const targetList = ["full body", "quick exercises", "face", "yoga", "stretch", "meditation", "back", "cardio", "chest", "lower arms", "lower legs", "neck", "shoulders", "upper arms", "upper legs", "waist"];
// 15 - 10', 30 - 20', 45 - 30' with 20 workouts in a list
// const beginner = {name: "beginner", numOfRepeat: 15, minute: 10, numOfWorkout: 20, backgroundColor: "pink", urlPic: ""};
// const intermediate = {name: "intermediate", numOfRepeat:30, minute: 20, numOfWorkout: 20, backgroundColor: "orange", urlPic: ""};
// const advanced = {name: "advanced", numOfRepeat: 45, minute: 30, numOfWorkout: 20, backgroundColor: "purple", urlPic: ""};
// const video = {name: "following video", numOfRepeat: 1, minute: 0, numOfWorkout: 0, backgroundColor: "yellow", urlPic: ""};
// const challenge = {name: "7x4 challenge", week: 4, dayOfWeek: 7, numOfWorkout: 0, backgroundColor: "blue", urlPic: ""};



