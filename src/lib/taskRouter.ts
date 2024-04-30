import { sendHttpReq } from "./httpHandler";

export default class TaskRouter {
    static getTasks() {
        return sendHttpReq('tasks').then((response) => {
            return response.json();
        });
    }

    static getTaskByName(taskName: string) {
        return sendHttpReq('tasks/search?' + new URLSearchParams({ taskName })).then((response) => {
            return response.json();
        });
    }
}
export interface Task {
    taskName: string;
    taskTime: string;
};

