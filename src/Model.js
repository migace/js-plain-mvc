class Model {
  constructor() {
    this.todos = [
      { id: 1, text: "Create a new JS app", completed: false },
      { id: 2, text: "Test your new app", completed: false }
    ];
  }

  addTodo(todo) {
    this.todos = [...this.todos, todo];
  }

  editTodo(id, text) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { id: todo.id, text, completed: todo.completed } : todo
    );
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleTodo(id) {
    this.todos = this.todos.map(todo =>
      todo.id === id
        ? { id: todo.id, text: todo.text, completed: !todo.completed }
        : todo
    );
  }
}

export default Model;
