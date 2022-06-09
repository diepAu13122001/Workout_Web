document.querySelector('title').textContent = document.querySelector('.header-title').textContent.toUpperCase();

calCompletedProcess();

function calCompletedProcess() {
    document.querySelector('.completed-process').style.width = document.querySelector('.completed-percent').textContent;
}
