import { useState, useEffect } from "react";
import { TaskSchema } from "../lib/zod";
import { Task } from "../utils/Task";
import uuid from "react-uuid";
import { TaskComponent } from "./TaskComponent";
export default function TaskForm() {
    const [newTaskValues, setNewTaskValues] = useState({ 
      id: '',  
      title: '',
      description: '',
      status: false,
    });
  
    const [tasks, setTasks] = useState<Task[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setNewTaskValues({
          ...newTaskValues,
          [name]: type === 'checkbox' ? checked : value,
        });
      };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      const validationResult = TaskSchema.safeParse(newTaskValues);
  
      if (!validationResult.success) {
        setErrors(validationResult.error.flatten().fieldErrors);
        return;
      }

      let id = uuid()
  
      const newTask = new Task(id, newTaskValues.title, newTaskValues.description, newTaskValues.status);
  
      setTasks([...tasks, newTask]);
      setNewTaskValues({id: '', title: '', description: '', status: false });
      setErrors({});
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    };
  
    useEffect(() => {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }, []);

    return (
        <div className="flex h-full w-full justify-center flex-col items-center">
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
    
          <div className="mt-5 w-full flex flex-col items-center">
            <h2 className="text-xl font-bold">Tasks</h2>
            {tasks.length === 0 && <p>No tasks available</p>}
            <div className="flex flex-col gap-5 w-full justify-center items-center">
            {[...tasks].reverse().map((task, index) => (
                
                <TaskComponent task={task} key={index}/>


            //   <div key={index} className=" w-3/5 bg-light-gray rounded-xl p-4">
            //     <h3 className="font-bold">{task.title}</h3>
            //     <p>{task.description}</p>
            //     <p>Status: {task.status ? 'Completed' : 'Pending'}</p>
            //   </div>
              
            ))}
            </div>

          </div>
        </div>
      );
    }



