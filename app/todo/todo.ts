export class Todo {
	item: string;
	completed: boolean;
	
	constructor(item: string) {
		this.item = item;
		this.completed = false;
	}
}