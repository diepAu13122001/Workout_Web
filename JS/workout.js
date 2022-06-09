let number = document.getElementById("number");
let counter = 0;
let target = 65;
setInterval(() => {
    if (counter === target) {
        clearInterval();
    } else {
        counter += 1;
        number.innerHTML = counter + "%";
        createAnim(target);
    }
}, 35);

function createAnim(figure) {
    let value = 472 - 472 * (figure / 100);
    var style = document.createElement('style');
    var keyFrames = '\
            @keyframes anim {\
            100% {\
                stroke-dashoffset: A_DYNAMIC_VALUE;\
            }\
        }';
    style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g, value);
    document.getElementsByTagName('head')[0].appendChild(style);
}

function viewAll() {
    document.getElementById("show-all").classList.add("hide");
    document.getElementById("back").classList.remove("hide");
    document.querySelector('.recent-list .parent-list').classList.add("hide");
    document.getElementsByClassName("show-all-list")[0].classList.remove("hide");
}

function backToSmallList() {
    document.getElementById("show-all").classList.remove("hide");
    document.getElementById("back").classList.add("hide");
    document.querySelector('.recent-list .parent-list').classList.remove("hide");
    document.getElementsByClassName("show-all-list")[0].classList.add("hide");
}

function changeAPartOfMiniMenu(id) {
    document.querySelector(`${id}` + ' a').style.color = "#d06060";
    document.querySelector(`${id}` + ' a').style.borderBottom = "5px solid #d06060";
    document.querySelector(`${id}` + ' a').style.paddingBottom = "30px";
    document.querySelector(`${id}` + ' a i').style.color = "#d06060";
}

function normalPartOfMiniMenu(id) {
    document.querySelector(`${id}` + ' a').style.color = "#434651";
    document.querySelector(`${id}` + ' a').style.borderBottom = "none";
    document.querySelector(`${id}` + ' a').style.paddingBottom = "0";
    document.querySelector(`${id}` + ' a i').style.color = "#434651";
}

function goToWorkoutPart() {
    document.querySelector('.workouts').classList.remove("hide");
    document.querySelector('.report').classList.add("hide");
    document.querySelector('.mine').classList.add("hide");
    changeAPartOfMiniMenu('#workouts');
    normalPartOfMiniMenu('#report');
    normalPartOfMiniMenu('#mine');
}

function goToReportPart() {
    document.querySelector('.workouts').classList.add("hide");
    document.querySelector('.report').classList.remove("hide");
    document.querySelector('.mine').classList.add("hide");
    changeAPartOfMiniMenu('#report');
    normalPartOfMiniMenu('#workouts');
    normalPartOfMiniMenu('#mine');
}

function goToAccountPart() {
    document.querySelector('.workouts').classList.add("hide");
    document.querySelector('.report').classList.add("hide");
    document.querySelector('.mine').classList.remove("hide");
    changeAPartOfMiniMenu('#mine');
    normalPartOfMiniMenu('#workouts');
    normalPartOfMiniMenu('#report');
}

function calWidthOfCompletedProcessTag() {
    changeBMIStatus();
    for (let i = 0; i < document.querySelectorAll('.process').length; i++) {
        let completedChallengeText = document.querySelectorAll('.completed-challenge')[i].textContent;
        let completedPercent = calCompletedProcess(completedChallengeText) + "%";
        document.querySelectorAll('.completed-process')[i].style.width = completedPercent;
    }
}

calWidthOfCompletedProcessTag();

function calCompletedProcess(completedChallengeText) {
    let completed = completedChallengeText.split('/')[0];
    let total = completedChallengeText.split('/')[1];
    return Math.round(completed * 100 / total);
}

function changeBMIStatus() {
    var bmiStatusList = ['severely underweight', 'underweight', 'healthy weight',
        'overweight', 'moderately obese', 'severely obese'];
    let bmi = parseFloat(document.querySelector('.my-bmi p').textContent);
    if (bmi < 15) {
        document.querySelector('#bmi-status').classList.add("light-blue-text");
        document.querySelector('#bmi-status').innerHTML = bmiStatusList[0];
    } else if (bmi < 16) {
        document.querySelector('#bmi-status').classList.add("light-blue-text");
        document.querySelector('#bmi-status').innerHTML = bmiStatusList[0];
        document.querySelector('.my-bmi').style.left = calLeftOfMyBMITag(bmi);
    } else if (bmi < 18.5) {
        document.querySelector('#bmi-status').classList.add("dark-blue-text");
        document.querySelector('#bmi-status').innerHTML = bmiStatusList[1];
        document.querySelector('.my-bmi').style.left = calLeftOfMyBMITag(bmi);
    } else if (bmi < 25) {
        document.querySelector('#bmi-status').classList.add("green-text");
        document.querySelector('#bmi-status').innerHTML = bmiStatusList[2];
        document.querySelector('.my-bmi').style.left = calLeftOfMyBMITag(bmi);
    } else if (bmi < 30) {
        document.querySelector('#bmi-status').classList.add("yellow-green-text");
        document.querySelector('#bmi-status').innerHTML = bmiStatusList[3];
        document.querySelector('.my-bmi').style.left = calLeftOfMyBMITag(bmi);
    } else if (bmi < 35) {
        document.querySelector('#bmi-status').classList.add("orange-text");
        document.querySelector('#bmi-status').innerHTML = bmiStatusList[4];
        document.querySelector('.my-bmi').style.left = calLeftOfMyBMITag(bmi);
    } else if (bmi < 40) {
        document.querySelector('#bmi-status').classList.add("red-text");
        document.querySelector('#bmi-status').innerHTML = bmiStatusList[5];
        document.querySelector('.my-bmi').style.left = calLeftOfMyBMITag(bmi);
    } else if (bmi > 40) {
        document.querySelector('#bmi-status').classList.add("red-text");
        document.querySelector('#bmi-status').innerHTML = bmiStatusList[5];
        document.querySelector('.my-bmi').style.left = "96.5%";
    }
}

