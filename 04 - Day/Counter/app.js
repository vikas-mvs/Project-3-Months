const result = document.getElementById("result");
let count = 0;

function increment() {
    count++;
    result.innerHTML = "Count : " + count;
}

// Reset counter to 0 (used by inline onclick in HTML)
function resetCount() {
    count = -1;
    result.innerHTML = "Count : " + count;
}

// Mouse Click effect

document.addEventListener("click", function (e) {
  // create dot
    let dot = document.createElement("div");
    dot.className = "dot";

  // position set
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";

    document.body.appendChild(dot);

  // remove after animation
    setTimeout(() => {
    dot.remove();
    }, 100);
});
