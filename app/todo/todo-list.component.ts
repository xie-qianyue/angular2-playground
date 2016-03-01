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
				<span [class.completed]="todo.completed" [style.display]="isEditing(todo)?'none':'inline'" (dblclick)="onEditTodo(todo, todoInput)">{{todo.item}}</span>
				<input #todoInput [(ngModel)]="todo.item" [style.display]="isEditing(todo)?'inline':'none'" 
					(keyup.enter)="saveEditedTodo(todo)" (keyup.escape)="onCancelEdit(todo)" (blur)="saveEditedTodo(todo)">
				<button (click)="deleteTodo(todo)">delete</button>
			</li>
		</ul>
		<p>To edit the to do item: double click it.</p>
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
		this._todoService.saveTodo(todo, newTodo).then(
			todos => {
				this.todos = todos;
			}			
		);
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
		this._todoOnEdit = null;
		// check whether the todo item is modified
		if(newTodo.item !== this._originTodo.item){
			this._todoService.saveTodo(this._originTodo, newTodo).then(
				todos => {
					this.todos = todos;
					
				}			
			);
		}
	}
	
	onEditTodo(todo: Todo, todoInput: HTMLInputElement) {
		// todoInput.focus() doesn't work here, because the DOM hasn't been updated yet		
		// In order to execute focus logic after the DOM has been updated, a timeout is used to push it onto a future VM turn.		
		setTimeout(() => { todoInput.focus(); }, 0);
		this._todoOnEdit = todo;
		// save origin todo item, cannot pass todo by reference!
		this._originTodo = new Todo(todo.item, todo.completed);
	}
	
	onCancelEdit(todo: Todo) {
		this._todoOnEdit = null;
		let index = this.todos.map(todo => todo.item).indexOf(todo.item);
		this.todos[index] = this._originTodo;
	}
	
	isEditing(todo: Todo) {
		return this._todoOnEdit === todo;
	}
 }