import { sendHttpReq } from "./httpHandler";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
}

export default class UserRouter {
    static getAllUsers() {
        return sendHttpReq('users').then((response) => {
            return response.json();
        })
    }
    static getUserById(id: string) {
        return sendHttpReq('users/search?' + new URLSearchParams({ id })).then((response) => {
            return response.json();
        })
    }
    static getUserByEmail(email: string) {
        return sendHttpReq('users/email?' + new URLSearchParams({ email })).then((response) => {
            console.log(response)
            return response.json();
        })
    }
    static login(email: string, password: string) {
        return sendHttpReq('users/login', "POST", {
            email,
            password
        }).then((response) => {
            return response.json();
        })
    }


}