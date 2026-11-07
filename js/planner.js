 // ======================================
// AISHAT ABU-SULE - ACADEMIC PLANNER
// ======================================

// Get HTML elements
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");
const formMessage = document.getElementById("formMessage");
const emptyMessage = document.getElementById("emptyMessage");

const totalCount = document.getElementById("totalCount");
const doneCount = document.getElementById("doneCount");
const leftCount = document.getElementById("leftCount");

const clearCompleted = document.getElementById("clearCompleted");
const filterButtons = document.querySelectorAll(".filter-btn");

// Load saved tasks from browser storage
let tasks = [];

try {
    const savedTasks = JSON.parse(localStorage.getItem("aishatTasks"));
    tasks = Array.isArray(savedTasks) ? savedTasks : [];
} catch (error) {
    tasks = [];
}

// Current filter
let currentFilter = "all";

// Save tasks
function saveTasks() {
    localStorage.setItem("aishatTasks", JSON.stringify(tasks));
}

// Display statistics
function updateStats() {
    const completed = tasks.filter(task => task.completed).length;
    const remaining = tasks.length - completed;

    totalCount.textContent = tasks.length;
    doneCount.textContent = completed;
    leftCount.textContent = remaining;
}

// Display tasks
function displayTasks() {
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === "active") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    emptyMessage.style.display =
        filteredTasks.length === 0 ? "block" : "none";

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        // Task checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", "Mark task as completed");

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        // Task information
        const taskDetails = document.createElement("div");
        taskDetails.className = "task-details";

        const taskName = document.createElement("span");
        taskName.className = "task-name";
        taskName.textContent = task.name;

        const dateText = document.createElement("small");
        dateText.className = "task-date";

        if (task.date) {
            dateText.textContent = "Due: " + task.date;
        } else {
            dateText.textContent = "No due date";
        }

        taskDetails.appendChild(taskName);
        taskDetails.appendChild(dateText);

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.setAttribute("aria-label", "Delete " + task.name);

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== task.id);
            saveTasks();
            displayTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(taskDetails);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    updateStats();
}

// Add a new task
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskName = taskInput.value.trim();
    const dueDate = taskDate.value;

    if (taskName === "") {
        formMessage.textContent = "Please enter a task.";
        return;
    }

    const newTask = {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        name: taskName,
        date: dueDate,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskForm.reset();

    formMessage.textContent = "Task added successfully!";

});

// Filter tasks
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayTasks();
    });
});

// Clear completed tasks
clearCompleted.addEventListener("click", () => {
    tasks = tasks.filter(task => !task.completed);

    saveTasks();
    displayTasks();

    formMessage.textContent = "Completed tasks cleared.";
});

// Automatically update copyright year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Show saved tasks when the page opens
displayTasks();