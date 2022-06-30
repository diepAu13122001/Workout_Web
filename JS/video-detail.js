window.onload = function () {
    document.getElementsByClassName("header-title").innerHTML = localStorage.getItem("target")
    localStorage.removeItem("target");
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

function paginate(e, obj) {
    e.preventDefault();
    pageToken = obj.getAttribute('data-id');
    execute();
}

// Make sure the client is loaded before calling this method.
function execute(title, numOfVideo, orderInput) {
    const searchString = title;
    const maxResult = numOfVideo;

    var arr_search = {
        "part": 'snippet',
        "type": 'video',
        "maxResults": maxResult,
        "q": searchString
    };

    if (pageToken !== '') {
        arr_search.pageToken = pageToken;
    }

    return gapi.client.youtube.search.list(arr_search)
        .then(function (response) {
                const listItems = response.result.items;
                if (listItems) {
                    let output = '';

                    listItems.forEach(item => {
                        const videoId = item.id.videoId;
                        console.log(videoId)
                        const videoTitle = item.snippet.title;
                        // const durationTime = item.contentDetails.duration;

                        output += `<li>
                                <div className="video">
                                    // <iframe width="560" height="315"
                                    //         src="https://www.youtube.com/embed/${videoId}?controls=0"
                                    //         title="YouTube video player" frameBorder="0"
                                    //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    //         allowFullScreen></iframe>
                                     <a data-fancybox href="https://www.youtube.com/watch?v=${videoId}">
                                <img style="width: 500px; height: 300px;" src="http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg" />
                            </a>
                            <p>${videoTitle}</p>
                                </div>
                            </li>`;
                    });
                    output += '</ul>';

                    if (response.result.prevPageToken) {
                        output += `<br><a class="paginate" href="#" data-id="${response.result.prevPageToken}" onclick="paginate(event, this)">Prev</a>`;
                    }

                    if (response.result.nextPageToken) {
                        output += `<a href="#" class="paginate" data-id="${response.result.nextPageToken}" onclick="paginate(event, this)">Next</a>`;
                    }

                    // Output list
                    videoList.innerHTML = output;
                    console.log(document.querySelector('.ytp-time-duration').textContent);
                }
            },
            function (err) {
                console.error("Execute error", err);
            });
}

function getVideoByTitle(title) {

}

document.addEventListener('submit', e => {
    e.preventDefault();
    // execute();
});

function createVideoDetailCard() {
    let code = ' <div class="video-card">' +
        '<div class="video-content">' +
        '<div class="video-name">' +
        '</div>' +
        '<div class="video-length">10:30</div>' +
        '</div>' +
        '<div class="video-thumbnail">' +
         execute() +
        '</div>' +
        '</div>';

    return code;
}

//document.getElementsByClassName('ytp-time-duration')[0].innerHTML

function addVideoDetailList() {
    document.getElementsByClassName('video-list').innerHTML += createVideoDetailCard();
}