function calLeftOfMyBMITag(bmi) {
    let firstDistanceWidth = 12.5;
    let distanceWidth = 97 - firstDistanceWidth;
    let distanceBMI = 40 - 15;
    let result = firstDistanceWidth + ((bmi - 15) * distanceWidth / distanceBMI);
    return result + "%";
}

function chooseBodyPartTarget() {
    document.querySelector('.body-part-list').classList.remove('hide');
    document.querySelector('.body-part-targets .chosen-list').classList.add('hide');
    document.querySelector('#save-chosen-body-part-tags').classList.remove('hide');
    document.querySelector('#edit-body-part-tags').classList.add('hide');
}

function getChosenTags() {
    let chosenTags = [];
    for (let i = 0; i < document.querySelectorAll('.body-part-targets .target-card').length; i++) {
        for (let j = 0; j < document.querySelectorAll('.body-part-targets .target-card')[i].classList.length; j++) {
            if (document.querySelectorAll('.body-part-targets .target-card')[i].classList[j] === "chosen") {
                chosenTags.push(document.querySelectorAll('.body-part-targets .target-card')[i].textContent);
            }
        }
    }
    return chosenTags;
}

function createTargetTag(textContent) {
    $('.body-part-targets .chosen-list').append($(' <li class="target-card">' + textContent + '</li>'));
}

function saveChosenBodyPartTargets() {
    let chosenListItems = document.querySelectorAll('.chosen-list li');
    const chosenList = document.querySelector('.body-part-targets .chosen-list');
    for (let i = 0; i < chosenListItems.length; i++) {
        chosenList.removeChild(chosenListItems[i]);
    }

    for (let i = 0; i < getChosenTags().length; i++) {
        createTargetTag(getChosenTags()[i]);
    }

    document.querySelector('.body-part-list').classList.add('hide');
    document.querySelector('.body-part-targets .chosen-list').classList.remove('hide');
    document.querySelector('#save-chosen-body-part-tags').classList.add('hide');
    document.querySelector('#edit-body-part-tags').classList.remove('hide');
}

function chooseThisTag(idOfTag) {
    const thisTag = document.querySelector(idOfTag);
    let isChosenTag = false;
    for (let i = 0; i < thisTag.classList.length; i++) {
        if (thisTag.classList[i] === "chosen") {
            isChosenTag = true;
        }
    }
    if (isChosenTag) {
        thisTag.classList.remove('chosen')
        thisTag.classList.remove('pink-pastel-background')
        thisTag.classList.add('none-background')
    } else {
        thisTag.classList.add('chosen')
        thisTag.classList.remove('none-background')
        thisTag.classList.add('pink-pastel-background')
    }
}

function editTimeForWorkout() {
    document.querySelector('.actual-time-setting').classList.add('hide');
    document.querySelector('.edit-time').classList.remove('hide');
    document.querySelector('#save-time-for-workout').classList.remove('hide');
    document.querySelector('#edit-time-for-workout').classList.add('hide');
}

function getTimeDataForWorkout() {
    let dataList = [];
    dataList.push(document.getElementById("choose-minute").value);
    dataList.push(document.getElementById("choose-num-of-day").value);
    return dataList;
}

function saveTimeForWorkout() {
    document.querySelector('.actual-time-setting .daily-workout-time .num div').innerHTML = getTimeDataForWorkout()[0];
    document.querySelector('#weekly-goal-data').textContent = "2/" + getTimeDataForWorkout()[1];
    document.querySelector('.actual-time-setting .weekly-workout-time .num div').innerHTML = getTimeDataForWorkout()[1];

    document.querySelector('.actual-time-setting').classList.remove('hide');
    document.querySelector('.edit-time').classList.add('hide');
    document.querySelector('#save-time-for-workout').classList.add('hide');
    document.querySelector('#edit-time-for-workout').classList.remove('hide');
}

function editPTagOfDreamWeightData() {
    let content = document.querySelector('.dream-weight-data p');
    let subContent = content.lastChild;
    let newWeight = document.querySelector('.dream-weight-data-edit input').value;
    document.querySelector('.dream-weight-data p').innerHTML = newWeight + "kg";
    document.querySelector('.dream-weight-data p').append(subContent);
}

function saveDreamWeightData() {
    editPTagOfDreamWeightData();
    document.querySelector('.dream-weight-data').classList.remove('hide');
    document.querySelector('.dream-weight-data-edit').classList.add('hide');
}

function editDreamWeightData() {
    let content = document.querySelector('.dream-weight-data p').textContent;
    document.querySelector('.dream-weight-data-edit input').value = content.split('kg')[0];

    document.querySelector('.dream-weight-data').classList.add('hide');
    document.querySelector('.dream-weight-data-edit').classList.remove('hide');
}
