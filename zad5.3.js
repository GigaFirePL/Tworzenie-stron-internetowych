document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        // Create task item
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';    
        const taskContent = document.createElement('span');
        taskContent.className = 'task-content';
        taskContent.textContent = taskText;
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Usuń';

        taskItem.appendChild(taskContent);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);

        // Clear input
        taskInput.value = '';

        // Add event listeners
        taskContent.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
        });

        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(taskItem);
        });
    }

    // Add task on button click
    addTaskButton.addEventListener('click', addTask);

    // Add task on Enter key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});