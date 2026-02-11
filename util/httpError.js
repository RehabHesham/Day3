export const HTTPError =(status, message)=>{
    let error = new Error(message);
    error.status = status;
    return error;
}