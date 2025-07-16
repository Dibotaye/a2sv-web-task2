var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var TodoList = /** @class */ (function () {
    function TodoList() {
        this.todos = [];
        this.nextId = 1;
    }
    TodoList.prototype.addTodo = function (title) {
        var todo = {
            id: this.nextId++,
            title: title,
            completed: false
        };
        this.todos.push(todo);
        return todo;
    };
    TodoList.prototype.removeTodo = function (id) {
        var index = this.todos.findIndex(function (todo) { return todo.id === id; });
        if (index === -1)
            return false;
        this.todos.splice(index, 1);
        return true;
    };
    TodoList.prototype.toggleTodo = function (id) {
        var todo = this.todos.find(function (todo) { return todo.id === id; });
        if (!todo)
            return false;
        todo.completed = !todo.completed;
        return true;
    };
    TodoList.prototype.listTodos = function () {
        return __spreadArray([], this.todos, true);
    };
    TodoList.prototype.clearCompleted = function () {
        var completedCount = this.todos.filter(function (todo) { return todo.completed; }).length;
        this.todos = this.todos.filter(function (todo) { return !todo.completed; });
        return completedCount;
    };
    TodoList.prototype.getTodoCount = function () {
        var completed = this.todos.filter(function (todo) { return todo.completed; }).length;
        return {
            total: this.todos.length,
            completed: completed
        };
    };
    return TodoList;
}());
// Example usage:
var todoList = new TodoList();
// Add some todos
var todo1 = todoList.addTodo("Learn TypeScript");
var todo2 = todoList.addTodo("Build Todo App");
// Display todos
console.log("\nCurrent Todos:");
todoList.listTodos().forEach(function (todo) {
    console.log("".concat(todo.id, ": ").concat(todo.title, " ").concat(todo.completed ? "(✓)" : "(✗)"));
});
// Toggle a todo
todoList.toggleTodo(todo1.id);
// Remove a todo
todoList.removeTodo(todo2.id);
// Show final state
console.log("\nFinal Todos:");
todoList.listTodos().forEach(function (todo) {
    console.log("".concat(todo.id, ": ").concat(todo.title, " ").concat(todo.completed ? "(✓)" : "(✗)"));
});
