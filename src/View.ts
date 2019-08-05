import { ITodo } from "./types/todo";

class View {
  app: HTMLElement;
  title: HTMLElement;
  form: HTMLElement;
  input: HTMLElement;
  submitButtonWrapper: HTMLElement;
  submitButton: HTMLElement;
  todoList: HTMLElement;

  constructor(root) {
    this.app = this.getElement(root);

    this.title = this.createElement("h1", "title");
    this.title.textContent = "Todos";

    this.form = this.createElement("form");

    this.input = this.createInputElement("todo", "Add todo");

    this.submitButtonWrapper = this.createElement("div", "is-clipped");
    this.submitButton = this.createElement("button", "button");
    this.addClass(this.submitButton, "is-primary");
    this.addClass(this.submitButton, "is-pulled-right");
    this.submitButton.textContent = "Submit";
    this.submitButtonWrapper.append(this.submitButton);

    this.todoList = this.createElement("ul", "todo-list");

    this.form.append(this.input, this.submitButtonWrapper);
    this.app.append(this.title, this.form, this.todoList);
  }
  createElement(tag: string, className?: string): HTMLElement {
    const element = document.createElement(tag);

    if (className) this.addClass(element, className);

    return element;
  }

  createInputElement(
    name: string,
    placeholder: string,
    type: string = "text",
    className: string = "input"
  ): HTMLElement {
    const inputContainer: HTMLElement = this.createElement("div", "field");
    const inputWrapper: HTMLElement = this.createElement("div", "control");
    const input: HTMLInputElement = this.createElement(
      "input",
      className
    ) as HTMLInputElement;
    input.type = type;
    input.placeholder = placeholder;
    input.name = name;
    inputWrapper.append(input);
    inputContainer.append(inputWrapper);

    return inputContainer;
  }

  createWrapper(
    children: HTMLElement[],
    tag: string = "div",
    className: string = "field",
    grouped: boolean = false
  ) {
    const element = this.createElement(tag, className);
    if (grouped) this.addClass(element, "is-grouped");

    children.forEach(child => element.append(child));

    return element;
  }

  getElement(selector: string): HTMLElement {
    return document.querySelector(selector);
  }

  addClass(element: Element, className: string) {
    return element.classList.add(className);
  }

  get todoText() {
    return this.input.querySelector("input").value;
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

        const checkboxWrapper: HTMLElement = this.createElement(
          "label",
          "checkbox"
        );
        const checkbox: HTMLInputElement = this.createElement(
          "input"
        ) as HTMLInputElement;
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkboxWrapper.append(checkbox);

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

        li.append(
          this.createWrapper(
            [
              this.createWrapper([checkboxWrapper], "p", "control"),
              this.createWrapper([span], "p", "control"),
              this.createWrapper([deleteButton], "p", "control")
            ],
            "div",
            "field",
            true
          )
        );
        this.todoList.append(li);
      });
    }
  }

  bindEvents(controller) {
    this.form.addEventListener("submit", controller.handleAddTodo);
    this.todoList.addEventListener("click", controller.handleDeleteTodo);
    this.todoList.addEventListener("change", controller.handleToggle);
  }
}

export default View;
