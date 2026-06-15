let player;
let API_KEY = "AIzaSyDBCYcDfTTambrzlgG_zT7ge-YkdujgmoQ";

let currentVideos = []; // store list
let currentIndex = 0;

// 🎬 Player Ready
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '300',
        width: '100%',
        videoId: 'KBIq11mNB0I',
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

// 🔁 Autoplay next
function onPlayerStateChange(event){
    if(event.data === YT.PlayerState.ENDED){
        currentIndex++;
        if(currentIndex < currentVideos.length){
            loadVideo(currentVideos[currentIndex]);
        }
    }
}

// ▶ Load Video + Info
function loadVideo(video){
    player.loadVideoById(video.id.videoId);

    document.getElementById("title").innerText = video.snippet.title;
    document.getElementById("channel").innerText = "Channel: " + video.snippet.channelTitle;

    getVideoDuration(video.id.videoId);
}

// ⏱ Duration fetch
function getVideoDuration(videoId){
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        let duration = data.items[0].contentDetails.duration;
        document.getElementById("duration").innerText = "Duration: " + formatDuration(duration);
    });
}

// ⏱ ISO duration → readable
function formatDuration(iso){
    let match = iso.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    let h = (match[1]||"").replace("H","") || 0;
    let m = (match[2]||"").replace("M","") || 0;
    let s = (match[3]||"").replace("S","") || 0;

    return `${h}:${m}:${s}`;
}

// 🔍 Search
function searchVideos(){
    let query = document.getElementById("search").value;

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=10&key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        let results = document.getElementById("results");
        results.innerHTML = "";

        currentVideos = data.items;
        currentIndex = 0;

        data.items.forEach((video, index) => {
            let div = document.createElement("div");
            div.classList.add("video-card");

            div.innerHTML = `
                <img src="${video.snippet.thumbnails.medium.url}">
                <p>${video.snippet.title}</p>
            `;

            div.onclick = () => {
                currentIndex = index;
                loadVideo(video);
            };

            results.appendChild(div);
        });

        // auto load first video
        if(data.items.length > 0){
            loadVideo(data.items[0]);
        }
    });
}