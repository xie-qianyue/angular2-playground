import {Injectable} from 'angular2/core';
import {Todo} from './todo';

let todos: Todo[] = [
	{item:'ES6', completed:false},
	{item:'Angular 2', completed:false}
];

@Injectable()
export class TodoService {
	getTodos() {
		return Promise.resolve(todos);
	}
	
	addTodo(newTodo : Todo) {
		todos.push(newTodo);
		return Promise.resolve(todos);
	}
}
