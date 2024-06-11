export class Task {
    id: string;
    title: string;
    description: string;
    status: boolean;

    constructor(id: string, title: string, description: string, status: boolean) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
    }
}