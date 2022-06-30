// startToWorkout();

function startToWorkout() {
    let count = 3;
    countDownToStart(count, false);
    setTimeout(changeToWorkoutPart, (count + 1) * 1000);
}

function countDownToStart(count, isStart) {
    setInterval(() => {
        if (count > -1) {
            document.querySelector('.countdown-to-start p').textContent = count + "";
            count--;
        } else if (count === -1) {
            if (isStart) {
                document.querySelector('.countdown-to-start p').textContent = "START";
                count--;
            } else {
                document.querySelector('.countdown-to-start').classList.add('hide');
                clearInterval();
            }
        } else if (count === -2) {
            document.querySelector('.countdown-to-start').classList.add('hide');
            clearInterval();
        }
    }, 1000);
}

function convertWorkoutLengthToSec(isExercise) {
    let exLengthText = "";
    if (isExercise) {
        exLengthText = document.querySelector('.exercise-length').textContent;
    } else if (!isExercise) {
        exLengthText = document.querySelector('.rest-length').textContent;
    }
    let time = {minute: parseInt(exLengthText.split(":")[0]), second: parseInt(exLengthText.split(":")[1])};
    return time.second + time.minute * 60;
}

function calWidthOfCompletedProcess(length, isExercise) {
    return 100 / length * (length - convertWorkoutLengthToSec(isExercise));
}

function formatExLengthText(countdownSecond) {
    let text = "";
    if (countdownSecond / 60 > 0) {
        text += add0ForTime(Math.floor(countdownSecond / 60));
        countdownSecond -= Math.floor(countdownSecond / 60) * 60;
        text += ":" + add0ForTime(countdownSecond);
    } else {
        text += "00:" + add0ForTime(countdownSecond);
    }
    return text;
}

function add0ForTime(time) {
    if (time < 10) {
        return "0" + time;
    } else {
        return time;
    }
}

function changeToWorkoutPart() {
    let workoutLength = convertWorkoutLengthToSec(true);
    let countdownWorkoutLength = convertWorkoutLengthToSec(true);
    setInterval(() => {
        if (countdownWorkoutLength > 5) {
            document.querySelector('.exercise-length').textContent = formatExLengthText(countdownWorkoutLength);
            document.querySelector('.ex-completed-process').style.width = calWidthOfCompletedProcess(workoutLength, true) + "%";
            countdownWorkoutLength--;
        } else if (countdownWorkoutLength > -1 && countdownWorkoutLength < 6) {
            document.querySelector('.exercise-length').textContent = formatExLengthText(countdownWorkoutLength);
            document.querySelector('.exercise-name').style.color = " #67a3d7";
            document.querySelector('.exercise-name').textContent = "nxt: take a rest";
            document.querySelector('.ex-completed-process').style.width = calWidthOfCompletedProcess(workoutLength, true) + "%";
            countdownWorkoutLength--;
        } else if (countdownWorkoutLength === -1) {
            document.querySelector('.exercise').classList.add('hide')
            document.querySelector('.rest').classList.remove('hide')
            document.querySelector('.exercise-name').style.color = "black";
            clearInterval();
        }
    }, 1000)
    setTimeout(changeToRestPart, (workoutLength + 1) * 1000);
}

function changeToRestPart() {
    let restLength = convertWorkoutLengthToSec(false);
    let countdownRestLength = convertWorkoutLengthToSec(false);
    setInterval(() => {
        if (countdownRestLength > 5) {
            document.querySelector('.rest-length').textContent = formatExLengthText(countdownRestLength);
            document.querySelector('.rest-completed-process').style.width = calWidthOfCompletedProcess(restLength, false) + "%";
            countdownRestLength--;
        } else if (countdownRestLength > -1 && countdownRestLength < 6) {
            document.querySelector('.rest-length').textContent = formatExLengthText(countdownRestLength);
            document.querySelector('.rest-name').style.color = " #67a3d7";
            document.querySelector('.rest-name').textContent = "nxt: " + document.querySelector('.nxt-ex-info .name').textContent;
            document.querySelector('.rest-completed-process').style.width = calWidthOfCompletedProcess(restLength, false) + "%";
            countdownRestLength--;
        } else if (countdownRestLength === -1) {
            document.querySelector('.rest').classList.add('hide')
            document.querySelector('.rest-name').style.color = "black";
            clearInterval();
        }
    }, 1000)
    setTimeout(changeToFinishPart, (restLength + 1) * 1000);
}

function changeToFinishPart() {
    clearInterval();
    document.querySelector('.finished-workout').classList.remove('hide');
}

const restTime = 10; //seconds
const weight = localStorage.getItem("weight");

