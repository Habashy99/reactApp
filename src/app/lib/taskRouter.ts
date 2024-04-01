export default class TaskRouter {
    static getTasks() {
        return fetch(`http://localhost:8050/tasks`, { cache: 'no-store' }).then((response) => {
            return response.json();
        });
    }
}

