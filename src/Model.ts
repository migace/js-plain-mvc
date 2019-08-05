import { IModel } from "./types/model";
import { ITodo } from "./types/todo";

class Model implements IModel {
  todos: ITodo[];
  onTodoListChanged: () => {};

  constructor() {
    this.todos = [
      { id: 1, text: "Create a new JS app", completed: false },
      { id: 2, text: "Test your new app", completed: false }
    ];
  }

  addTodo(todo: ITodo) {
    this.todos = [...this.todos, todo];
    this.onTodoListChanged(this.todos);
  }

  editTodo(id: number, text: string) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { id: todo.id, text, completed: todo.completed } : todo
    );
    this.onTodoListChanged(this.todos);
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.onTodoListChanged(this.todos);
  }

  toggleTodo(id: number) {
    this.todos = this.todos.map(todo =>
      todo.id === id
        ? { id: todo.id, text: todo.text, completed: !todo.completed }
        : todo
    );
    this.onTodoListChanged(this.todos);
  }

  bindEvents(controller) {
    this.onTodoListChanged = controller.onTodoListChanged;
  }
}

export default Model;
