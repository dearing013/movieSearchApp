import axios from "axios";
import React, { useState } from "react"
import PopUpModal from '../components/PopUpModal';
import { useNavigate } from "react-router-dom";

function Login () {

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [description,setDescription] = useState("");
    const [password,setPassword] = useState("")
    const [emailError,setEmailError] = useState("");
    const [openModal,setOpenModal] = useState(false);

    const loginUser = async () => {

        try {
            const res = await axios.post("http://127.0.0.1:8003/movieSearch/users/login",   
            JSON.stringify({email,password}),
            {
                headers: {'Accept': 'application/json','Content-Type': 'application/json'},   
            })
            navigate("/")
            localStorage.setItem("loggedIn",true)
            console.log("Thres",res.data[0].id)
            localStorage.setItem("userId",res.data[0].id)
            console.log("thesresult",res)
        }
        catch (ex) {
            console.log("login failed")
            if (!ex?.response) {
                console.log("No Server Response");
              } else if (ex.response?.status === 400) {
                setEmailError("invalid email or password")
                // setDescription("Invalid credentials.  Please try again")
                console.log("invalid Email or Password");
              }
        }
    }

    return (
        <>
             <PopUpModal open={openModal} description={description}  onClose={() => setOpenModal(false)} /> 

        <div style={{display:"flex",flexDirection: "column",marginTop:"140px"}}>
            <div style={{marginLeft: "500px"}}>
            {emailError && <p style={{color: "red"}}>{emailError}</p>} 
            <label>Email</label>
            <input  onChange={(e) => setEmail(e.target.value)} type="text" style={{width: "250px"}}></input>
            <label>password</label>
            <input  onChange={(e) => setPassword(e.target.value)} type="password" style={{width: "250px"}} ></input>
            <button onClick={loginUser}>Login</button>
            </div>
       
            <p style={{marginLeft: "550px"}}>
                        Dont have an acccount ?<button onClick={() => navigate("/Register")} style={{border:"none",color: "orange",background:"transparent"}} > Create Account</button>
                </p>
        </div>
        </>
    
    )
}
export default Login;