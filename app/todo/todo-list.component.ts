import {Component, OnInit} from 'angular2/core';
import {Todo} from './todo';
import {TodoService} from './todo.service';

@Component({
	selector: 'todo-list',
	template: `
		<input [(ngModel)]="newTodo" placeholder='What needs to be done?' (keyup.enter)="addTodo()" autofocus>
		<button (click)="addTodo()">Add</button>
		<ul>
			<li *ngFor="#todo of todos">
				<input type='checkbox' [(ngModel)]="todo.completed" (click)="toggleTodo(todo)">
				<span [class.completed]="todo.completed" [style.display]="isEditing(todo)?'none':'inline'" (dblclick)="onEditTodo(todo)">{{todo.item}}</span>
				<input [(ngModel)]="todo.item" [style.display]="isEditing(todo)?'inline':'none'" (keyup.enter)="saveEditedTodo(todo)">
				<button (click)="deleteTodo(todo)">delete</button>
			</li>
		</ul>
	`,
	styles: [`
		.completed { text-decoration: line-through; }
	`]
})

export class TodoListComponent implements OnInit {
	
	// For showing/hiding editing todo
	private _todoOnEdit: Todo;
	// For updating new todo
	private _originTodo: Todo;
	
	constructor(private _todoService: TodoService) { }
	
	ngOnInit() {
		this.getTodos();
    }
	
	public todos: Todo[];
	public newTodo: string;
	
	addTodo() {
		let newTodo = new Todo(this.newTodo.trim());	
		this._todoService.addTodo(newTodo).then(
			todos => {
				this.todos = todos
				this.newTodo = '';
			}			
		);	
	}
	
	toggleTodo(todo: Todo) {
		let newTodo = new Todo(todo.item, !todo.completed);
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
		);
	}
	
	saveEditedTodo(newTodo: Todo) {
		console.log('_originTodo : ' + this._originTodo.item);
		this._todoService.saveTodo(this._originTodo, newTodo).then(
			todos => {
				this.todos = todos;
				this._todoOnEdit = null;
			}			
		);
	}
	
	onEditTodo(todo: Todo) {
		this._todoOnEdit = todo;
		// cannot pass todo by reference!
		this._originTodo = new Todo(todo.item, todo.completed);
	}
	
	isEditing(todo: Todo) {
		return this._todoOnEdit === todo;
	}
 }