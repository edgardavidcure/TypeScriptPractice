import React from 'react';
import { TaskProps } from "../lib/definitions"; // Importing TaskProps type from definitions

// Functional component TaskComponent that takes TaskProps as props
export const TaskComponent: React.FC<TaskProps> = ({ task, depth = 0 }) => {
    return (
        // Task component container with dynamic left margin based on depth
        <div className={`ml-${depth * 4} p-2 border-l-2 border-gray-200 w-3/5 bg-light-gray rounded-xl`}>
            <div className="flex flex-col">
                {/* Task title */}
                <span className="font-bold">{task.title}</span>
                {/* Task description */}
                <p>{task.description}</p>
                {/* Task status indicator */}
                <span className={`text-sm ${task.status ? 'text-green' : 'text-red'}`}>
                    {task.status ? 'Completed' : 'Pending'}
                </span>
            </div>
        </div>
    );
};
