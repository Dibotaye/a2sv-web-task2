
interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
}

class TodoListApp {
    private tasks: TodoItem[] = [];
    private nextId: number = 1;
    private taskInput: HTMLInputElement;
    private taskList: HTMLUListElement;

    constructor() {
        console.log('Initializing TodoListApp...');
        this.taskInput = document.getElementById('taskInput') as HTMLInputElement;
        this.taskList = document.getElementById('taskList') as HTMLUListElement;
        
        if (!this.taskInput || !this.taskList) {
            console.error('Missing required DOM elements');
            throw new Error('Could not initialize TodoListApp - missing DOM elements');
        }
        
        this.setupEventListeners();
        console.log('TodoListApp initialized successfully');
    }

    private setupEventListeners(): void {
        const addButton = document.querySelector('button');
        if (addButton) {
            addButton.addEventListener('click', () => this.addTask());
        }

        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });
    }

    private addTask(): void {
        const taskText = this.taskInput.value.trim();
        
        if (taskText === '') {
            console.warn('Empty task text, ignoring...');
            return;
        }

        const newTask: TodoItem = {
            id: this.nextId++,
            text: taskText,
            completed: false
        };

        this.tasks.push(newTask);
        console.log(`Added new task: ${taskText} (ID: ${newTask.id})`);
        this.renderTask(newTask);
        this.taskInput.value = '';
    }

    private renderTask(task: TodoItem): void {
        const li = document.createElement('li');
        li.dataset.id = task.id.toString();

        const span = document.createElement('span');
        span.textContent = task.text;
        if (task.completed) {
            span.style.textDecoration = 'line-through';
            span.style.color = '#888';
        }

        span.addEventListener('click', () => this.toggleTaskCompletion(task.id));

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit';
        editBtn.addEventListener('click', () => this.editTask(task.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete';
        deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'buttons';
        buttonsDiv.appendChild(editBtn);
        buttonsDiv.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(buttonsDiv);

        this.taskList.appendChild(li);
    }

    private editTask(id: number): void {
        const task = this.tasks.find(t => t.id === id);
        if (!task) {
            console.warn(`Task with ID ${id} not found`);
            return;
        }

        const newTaskText = prompt('Edit task:', task.text);
        if (newTaskText === null) return;
        
        const trimmedText = newTaskText.trim();
        if (trimmedText === '') {
            console.warn('Empty task text provided, ignoring...');
            return;
        }

        task.text = trimmedText;
        console.log(`Updated task ID ${id}: ${trimmedText}`);
        this.refreshTaskList();
    }

    private deleteTask(id: number): void {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            console.warn(`Task with ID ${id} not found`);
            return;
        }

        const removedTask = this.tasks[taskIndex];
        this.tasks = this.tasks.filter(task => task.id !== id);
        console.log(`Deleted task: ${removedTask.text} (ID: ${id})`);
        
        const taskElement = document.querySelector(`li[data-id="${id}"]`);
        if (taskElement) {
            taskElement.remove();
        }
    }

    private toggleTaskCompletion(taskId: number): void {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) {
            console.warn(`Task with ID ${taskId} not found`);
            return;
        }

        task.completed = !task.completed;
        console.log(`Toggled task completion for ID ${taskId}: ${task.text}`);
        this.refreshTaskList();
    }

    private refreshTaskList(): void {
        console.log('Refreshing task list...');
        this.taskList.innerHTML = '';
        this.tasks.forEach(task => this.renderTask(task));
        console.log(`Task list refreshed. Total tasks: ${this.tasks.length}`);
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoListApp();
});