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
        console.log(exLengthText)
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
            document.querySelector('.exercise').classList.remove('hide')
            document.querySelector('.rest').classList.add('hide')
            document.querySelector('.rest-name').style.color = "black";
            clearInterval();
        }
    }, 1000)
}

function createExercise() {

}

function createRest() {

}

function pauseThisEx() {

}

function playThisEx() {

}

function skipThisEx() {

}

function skipThisRest() {

}

function moreRestTime() {

}