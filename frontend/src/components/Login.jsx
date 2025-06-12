import axios from "axios";
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

function Login () {

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")

    const loginUser = () => {

        try {
            axios.post("http://127.0.0.1:8003/movieSearch/users/login",   
            JSON.stringify({email,password}),
            {
                headers: {'Accept': 'application/json','Content-Type': 'application/json'},   
            })
            navigate("/")
            localStorage.setItem("loggedIn",true)
        }
        catch (ex) {
            console.log("login failed")
            if (!ex?.response) {
                console.log("No Server Response");
              } else if (ex.response?.status === 400) {
                console.log("invalid Email or Password");
              }
        }
    }

    return (
        <div style={{marginTop:"140px"}}>
            <label>Email</label>
            <input  onChange={(e) => setEmail(e.target.value)} type="text"></input>
            <label>password</label>
            <input  onChange={(e) => setPassword(e.target.value)} type="text"></input>
            <button onClick={loginUser}>Login</button>
            <p style={{marginLeft: "550px"}}>
                        Dont have an acccount ?<button onClick={() => navigate("/Register")} style={{border:"none",color: "orange",background:"transparent"}} > Create Account</button>
                </p>
        </div>
    
    )
}
export default Login;