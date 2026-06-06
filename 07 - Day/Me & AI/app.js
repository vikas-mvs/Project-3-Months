const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const taskCount = document.getElementById("task-count");
const clearCompleted = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getFilteredTodos() {
    if (currentFilter === "active") {
        return todos.filter((todo) => !todo.completed);
    }

    if (currentFilter === "completed") {
        return todos.filter((todo) => todo.completed);
    }

    return todos;
}

function updateCount() {
    const activeCount = todos.filter((todo) => !todo.completed).length;
    taskCount.innerText = `${activeCount} ${activeCount === 1 ? "task" : "tasks"} left`;
}

function renderTodos() {
    list.innerHTML = "";

    getFilteredTodos().forEach((todo) => {
        const item = document.createElement("li");
        item.className = `todo-item ${todo.completed ? "completed" : ""}`;

        const checkbox = document.createElement("input");
        checkbox.className = "todo-check";
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => toggleTodo(todo.id));

        const text = document.createElement("span");
        text.className = "todo-text";
        text.innerText = todo.text;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.type = "button";
        deleteButton.innerText = "×";
        deleteButton.setAttribute("aria-label", `Delete ${todo.text}`);
        deleteButton.addEventListener("click", () => deleteTodo(todo.id));

        item.append(checkbox, text, deleteButton);
        list.appendChild(item);
    });

    updateCount();
}

function addTodo(text) {
    todos.unshift({
        id: Date.now(),
        text,
        completed: false
    });
    saveTodos();
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map((todo) => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }

        return todo;
    });
    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos();
    renderTodos();
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskText = input.value.trim();

    if (taskText === "") {
        input.focus();
        return;
    }

    addTodo(taskText);
    input.value = "";
    input.focus();
});

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((filterButton) => filterButton.classList.remove("active"));
        button.classList.add("active");
        currentFilter = button.dataset.filter;
        renderTodos();
    });
});

clearCompleted.addEventListener("click", () => {
    todos = todos.filter((todo) => !todo.completed);
    saveTodos();
    renderTodos();
});

renderTodos();
