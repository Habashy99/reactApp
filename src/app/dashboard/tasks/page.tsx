"use client";
import { useState, useEffect, Fragment } from "react";
import TaskRouter, { Task } from "../../../lib/taskRouter"



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
    <Fragment>
      <ul>
        {data.map((task: Task, index: number) => {
          return <li key={index}>{task.taskName} - {task.taskTime}</li>
        })}
      </ul>
    </Fragment>
  )
}