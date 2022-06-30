let lengthOfList = 10;
const videoKey = localStorage.getItem("videoKey");
const numOfVid = localStorage.getItem("numOfVideo");
const poster = localStorage.getItem("poster");
const videoBackground = localStorage.getItem("videoBackground");

function getDurationById(id) {
    var durationString = "";
    var youtubeUrl = "https://www.googleapis.com/youtube/v3/videos?id=" + id
        + "&key=AIzaSyDR7ik9IZsLSkp9kOPOVinz9aa2y7ctD48&part=snippet,contentDetails";
    $.ajax({
        async: false,
        type: 'GET',
        url: youtubeUrl,
        success: function (data) {
            var youtube_time = data.items[0].contentDetails.duration;
            var duration = convertYTTime(youtube_time);
            durationString = duration;
        }
    });
    return durationString;
}

function convertYTTime(durationString) {
    const duration = {hours: 0, minutes: 0, seconds: 0};
    const durationParts = durationString
        .replace("PT", "")
        .replace("H", ":")
        .replace("M", ":")
        .replace("S", "")
        .split(":");
    if (durationParts.length === 3) {
        duration["minutes"] = parseInt(durationParts[1]) + parseInt(durationParts[0]) * 60;
        duration["seconds"] = durationParts[2];
    }
    if (durationParts.length === 2) {
        duration["minutes"] = durationParts[0];
        duration["seconds"] = durationParts[1];
    }
    if (durationParts.length === 1) {
        duration["seconds"] = durationParts[0];
    }
    if (duration["minutes"] < 10) {
        if (duration["minutes"] == 0) {
            duration["minutes"] = "00";
        } else {
            duration["minutes"] = "0" + duration["minutes"];
        }
    }
    if (duration["seconds"] < 10) {
        if (duration["seconds"] == 0) {
            duration["seconds"] = "00";
        } else {
            duration["seconds"] = "0" + duration["seconds"];
        }
    }
    return `${duration.minutes}:${duration.seconds}`;
}

function createImgCode() {
    let code = '<img src="../' + poster + '" alt="">';
    localStorage.removeItem("poster");
    return code;
}

function setBackgroundForHeader() {
    document.querySelector(".header").classList.add(videoBackground);
    localStorage.removeItem("videoBackground");
}

gapi.load("client", loadClient);

function loadClient() {
    gapi.client.setApiKey("AIzaSyDR7ik9IZsLSkp9kOPOVinz9aa2y7ctD48");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function () {
                console.log("GAPI client loaded for API");
            },
            function (err) {
                console.error("Error loading GAPI client for API", err);
            });
}

function getVideoListByKey() {
    const key = videoKey + " workout";
    const maxResult = numOfVid;

    var arr_search = {
        "part": 'snippet',
        "type": 'video',
        "maxResults": maxResult,
        "q": key
    };

    return gapi.client.youtube.search.list(arr_search)
        .then(function (response) {
                const listItems = response.result.items;
                if (listItems) {
                    let output = '';
                    listItems.forEach(item => {
                        const id = item.id.videoId;
                        console.log(id)
                        const videoTitle = item.snippet.title;
                        output += ' <div class="video-card">' +
                            '<div class="video-content" onclick="transToWorkoutDetail()">' +
                            '<div class="video-name">' +
                            videoTitle +
                            '</div>' +
                            '<div class="video-length">' + getDurationById(id) + '</div>' +
                            '</div>' +
                            '<div class="video-thumbnail">' +
                            '<iframe src="https://www.youtube.com/embed/' + id +
                            '?controls=0" title="YouTube video player"' +
                            'frameborder="0"></iframe>' +
                            '</div>' +
                            '</div>';
                    });
                    // Output list
                    document.querySelector('.video-list').innerHTML += output;
                }
            },
            function (err) {
                console.error("Execute error", err);
            });
}

window.onload = function () {
    document.querySelector(".header-title").innerHTML = videoKey + " workout";
    document.querySelector(".header").innerHTML += createImgCode();
    document.getElementById("total-video").innerHTML = lengthOfList.toString();
    setBackgroundForHeader();
    localStorage.removeItem("target");
    setTimeout(getVideoListByKey, 1000);
}

function transToWorkoutDetail() {
    window.location = '../HTML/workout-detail.html';
}

