import { TaskProps } from "../lib/definitions";
import React  from 'react';


export const TaskComponent: React.FC<TaskProps> = ({ task, depth = 0 }) => {
    return (
      <div className={`ml-${depth * 4} p-2 border-l-2 border-gray-200 w-3/5 bg-light-gray rounded-xl`}>
        <div className="flex flex-col ">
          <span className="font-bold">{task.title}</span>
          <p>{task.description}</p>
          <span className={`text-sm ${task.status ? 'text-green' : 'text-red'}`}>
            {task.status ? 'Completed' : 'Pending'}
          </span>
        </div>
      </div>
    );
  };