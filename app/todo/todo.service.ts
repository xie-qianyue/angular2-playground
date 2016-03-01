import { Injectable } from 'angular2/core';
import { Todo } from './todo';

// let todoList = Todos;
let todoList = [	
	new Todo('ES6', false),
	new Todo('Angular 2', false)
];

// return a new array
function deepCopyArray(arr) {
	return JSON.parse(JSON.stringify(arr));
}

@Injectable()
export class TodoService {
	getTodos() {
		return Promise.resolve(deepCopyArray(todoList));
	}

	addTodo(newTodo: Todo) {
		todoList.push(newTodo);
		return Promise.resolve(deepCopyArray(todoList));
	}

	saveTodo(originTodo: Todo, newTodo: Todo) {
		let index = todoList.map(todo => todo.item).indexOf(originTodo.item);
		todoList[index] = newTodo;
		return Promise.resolve(deepCopyArray(todoList));
	}

	deleteTodo(todo: Todo) {
		todoList.splice(todoList.indexOf(todo), 1);
		return Promise.resolve(deepCopyArray(todoList));
	}
}
