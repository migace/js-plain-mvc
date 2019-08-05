import { ITodo } from "./types/todo";

class View {
  app: HTMLElement;
  title: HTMLElement;
  form: HTMLElement;
  inputContainer: HTMLElement;
  inputWrapper: HTMLElement;
  input: HTMLInputElement;
  submitButtonWrapper: HTMLElement;
  submitButton: HTMLElement;
  todoList: HTMLElement;

  constructor(root) {
    this.app = this.getElement(root);

    this.title = this.createElement("h1", "title");
    this.title.textContent = "Todos";

    this.form = this.createElement("form");

    this.inputContainer = this.createElement("div", "field");
    this.inputWrapper = this.createElement("div", "control");
    this.input = this.createElement("input", "input") as HTMLInputElement;
    this.input.type = "text";
    this.input.placeholder = "Add todo";
    this.input.name = "todo";
    this.inputWrapper.append(this.input);
    this.inputContainer.append(this.inputWrapper);

    this.submitButtonWrapper = this.createElement("div", "is-clipped");
    this.submitButton = this.createElement("button", "button");
    this.addClass(this.submitButton, "is-primary");
    this.addClass(this.submitButton, "is-pulled-right");
    this.submitButton.textContent = "Submit";
    this.submitButtonWrapper.append(this.submitButton);

    this.todoList = this.createElement("ul", "todo-list");

    this.form.append(this.inputContainer, this.submitButtonWrapper);
    this.app.append(this.title, this.form, this.todoList);

    this.displayTodos();
  }
  createElement(tag: string, className?: string): HTMLElement {
    const element = document.createElement(tag);

    if (className) this.addClass(element, className);

    return element;
  }

  getElement(selector: string): HTMLElement {
    return document.querySelector(selector);
  }

  addClass(element: Element, className: string) {
    return element.classList.add(className);
  }

  get todoText() {
    return this.input.value;
  }

  resetInput() {
    this.input.value = "";
  }

  displayTodos(todos: ITodo[] = []) {
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }

    if (!todos.length) {
      const p = this.createElement("p");
      p.textContent = "Nothing to do! Add a task?";
      this.todoList.append(p);
    } else {
      todos.forEach(todo => {
        const li: HTMLElement = this.createElement("li");
        li.id = String(todo.id);

        const checkbox: HTMLInputElement = this.createElement(
          "input"
        ) as HTMLInputElement;
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        const span: HTMLElement = this.createElement("span", "editable");
        span.contentEditable = String(true);

        if (todo.completed) {
          const strike = this.createElement("s");
          strike.textContent = todo.text;
          span.append(strike);
        } else {
          span.textContent = todo.text;
        }

        const deleteButton: HTMLElement = this.createElement(
          "button",
          "delete"
        );
        deleteButton.textContent = "Delete";

        li.append(checkbox, span, deleteButton);
        this.todoList.append(li);
      });
    }
  }
}

export default View;
