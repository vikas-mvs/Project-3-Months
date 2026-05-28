result = document.getElementById('result');
let count = 0;
function increment (){
    count++;
    result.innerHTML = 'count : ' + count;
}

// Mouse Click effect

document.addEventListener("click", function(e){

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
    }, 20);

});