function createExercise(exercise) {
    return '<div class="exercise">' +
        '<div class="exercise-content">' +
        '<div class="exercise-name">' + exercise.name + '</div>' +
        '<div class="exercise-length">' + formatExLengthText(numOfRepeat * 2) + '</div>' +
        '</div>' +
        '<div class="exercise-gif">' +
        '<img src="' + exercise.gifUrl + '" alt="' + exercise.name + '">' +
        '</div>' +
        '<div class="exercise-process">' +
        '<div class="ex-process-buttons">' +
        '<div class="pause-this-ex" onclick="pauseThisEx()">' +
        '<i class="fa-solid fa-pause"></i>' +
        '</div>' +
        '<div class="play-this-ex hide" onclick="playThisEx()">' +
        '<i class="fa-solid fa-play"></i>' +
        '</div>' +
        '<div class="skip-this-ex" onclick="skipThisEx()">' +
        '<i class="fa-solid fa-angle-right"></i>' +
        '</div>' +
        '</div>' +
        '<div class="ex-process-bar">' +
        '<div class="ex-completed-process"></div>' +
        '</div>' +
        '</div>' +
        '</div>';
}

function createRest(nextExercise) {
    return '<div class="rest">' +
        '<div class="rest-content">' +
        '<div class="rest-name">take a rest</div>' +
        '<div class="rest-length">' + formatExLengthText(restTime) + '</div>' +
        '</div>' +
        '<div class="nxt-exercise">' +
        '<img src="' + nextExercise.gifUrl + '" alt="' + nextExercise.name + '">' +
        '<div class="nxt-ex-info">' +
        '<p class="name">' + nextExercise.name + '</p>' +
        '<p class="length">x ' + numOfRepeat + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="rest-process">' +
        '<div class="rest-process-buttons">' +
        '<div class="skip-this-rest" onclick="skipThisRest()">' +
        '<i class="fa-solid fa-angle-right"></i>' +
        '</div>' +
        '</div>' +
        '<div class="rest-process-bar">' +
        '<div class="rest-completed-process"></div>' +
        '</div>' +
        '</div>' +
        '</div>';
}

//'http://d205bpvrqc9yn1.cloudfront.net/3541.gif'

function createFinish() {
    return '<div class="finished-workout">' +
        '<div class="content">' +
        '<div class="title">you rock!</div>' +
        '<div class="detail">' +
        '<div class="completed-exercises">' +
        '<p class="data">' + realWorkout + '</p>' +
        '<p>exercises</p>' +
        '</div>' +
        '<div class="burned-calories">' +
        '<p class="data">' + calBurnedCalories() + '</p>' +
        '<p>calories</p>' +
        '</div>' +
        '<div class="spent-minutes">' +
        '<p class="data">' + realTime + '</p>' +
        '<p>minutes</p>' +
        '</div>' +
        '</div>' +
        '<div class="buttons">' +
        '<button class="do-it-again" onclick="location.reload()">do it again</button>' +
        '<button class="back-to-workout-page" onclick="backWorkoutPage()">exit</button>' +
        '</div>' +
        '</div>' +
        '</div>';
}

function pauseThisEx() {

}

function playThisEx() {

}

function skipThisEx() {

}

function skipThisRest() {

}

function calBurnedCalories() {
    return Math.round(realTime * (7 * 3.5 * weight) / 200);
}

function backWorkoutPage() {
    localStorage.removeItem("numOfWorkout");
    localStorage.removeItem("numOfRepeat");
    localStorage.removeItem("idWorkoutList");
    window.location = '../index.html';
}

function getWKById(id) {
    var startTime = performance.now()
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://exercisedb.p.rapidapi.com/exercises/exercise/" + id,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
            "X-RapidAPI-Key": "cd6aaee6a8msh9081bad290c8c40p1faf69jsn64cf5ee18e80"
        }
    };
    $.ajax(settings).done(function (response) {
        workoutList.push(response);
    });
    var endTime = performance.now()
}

const workoutList = [];
const numOfRepeat = parseInt(localStorage.getItem("numOfRepeat"));
const numOfWorkout = parseInt(localStorage.getItem("numOfWorkout"));
const idList = localStorage.getItem("idWorkoutList").split(" ");
const totalWorkoutTime = numOfRepeat * 2 * numOfWorkout;
const realTime = totalWorkoutTime;
const realWorkout = numOfWorkout;

function getWorkoutList() {
    for (let i = 0; i < numOfWorkout; i++) {
        getWKById(idList[i]);
    }
}

window.onload = function () {
    // getWorkoutList();
    setTimeout(startToWorkout, 100);
}

