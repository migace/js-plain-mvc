import { ITodo } from "./types/todo";

class Controller {
  model: any;
  view: any;

  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.onTodoListChanged(this.model.todos);
    this.view.bindEvents(this);
    this.model.bindEvents(this);
  }

  onTodoListChanged = (todos: ITodo[]) => this.view.displayTodos(todos);

  handleAddTodo = (event: Event) => {
    console.log("opo", this.view.todoText);
    event.preventDefault();

    if (this.view.todoText) {
      this.model.addTodo({
        id:
          this.model.todos.length > 0
            ? this.model.todos[this.model.todos.length - 1].id + 1
            : 1,
        text: this.view.todoText,
        completed: false
      });
    }

    this.view.resetInput();
  };

  handleDeleteTodo = (event: Event) => {
    if (event.target.className === "delete") {
      this.model.deleteTodo(
        parseInt(event.target.parentElement.parentElement.parentElement.id, 10)
      );
    }
  };

  handleToggle = (event: Event) => {
    if (event.target.type === "checkbox") {
      this.model.toggleTodo(
        parseInt(
          event.target.parentElement.parentElement.parentElement.parentElement
            .id,
          10
        )
      );
    }
  };
}

export default Controller;
