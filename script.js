let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    taskInput.value = "";
    saveTasks();
    displayTasks();
}

function displayTasks() {
    taskList.innerHTML = "";

    let filtered = tasks;

    if (currentFilter === "active") {
        filtered = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filtered = tasks.filter(task => task.completed);
    }

    filtered.forEach(task => {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="actions">
                <button class="edit" onclick="editTask(${task.id})">Edit</button>

                <button onclick="toggleTask(${task.id})">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function editTask(id) {

    const task = tasks.find(t => t.id === id);

    const newText = prompt("Edit Task", task.text);

    if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        saveTasks();
        displayTasks();
    }
}

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    displayTasks();
}

function toggleTask(id) {

    const task = tasks.find(t => t.id === id);

    task.completed = !task.completed;

    saveTasks();
    displayTasks();
}

function filterTasks(type) {
    currentFilter = type;
    displayTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

displayTasks();