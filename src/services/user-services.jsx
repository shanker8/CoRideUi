import { myAxios } from "./env";

const signUp=(user)=>{
    return myAxios
    .post("/api/register")
    .then((response) => response.json());
}