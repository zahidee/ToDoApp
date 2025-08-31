const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', loadTasks);

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if(taskText === '') return;

  createTaskElement(taskText);
  saveTaskToStorage(taskText);
  taskInput.value = '';
}

function createTaskElement(text, completed = false) {
  const li = document.createElement('li');
  li.className = 'task-item';
  if(completed) li.classList.add('completed');

  const span = document.createElement('span');
  span.textContent = text;
  span.addEventListener('click', () => {
    li.classList.toggle('completed');
    updateStorage();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '&times;';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => {
    li.remove();
    updateStorage();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTaskToStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: task, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateStorage() {
  const tasks = [];
  document.querySelectorAll('.task-item').forEach(item => {
    tasks.push({ text: item.querySelector('span').textContent, completed: item.classList.contains('completed') });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}