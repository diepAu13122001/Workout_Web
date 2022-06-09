// đổi tất cả thời gian về dạng ms

const videoListType = "videos";
const workoutListType = "workouts";
const challengeListType = "challenge";

const videoRest = 10000;
const workoutRest = 5000;

function convertRepeatToSecond(repeat) {
    return repeat * 2000;
}

let listInfo = {
    name: "",
    type: videoListType,
    totalWorkout: 0,
    totalMinute: 0,
    totalCalories: 0,
    list:  [],
    backgroundPic: ""
};

let rest = {
    name: "take a rest",
    length: videoRest,
    nextWorkout: {id: "", name: "", length: "", gif: ""}
};

let workoutInfo = {
    name: "",
    id: "",
    length: 0,
    repeat: 0,
    gif: "",
    calories: ""
};

let challengeInfo = {
    name: "",
    id: "",
    numOfDay: 0,
    numOfWeek: 0,
    calories: "",
    totalWorkout: 0,
    totalMinute: 0,
    totalCalories: 0,
    DailyChallengeList: [listInfo],
    backgroundPic: ""
};

let videoInfo = {
    id: "",
    backgroundPic: "",
    name: "",
    length: 0,
    calories: 0,
    thumbnail: ""
};

let list1 = {}