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
	
	deleteTodo(idTodo: number) {
		for(let todo of Todos) {
			if(todo.id === idTodo) {
				Todos.pop(todo);
				break;
			}
		}
		return Promise.resolve(Todos);
	}
}
