import React, { useState, useEffect } from "react";
import { TaskSchema } from "../lib/zod";
import { Task } from "../utils/Task";
import uuid from "react-uuid";
import { TaskComponent } from "./TaskComponent";

export default function TaskForm() {
    // State variables for managing form inputs, tasks, errors, and task completion counts
    const [newTaskValues, setNewTaskValues] = useState({
        id: '',
        title: '',
        description: '',
        status: false,
    });

    const [tasks, setTasks] = useState<Task[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const [completedCount, setCompletedCount] = useState<number>(0);
    const [incompleteCount, setIncompleteCount] = useState<number>(0);

    // Handler for input changes in the form fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setNewTaskValues({
            ...newTaskValues,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Handler for form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate new task values against the defined schema
        const validationResult = TaskSchema.safeParse(newTaskValues);

        if (!validationResult.success) {
            setErrors(validationResult.error.flatten().fieldErrors);
            return;
        }

        // Generate a new unique ID for the task
        const id = uuid();

        // Create a new Task object with the form values
        const newTask = new Task(id, newTaskValues.title, newTaskValues.description, newTaskValues.status);

        // Update tasks state with the new task, reset form values and errors
        setTasks([...tasks, newTask]);
        setNewTaskValues({ id: '', title: '', description: '', status: false });
        setErrors({});

        // Store updated tasks in localStorage
        localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    };

    // Effect to load tasks from localStorage on component mount
    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Effect to update completed and incomplete task counts when tasks change
    useEffect(() => {
        // Recursive function to count completed and incomplete tasks
        const countTasks = (tasks: Task[]): { completed: number, incomplete: number } => {
            if (tasks.length === 0) {
                return { completed: 0, incomplete: 0 };
            }

            const currentTask = tasks[0];
            const { completed, incomplete } = countTasks(tasks.slice(1));

            if (currentTask.status) {
                return { completed: completed + 1, incomplete };
            } else {
                return { completed, incomplete: incomplete + 1 };
            }
        };

        // Count tasks and update state
        const { completed, incomplete } = countTasks(tasks);
        setCompletedCount(completed);
        setIncompleteCount(incomplete);
    }, [tasks]);

    // Render the form and list of tasks
    return (
        <div className="flex h-full w-full justify-center flex-col items-center">
            {/* Task creation form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-3/6">
                <div className='flex flex-col'>
                    <label htmlFor='title' className='text-lg font-bold'>Title <span>*</span></label>
                    <input
                        type='text'
                        name='title'
                        value={newTaskValues.title}
                        onChange={handleInputChange}
                        className='bg-white border border-light-orange text-black text-sm rounded-lg focus:ring-dark-blue focus:border-dark-blue block w-full p-2.5  placeholder:italic placeholder:font-light'
                        id='title'
                        placeholder='Write your task title here...'
                    />
                    {errors.title && <p className="text-red-500">{errors.title}</p>}
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="description" className='text-lg font-bold'>Description</label>
                    <textarea
                        name='description'
                        value={newTaskValues.description}
                        onChange={handleInputChange}
                        className='block p-2.5 w-full text-sm text-black bg-white rounded-lg border border-light-orange focus:ring-dark-blue focus:border-dark-blue placeholder:italic placeholder:font-light'
                        id='description'
                        placeholder='Write your task description here...'
                    />
                    {errors.description && <p className="text-red-500">{errors.description}</p>}
                </div>

                <div className='flex items-center'>
                    <input
                        type='checkbox'
                        name='status'
                        checked={newTaskValues.status}
                        onChange={handleInputChange}
                        className='mr-2'
                        id='status'
                    />
                    <label htmlFor="status" className='text-lg font-bold'>Completed</label>
                </div>

                <div className='flex gap-2 items-center justify-center'>
                    <button type="submit" className='w-fit p-2 rounded-lg bg-dark-blue text-white hover:opacity-80'>Create Task</button>
                </div>
            </form>

            {/* Display tasks */}
            <div className="mt-5 w-full flex flex-col items-center">
                <h2 className="text-xl font-bold">Tasks</h2>
                {tasks.length === 0 && <p>No tasks available</p>}
                <div className="mt-5 w-full flex flex-col items-center">
                    <div className="flex gap-3">
                        <div>
                            <p>Completed tasks: {completedCount}</p>
                        </div>
                        <div>
                            <p>Incomplete tasks: {incompleteCount}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 w-full justify-center items-center">
                    {/* Render TaskComponents for each task */}
                    {[...tasks].reverse().map((task, index) => (
                        <TaskComponent task={task} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
