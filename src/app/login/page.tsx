"use client"
import React, { useContext, Fragment } from "react";
import UserRouter from "../../lib/userRouter"
import { useRouter } from 'next/navigation'
import { Login } from "../../helpers/loginContext"

export default function LoginPage() {
  const router = useRouter();
  const { setToken } = useContext(Login)
  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (document.getElementsByName("email")[0] as HTMLInputElement).value;
    const password = (document.getElementsByName("password")[0] as HTMLInputElement).value;
    UserRouter.login(email, password).then(data => {
      setToken(data.user.token)
      localStorage.setItem('token', `${data.user.token}`);
      router.replace('/dashboard/search')
    }).catch(error => console.log(error));
  }
  return <Fragment>
    <form method="POST" onSubmit={login}>
      <div>
        <label>Email</label>
        <input type="text" name="email" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" />
      </div>
      <button type="submit">LogIn</button>
    </form>
  </Fragment>
}