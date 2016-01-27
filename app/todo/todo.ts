export class Todo {
	item: string;
	completed: boolean;
	
	// set parameter "completed" default value to false
	constructor(item: string, completed = false) {
		this.item = item;
		this.completed = completed;
	}
}