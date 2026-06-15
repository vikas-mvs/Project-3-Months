function searchGoogle() {
    let query = document.getElementById("search").value;

    if (query.trim() !== "") {
        let url = "https://www.google.com/search?q=" + encodeURIComponent(query);
        window.location.href = url;
    }
    
}
let input = document.getElementById("search");

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        searchGoogle();
    }
});

function luckySearch() {
    let query = document.getElementById("search").value;

    if (query.trim() !== "") {
        let url = "https://www.google.com/search?q=" + encodeURIComponent(query) + "&btnI=I";
        window.location.href = url;
    }
}