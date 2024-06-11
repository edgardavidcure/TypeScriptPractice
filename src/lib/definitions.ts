
export interface Task{
    id: string;
    title: string;
    description: string;
    status: boolean;
}

export interface TaskProps {
    task: Task;
    depth?: number;
}