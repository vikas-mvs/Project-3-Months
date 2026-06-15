const queryString = window.location.search;
const currentURL = window.location.href;
const urlParams = new URLSearchParams(queryString);

let frame = document.getElementById('frame');
let linktext = document.getElementById('linktext');

let videoId = urlParams.get('v') || "kTXrmIIB1sU";
if (videoId && videoId.length >= 10) {
    frame.src = "https://www.youtube.com/embed/" + videoId;
}

function change() {
    let link = linktext.value;
    if (link.length != 48) {
        alert("Invalid Video Link");
        linktext.value = "";
        return;
    }
    videoId = link.slice(17, 28);
    frame.src = "https://www.youtube.com/embed/" + videoId;
    linktext.value = "";

    const url = new URL(currentURL);
    url.searchParams.delete('v');
    url.searchParams.set('v', videoId);
    window.history.replaceState(null, '', url);
}

function share() {
    if (videoId === "") {
        alert("No Video to share - Please input some link");
        return;
    }
    let shareLink = currentURL + "?v=" + videoId;
    window.location = 'https://wa.me/?text=Play Ad-Free Video: ' + encodeURI(currentURL);
}

function downloadVideo() {
    if (!videoId) {
        alert("First play a video");
        return;
    }

    let downloadUrl = `https://en.y2mate.is/youtube/${videoId}`;

    let a = document.createElement("a");
    a.href = downloadUrl;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}