import {Component, OnInit} from 'angular2/core';
import {Todo} from './todo';
import {TodoService} from './todo.service';

@Component({
	selector: 'todo-list',
	template: `
		<input #newTodo placeholder='What needs to be done?' autofocus>
		<button (click)="addTodo(newTodo.value)">Add</button>
		<ul>
			<li *ngFor='#todo of todos'>
				<input type='checkbox' [(ngModel)]='todo.completed'>
				{{todo.item}}
			</li>
		</ul>
	`
})

export class TodoListComponent implements OnInit {
	
	constructor(private _todoService: TodoService) { }
	
	ngOnInit() {
		this.getTodos();
    }
	
	public todos: Todo[];
	
	addTodo(newTodoItem:string) {
		let newTodo = new Todo(newTodoItem);	
		this._todoService.addTodo(newTodo).then(
			todos => this.todos = todos
		);		
	}
	
	getTodos(){
		this._todoService.getTodos().then(
			todos => this.todos = todos	
		);
	}
 }