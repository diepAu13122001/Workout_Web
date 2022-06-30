localStorage.setItem("weight", document.getElementById("weight").innerHTML.split("kg")[0]);
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
    setTimeout(getBodyPartList, 100);
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
    addWorkoutList();
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

function getBodyPartList() {
    var startTime = performance.now()
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
            let id = bodyParts[i].partId.replace(' ', '-');
            if (bodyParts[i].chosen === 1) {
                document.getElementById("chosenList").innerHTML += `<li class="target-card chosen pink-pastel-background"
                                            onclick="chooseThisTag('#${id}')"
                                            id="${id}">` + bodyParts[i].part + `</li>`;
                document.getElementById("my-workout-list").innerHTML += ` <li class="target-card">` + bodyParts[i].part + `</li>`;
            } else if (bodyParts[i].chosen === 0) {
                document.getElementById("chosenList").innerHTML += `<li class="target-card"
                                            onclick="chooseThisTag('#${id}')"
                                            id="${id}">` + bodyParts[i].part + `</li>`;
            }
        }
    });
    var endTime = performance.now()

    setTimeout(addWorkoutList, (endTime - startTime) * 1000);
}

function openWorkoutList(target, timeOfExs, img, background) {
    window.open('HTML/list-workout.html');
    localStorage.setItem("target", target);
    localStorage.setItem("timeOfExs", timeOfExs);
    localStorage.setItem("imgURL", img);
    localStorage.setItem("background", background);
}

function openVideoList(target, numOfVideo, img, background) {
    window.open('HTML/list-video.html');
    localStorage.setItem("videoKey", target);
    localStorage.setItem("numOfVideo", numOfVideo);
    localStorage.setItem("poster", img);
    localStorage.setItem("videoBackground", background);
}

function openChallengeDetail(target, numOfCompletedDay, img, background) {
    window.open('HTML/challenge-detail.html');
    localStorage.setItem("target", target);
    localStorage.setItem("imgURL", img);
    localStorage.setItem("numOfCompletedDay", numOfCompletedDay);
    localStorage.setItem("background", background);
}

function getRandomBackground() {
    const backgroundList = ["pink-pastel-background", "blue-pastel-background", "purple-pastel-background", "orange-pastel-background", "yellow-pastel-background", "green-pastel-background"];
    return backgroundList[Math.floor(Math.random() * (backgroundList.length - 1))];
}

function isNewCode() {
    return '<div class="new">' +
        '<p>&#10024;</p>' +
        '<p>new</p>' +
        '</div>';
}

function createWorkoutCard(isNew, topic, level, timeOfExs, img) {
    topic = topic.trim();
    let background = getRandomBackground();
    let code = '<div class="workout-card ' + background + ' " onclick="openWorkoutList(\'' + topic + '\',\'' + timeOfExs + '\',\'' + img + '\',\'' + background + '\')">';
    code += '<img src=' + img + ' class="poster" alt="">';
    code += '<div class="content">';
    if (isNew) {
        code += isNewCode();
    }
    code += '<div class="name">' + topic + '</br>' + level + '</div>';
    code += '<div class="time-of-exercise">' + timeOfExs + ' minutes</div>';
    code += '</div>';
    code += '</div>';
    return code;
}

function createVideoCard(isNew, topic, numOfVideo, img) {
    topic = topic.trim();
    let background = getRandomBackground();
    let code = '<div class="workout-card ' + background + ' " onclick="openVideoList(\'' + topic + '\',\'' + numOfVideo + '\',\'' + img + '\',\'' + background + '\')">';
    code += '<img src=' + img + ' class="poster" alt="">';
    code += '<div class="content">';
    if (isNew) {
        code += isNewCode();
    }
    code += '<div class="name"> following </br> video</div>';
    code += '</div>';
    code += '</div>';
    return code;
}

function createSmallChallengeCard(isNew, topic, numOfCompletedDay, img) {
    topic = topic.trim();
    let code = '<div class="workout-card ' + getRandomBackground() + ' " onclick="openChallengeDetail(\'' + topic + '\',\'' + numOfCompletedDay + '\',\'' + img + '\')">';
    code += '<img src=' + img + ' class="poster" alt="">';
    code += '<div class="content">';
    if (isNew) {
        code += isNewCode();
    }
    code += '<div class="name">' + topic + '</br>workout</div>';
    code += '<div class="time-of-exercise"> day' + numOfCompletedDay + '</div>';
    code += '</div>';
    code += '</div>';
    return code;
}

