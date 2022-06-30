// const numOfRepeatInAWorkout = 30;
// const workoutTime = 15;

// 1 repeat time = 2 seconds

// for only 1 list of one part
// function getWorkoutListByBodyPart(name) {
//     const settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": "https://exercisedb.p.rapidapi.com/exercises/bodyPart/" + name,
//         "method": "GET",
//         "headers": {
//             "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
//             "X-RapidAPI-Key": "24c7aefa92msh65d245d3e2bf9d2p1359acjsn201d3a869065"
//         }
//     };
//     $.ajax(settings).done(function (response) {
//         let workoutList = {};
//         for (let j = 0; j < workoutTime; j++) {
//             workoutList[j] = response[Math.floor(Math.random() * (response.length + 1))];
//             document.getElementById("list-workout").innerHTML += `
//                 <div class="workout-card">
//                     <div class="workout-content">
//                         <div class="workout-name">` + workoutList[j].name + `</div>
//                         <div class="num-of-repeat">x ` + numOfRepeatInAWorkout + `</div>
//                     </div>
//                     <div class="workout-gif">
//                         <img src="` + workoutList[j].gifUrl + `" alt="workout gif">
//                     </div>
//                </div>`;
//         }
//     });
// }

function getYTVideoList(topic) {

}

// 15 - 10', 30 - 20', 45 - 30' with 20 workouts in a list




