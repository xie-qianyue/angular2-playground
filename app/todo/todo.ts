export class Todo {
	id: number;
	item: string;
	completed: boolean;
	
	constructor(item: string) {
		this.id = new Date().getTime();
		this.item = item;
		this.completed = false;
	}
}