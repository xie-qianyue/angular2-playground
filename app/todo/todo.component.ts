import {Component} from 'angular2/core';
import {TodoService} from './todo.service';
import {TodoListComponent} from './todo-list.component';

@Component({
  template:  `
    <h2>Todo</h2>
    <todo-list></todo-list>
  `,
  providers:  [TodoService],
  directives: [TodoListComponent]
})

export class TodoComponent { }