function createATopicWorkoutList(topic, img, numOfType) {
    const beginner = {name: "beginner", numOfRepeat: 15, minute: 10, numOfWorkout: 20};
    const intermediate = {name: "intermediate", numOfRepeat: 30, minute: 20, numOfWorkout: 20};
    const advanced = {name: "advanced", numOfRepeat: 45, minute: 30, numOfWorkout: 20};
    const video = {name: "following video", numOfRepeat: 1, minute: 10, numOfWorkout: 10};
    const challenge = {name: "7x4 challenge", week: 4, dayOfWeek: 7, numOfWorkout: 0};
    let workoutTypeList = [challenge, video, beginner, intermediate, advanced];

    let code = '<div class="workout-list">';
    code += '<div class="topic-title">';
    code += ' <h1>' + topic + ' workout </h1>';
    code += '</div>';
    code += '<div class="parent-list">';
    code += '<div class="list">';
    for (let i = 0; i < numOfType; i++) {
        if (i === 0) {
            code += createSmallChallengeCard(true, topic, 3, img);
        } else if (i === 1) {
            code += createVideoCard(true, topic, 10, img);
        } else {
            code += createWorkoutCard(false, topic, workoutTypeList[i].name, workoutTypeList[i].minute, img);
        }
    }
    code += '</div></div></div>';
    return code;
}

function createChallengeCard(topic, numOfCompletedDay, img) {
    let code = '<div class="challenge-card ' + getRandomBackground() + '">';
    code += '<img src=' + img + ' class="poster" alt="">';
    code += '<div class="content">';
    code += '<div class="num-of-challenge">7x4 challenge</div>';
    code += '<div class="name">' + topic + '</br>workout</div>';
    code += '<button class="challenge-btn" onclick="openChallengeDetail(\'' + topic + '\',\'' + numOfCompletedDay + '\',\'' + img + '\')">start\n</button>';
    code += '</div>';
    if (numOfCompletedDay > 0) {
        code += '<div class="process">' +
            '<div class="completed-challenge">' + numOfCompletedDay + '/28</div>' +
            '<div class="process-bar">' +
            '<div class="completed-process"></div>' +
            '</div></div>';
    }
    code += '</div>';
    return code;
}

function createWorkoutList() {
    const backImg = "img/back.png";
    const cardioImg = "img/cardio.png";
    const chestImg = "img/chest.png";
    const lowerArmsImg = "img/lowerArms.png";
    const lowerLegsImg = "img/legs.png";
    const neckImg = "img/neck.png";
    const shouldersImg = "img/shoulders.png";
    const upperArmsImg = "img/arm.png";
    const upperLegsImg = "img/thigh.png";
    const waistImg = "img/waist.png";
    const fullBodyImg = "img/fullBody.png";
    const buttImg = "img/butt.png";
    const yogaImg = "img/yoga.png";
    const faceImg = "img/face.png";
    const meditationImg = "img/meditation.png";
    const quickExsImg = "img/quickExs.png";

    const targetList = [{name: "full body", img: fullBodyImg},
        {name: "quick exercises", img: quickExsImg},
        {name: "face", img: faceImg},
        {name: "yoga", img: yogaImg},
        {name: "meditation", img: meditationImg}];

    const bodyPart = [{name: "back", img: backImg},
        {name: "cardio", img: cardioImg},
        {name: "chest", img: chestImg},
        {name: "lower arms", img: lowerArmsImg},
        {name: "lower legs", img: lowerLegsImg},
        {name: "neck", img: neckImg},
        {name: "shoulders", img: shouldersImg},
        {name: "upper arms", img: upperArmsImg},
        {name: "upper legs", img: upperLegsImg},
        {name: "waist", img: waistImg}];
    let code = '';
    let challengeCode = ' <div class="challenge-list">' + '<div class="topic-title">' + '<h1>challenge</h1>' + '</div>' + '<div class="parent-list">' + '<div class="list">';
    for (let i = 0; i < document.getElementsByClassName('chosen-list')[0].getElementsByClassName('target-card').length; i++) {
        let topic = document.getElementsByClassName('chosen-list')[0].getElementsByClassName('target-card')[i].innerHTML.trim();
        topic = topic.replace(/\s+/g, ' ');
        for (let j = 0; j < targetList.length; j++) {
            if (topic === (targetList[j].name)) {
                code += createATopicWorkoutList(topic, targetList[j].img, 2);
                challengeCode += createChallengeCard(topic, 3, targetList[j].img);
            }
        }
        for (let j = 0; j < bodyPart.length; j++) {
            if (topic === (bodyPart[j].name)) {
                code += createATopicWorkoutList(topic, bodyPart[j].img, 5);
                challengeCode += createChallengeCard(topic, 3, bodyPart[j].img);
            }
        }
    }
    challengeCode += '</div></div></div>';
    return challengeCode + code;
}

function addWorkoutList() {
    document.getElementsByClassName('workouts')[0].innerHTML = createWorkoutList();
}


