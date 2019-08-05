import { ITodo } from "./types/todo";

class Controller {
  model: any;
  view: any;

  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.onTodoListChanged(this.model.todos);
  }

  onTodoListChanged = (todos: ITodo[]) => this.view.displayTodos(todos);
}

export default Controller;
