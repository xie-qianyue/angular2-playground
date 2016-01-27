import { Injectable } from 'angular2/core';
import { Todo } from './todo';
import { Todos } from './mock-todo';

@Injectable()
export class TodoService {
	getTodos() {
		return Promise.resolve(Todos);
	}
	
	addTodo(newTodo: Todo) {
		Todos.push(newTodo);
		return Promise.resolve(Todos);
	}
	
	saveTodo(originTodo: Todo, newTodo: Todo) {
		Todos[Todos.indexOf(originTodo)] = newTodo;
	}
	
	deleteTodo(todo: Todo) {
		Todos.splice(Todos.indexOf(todo), 1);
		return Promise.resolve(Todos);
	}
}
