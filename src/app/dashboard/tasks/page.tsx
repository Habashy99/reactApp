"use client";
import { useState, useEffect } from "react";
import TaskRouter from "../../lib/taskRouter"

interface Task {
  taskName: string;
  taskTime: string;
};

export default function Page() {
  const [data, setData] = useState<Task[]>([]);
  useEffect(() => {
    TaskRouter.getTasks().then((tasks) => {
      setData(tasks);
    }).catch(error => {
      console.log(error)
    });
  }, [])

  return (
    <div>
      <ul>
        {data.map((task: Task, index: number) => {
          return <li key={index}>{task.taskName} - {task.taskTime}</li>
        })}
      </ul>
    </div>
  )
}