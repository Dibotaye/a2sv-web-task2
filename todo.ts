interface TodoItem {
    id: number;
    title: string;
    completed: boolean;
}

class TodoList {
    private todos: TodoItem[] = [];
    private nextId: number = 1;

    addTodo(title: string): TodoItem {
        const todo: TodoItem = {
            id: this.nextId++,
            title: title,
            completed: false
        };
        this.todos.push(todo);
        return todo;
    }

    removeTodo(id: number): boolean {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index === -1) return false;
        this.todos.splice(index, 1);
        return true;
    }

    toggleTodo(id: number): boolean {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) return false;
        todo.completed = !todo.completed;
        return true;
    }

    listTodos(): TodoItem[] {
        return [...this.todos];
    }

    clearCompleted(): number {
        const completedCount = this.todos.filter(todo => todo.completed).length;
        this.todos = this.todos.filter(todo => !todo.completed);
        return completedCount;
    }

    getTodoCount(): { total: number; completed: number } {
        const completed = this.todos.filter(todo => todo.completed).length;
        return {
            total: this.todos.length,
            completed
        };
    }
}

// Example usage:
const todoList = new TodoList();

// Add some todos
const todo1 = todoList.addTodo("Learn TypeScript");
const todo2 = todoList.addTodo("Build Todo App");

// Display todos
console.log("\nCurrent Todos:");
todoList.listTodos().forEach(todo => {
    console.log(`${todo.id}: ${todo.title} ${todo.completed ? "(✓)" : "(✗)"}`);
});

// Toggle a todo
todoList.toggleTodo(todo1.id);

// Remove a todo
todoList.removeTodo(todo2.id);

// Show final state
console.log("\nFinal Todos:");
todoList.listTodos().forEach(todo => {
    console.log(`${todo.id}: ${todo.title} ${todo.completed ? "(✓)" : "(✗)"}`);
});
