"use client";
import TaskRouter, { Task } from "../../../lib/taskRouter"
import { useState, useContext, useRef, useEffect } from "react";
import Wrapper from "../../../helpers/Wrapper"
import UserRouter, { User } from "../../../lib/userRouter";
import { Login } from "@/helpers/loginContext";
export default function Pages() {

    // const [tasks, setTasks] = useState<Task[]>([]);
    // const [users, setUsers] = useState<User[]>([]);
    const [state, setState] = useState<{ users: User[], tasks: Task[] }>({ users: [], tasks: [] })
    let tasksHistory = useRef<[Task[]]>([[]]);
    const { token } = useContext(Login)
    //let formSubmitButton = useRef<HTMLButtonElement>(null);
    // function fromSubmit(event: React.FormEvent<HTMLFormElement>) {
    //     event.preventDefault();
    //     const taskName = (event.target as HTMLFormElement).taskName.value;
    //     TaskRouter.getTaskByName(taskName).then((tasks) => {
    //         tasksHistory.current.push(tasks);
    //         setTasks(tasks)
    //     }).catch(error => {
    //         console.log(error)
    //     });
    // }

    function onClickHandler(event: MouseEvent) {
        const taskName = (document.getElementById("taskName") as HTMLInputElement).value;
        TaskRouter.getTaskByName(taskName).then((tasks: Task[]) => {
            if (tasks instanceof Array) {
                tasksHistory.current.push(tasks);
                setState(prevState => ({ ...prevState, tasks }));
            } else {
                console.log(tasks);
            }
        }).catch(error => {
            console.log(error)
        });
        UserRouter.getUserByEmail("habashy@yahoo.com").then((users: User[]) => {
            setState(prevState => ({ ...prevState, users }));
        }).catch(error => {
            console.log(error)
        });
    }

    useEffect(() => {

        if (document.getElementById("formSubmitButton")) {
            document.getElementById("formSubmitButton")?.addEventListener('click', onClickHandler)
        }
        return () => {
            document.getElementById("formSubmitButton")?.removeEventListener("click", onClickHandler)
        }
    })

    function fromSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const userEmail = (event.target as HTMLFormElement).email.value;
        UserRouter.getUserByEmail(userEmail).then((users: User[]) => {
            setState(prevState => ({ ...prevState, users }));
        }).catch(error => {
            console.log(error)
        });
    }
    return (
        <Wrapper>
            <form onSubmit={(e) => { e.preventDefault(); }}>
                <label htmlFor="taskName">Enter the task name </label>
                <br></br>
                <input type="text" id="taskName" name="taskName"></input>
                <br></br>
                <button id="formSubmitButton" type="submit"> Search</button>
            </form>
            <div>
                {state.tasks.length === 0 ? <p>Please enter something</p> :
                    <ul>
                        {state.tasks.map((task: Task, index: number) => {

                            return <li key={index}>{task.taskName} - {task.taskTime}</li>
                        })}
                    </ul>
                }
            </div>
            <br></br>
            <div>
                {token}
            </div>
            <br></br>
            {/* <div>
                <ul>
                    {tasksHistory && (
                        tasksHistory.current.map((tasks: Task[], index: number) => {
                            return <li key={index}>
                                <ul>
                                    {tasks.map((task: Task, index: number) => {
                                        return <li key={index}>{task.taskName} - {task.taskTime}</li>
                                    })}
                                </ul>
                            </li>
                        })
                    )

                    }
                </ul>
            </div>
            <br></br> */}
            {/* <form onSubmit={fromSubmit}>
                <label htmlFor="email">Enter the user email </label>
                <br></br>
                <input type="text" id="email" name="email"></input>
                <br></br>
                <button id="formSubmitButton" type="submit"> Search</button>
            </form> */}
            <div>
                {state.users.length === 0 ? <p>Please enter something</p> :
                    <ul>
                        {state.users.map((user: User, index: number) => {

                            return <li key={index}>{user.firstName} - {user.email}</li>
                        })}
                    </ul>
                }
            </div>
        </Wrapper>
    )
}