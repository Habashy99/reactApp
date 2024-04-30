"use client";
import { useState, useEffect, Fragment } from "react";
import UserRouter, { User } from "../../../lib/userRouter"




export default function Page() {
    const [data, setData] = useState<User[]>([]);

    useEffect(() => {
        UserRouter.getAllUsers().then((users) => {
            setData(users);
        }).catch(error => {
            console.log(error)
        });
    }, [])



    return (
        <Fragment>
            <ul>
                {data.map((user: User, index: number) => {
                    return <li key={index}>{user.firstName} - {user.email}</li>
                })}
            </ul>
        </Fragment>
    )
}