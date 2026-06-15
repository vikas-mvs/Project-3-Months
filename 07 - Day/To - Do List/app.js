inputtask = document.getElementById('inputtask');
tasklist = document.getElementById('tasklist');
function add() {
    if(inputtask.value != "") {
        let li = document.createElement('li');
        li.innerHTML = inputtask.value + "<button onclick=remove(this)> X </button> ";
        tasklist.appendChild(li);
        inputtask.value = "";
    }
}

function remove (elem) {
    elem.parentElement.remove();
}