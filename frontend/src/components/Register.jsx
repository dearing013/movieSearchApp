import axios from "axios";
import React,{useState} from "react"
import { Navigate, useNavigate } from "react-router-dom";

function Register () {

    const navigate = useNavigate()

    const [username,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");

    const registerUser = () => {
        axios.post("http://127.0.0.1:8003/movieSearch/users/register", 
        JSON.stringify({username,email,password}),
        {
            headers: {'Accept': 'application/json','Content-Type': 'application/json'},   
        })
        navigate("/Login")
        console.log("successfully registered")
    }

    const handleUserNameChange = (e) => {
        setUserName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div style={{marginTop: "200px",display: "flex",flexDirection: "column"}}>
            <label>Username</label><input onChange={(e) => setUserName(e.target.value)} type="text"></input>
            <label>Email</label><input onChange={(e) => setEmail(e.target.value)} type="text"></input>
            <label>password</label><input onChange={(e) => setPassword(e.target.value)} type="text"></input>
            <label>Confirm Password</label><input type="text"></input>
            <button onClick={registerUser}>Register</button>

        </div>
    
    )
}
export default Register;