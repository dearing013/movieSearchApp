import axios from "axios";
import {useState} from "react"
import {useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";

function Register () {

    const navigate = useNavigate()

    const [username,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [errorMessage,setErrorMessage] = useState("")
    const paperStyle={padding :55,height:'70vh',width:280, margin:"20px auto"}
    const API_URL = process.env.REACT_APP_API_URL;

    const registerUser = async () => {
        try {
            await axios.post(`${API_URL}/movieSearch/users/register`, 
            JSON.stringify({username,email,password}),
            {
                headers: {'Accept': 'application/json','Content-Type': 'application/json'},   
            })
            navigate("/Login")
        } 
        catch(ex) {
            console.log("error registering for an account")
        }
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
        <div style={{marginTop: "90px"}}>

              <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <h2>Register</h2>
                </Grid>
                 <label>UserName</label>
                <input onChange={handleUserNameChange} type="text"></input>
                
              <label>Email</label>
              <input onChange={(e) => setEmail(e.target.value)} type="text"></input>
             {/* <input  onChange={(e) => setEmail(e.target.value)} type="text" style={{width: "250px"}}></input> */}
            {/* <input  onChange={(e) => setPassword(e.target.value)} type="password" style={{width: "250px"}} ></input> */}
              <label>password</label><input onChange={(e) => setPassword(e.target.value)} type="text"></input>
            <label>Confirm Password</label><input type="text"></input>
     
            {errorMessage}
          <button onClick={registerUser}>Register</button>
        </Paper>
         </Grid>
    
    </div>

    )
}
export default Register;