import { IModel } from "./types/model";
import { ITodo } from "./types/todo";

class Model implements IModel {
  todos: ITodo[];

  constructor() {
    this.todos = [
      { id: 1, text: "Create a new JS app", completed: false },
      { id: 2, text: "Test your new app", completed: false }
    ];
  }

  addTodo(todo: ITodo) {
    this.todos = [...this.todos, todo];
  }

  editTodo(id: number, text: string) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { id: todo.id, text, completed: todo.completed } : todo
    );
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleTodo(id: number) {
    this.todos = this.todos.map(todo =>
      todo.id === id
        ? { id: todo.id, text: todo.text, completed: !todo.completed }
        : todo
    );
  }
}

export default Model;
