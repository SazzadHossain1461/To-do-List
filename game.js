const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

document.addEventListener("DOMContentLoaded", loadTasks);
addBtn.addEventListener("click", addTask);
taskList.addEventListener("click", handleTaskClick);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = createTaskElement(taskText);
  taskList.appendChild(li);

  saveTaskToLocalStorage(taskText);
  taskInput.value = "";
}

function handleTaskClick(e) {
  if (e.target.classList.contains("delete-btn")) {
    const task = e.target.parentElement;
    removeTaskFromLocalStorage(task.querySelector("span").innerText);
    task.remove();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.classList.toggle("completed");
    toggleCompleteInLocalStorage(e.target.innerText);
  }
}

function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.className = "task";
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="delete-btn">Delete</button>
  `;
  return li;
}

// ===== Local Storage Functions =====
function saveTaskToLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(task => {
    const li = createTaskElement(task.text);
    if (task.completed) li.classList.add("completed");
    taskList.appendChild(li);
  });
}

function removeTaskFromLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter(t => t.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleCompleteInLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  const index = tasks.findIndex(t => t.text === taskText);
  if (index !== -1) tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
