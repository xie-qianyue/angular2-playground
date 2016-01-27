import {Component, OnInit} from 'angular2/core';
import {Todo} from './todo';
import {TodoService} from './todo.service';

@Component({
	selector: 'todo-list',
	template: `
		<input #newTodo placeholder='What needs to be done?' autofocus>
		<button (click)="addTodo(newTodo.value)" (keyup.enter)="addTodo(newTodo.value)">Add</button>
		<ul>
			<li *ngFor="#todo of todos">
				<input type='checkbox' [(ngModel)]="todo.completed" (click)="toggleTodo(todo)">
				<span [class.completed]="todo.completed">{{todo.item}}</span>
				<button (click)="deleteTodo(todo)">delete</button>
			</li>
		</ul>
	`,
	styles: [`
		.completed { text-decoration: line-through; }
	`]
})

export class TodoListComponent implements OnInit {
	
	constructor(private _todoService: TodoService) { }
	
	ngOnInit() {
		this.getTodos();
    }
	
	public todos: Todo[];
	
	addTodo(newTodoItem: string) {
		let newTodo = new Todo(newTodoItem);	
		this._todoService.addTodo(newTodo).then(
			todos => this.todos = todos
		);		
	}
	
	toggleTodo(todo: Todo) {
		let newTodo = new Todo(todo.item);
		newTodo.completed = !todo.completed;
		this._todoService.saveTodo(todo, newTodo);
	}
	
	getTodos() {
		this._todoService.getTodos().then(
			todos => this.todos = todos	
		);
	}
	
	deleteTodo(todo: Todo) {
		this._todoService.deleteTodo(todo).then(
			todos => this.todos = todos
		)
	}
 }