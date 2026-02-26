const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
    
// Add Task
function addtask() {
    if (inputBox.value === "") {
        alert("Please enter a task");
        return;
    }

    createTask(inputBox.value);
    inputBox.value = "";
    saveData();
}

// Create Task Function
function createTask(text) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.innerText = text;
    span.className = "task-text";
    li.appendChild(span);

    // Edit button
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.className = "edit-btn";
    li.appendChild(editBtn);

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "delete-btn";
    li.appendChild(deleteBtn);

    listContainer.appendChild(li);
}

// Click Events
listContainer.addEventListener("click", function(e) {

    // Mark completed
    if (e.target.classList.contains("task-text")) {
        e.target.parentElement.classList.toggle("checked");
        saveData();
    }

    // Delete
    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
        saveData();
    }

    // Edit & Save
    if (e.target.classList.contains("edit-btn")) {
        let li = e.target.parentElement;
        let taskText = li.querySelector(".task-text");

        if (e.target.innerText === "Edit") {
            taskText.contentEditable = true;
            taskText.focus();
            e.target.innerText = "Save";
        } else {
            taskText.contentEditable = false;
            e.target.innerText = "Edit";
            saveData();
        }
    }
});

// Save to LocalStorage
function saveData() {
    localStorage.setItem("todoData", listContainer.innerHTML);
}

// Show Saved Tasks When Page Loads
function showTask() {
    listContainer.innerHTML = localStorage.getItem("todoData") || "";
}

showTask();