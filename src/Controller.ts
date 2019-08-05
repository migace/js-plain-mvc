import { ITodo } from "./types/todo";

class Controller {
  model: any;
  view: any;

  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.onTodoListChanged(this.model.todos);
    this.view.bindEvents(this);
  }

  onTodoListChanged = (todos: ITodo[]) => this.view.displayTodos(todos);

  handleAddTodo = (event: Event) => {
    event.preventDefault();

    if (this.view.todoText) {
      this.model.addTodo({
        id:
          this.model.todos.length > 0
            ? this.model.todos[this.model.todos.length - 1]
            : 1,
        text: this.view.todoText,
        completed: false
      });
    }

    this.view.resetInput();
  };

  handleDeleteTodo = (event: Event) => {};

  handleToggle = (event: Event) => {};
}

export default Controller;
