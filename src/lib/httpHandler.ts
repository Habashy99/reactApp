export function sendHttpReq(url: string, method: string = "GET", data?: Object) {

    let userToken = localStorage.getItem("token") || "";

    return fetch(`http://localhost:8050/${url}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": userToken,
        },
        body: JSON.stringify(data)
    })
}