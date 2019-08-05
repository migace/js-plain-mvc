import { ITodo } from "./todo";

export interface IModel {
  todos: ITodo[];
  addTodo: (todo: ITodo) => void;
  editTodo: (id: number, text: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}
