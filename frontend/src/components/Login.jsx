import axios from "axios";
import React, { useState } from "react"
import PopUpModal from '../components/PopUpModal';
import { useNavigate } from "react-router-dom";
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch } from 'react-redux';
import {login} from "./Stores/authSlice";


function Login () {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [email,setEmail] = useState("");
    const [description,setDescription] = useState("");
    const [password,setPassword] = useState("")
    const [emailError,setEmailError] = useState("");
    const [openModal,setOpenModal] = useState(false);

    
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    const loginUser = async () => {

        try {
            const res = await axios.post("http://127.0.0.1:8003/movieSearch/users/login",   
            JSON.stringify({email,password}),
            {
                headers: {'Accept': 'application/json','Content-Type': 'application/json'},   
            })
            console.log(res.data[0])
            dispatch(login({ user: res.data[0] }));
            localStorage.setItem("loggedIn",true)
            localStorage.setItem("userName",res.data[0].username)
            console.log("Thres",res.data[0].id)
            localStorage.setItem("userId",res.data[0].id)
            navigate("/")
            console.log("thesresult",res)
        }
        catch (ex) {
            console.log("login failed",ex)
            if (!ex?.response) {
                console.log("No Server Response");
              } else if (ex.response?.status === 400) {
                setEmailError("invalid email or password")
                // setDescription("Invalid credentials.  Please try again")
                console.log("invalid Email or Password");
              }
        }
    }

    const logOutUser = async () => {
        console.log("logout")

        axios.post("/logout")
        navigate("/home")
    }

    const goToRegister = async () => {
        navigate("/register")
    }
  
    return(
        <div style={{marginTop: "70px"}}>
             {/* <form onSubmit={loginUser}> */}
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     {/* <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar> */}
                    <h2>Sign In</h2>
                </Grid>
                 <label>Email</label>
             <input  onChange={(e) => setEmail(e.target.value)} type="text" style={{width: "250px"}}></input>
            <label>password</label>
            <input  onChange={(e) => setPassword(e.target.value)} type="password" style={{width: "250px"}} ></input>
                {/* <TextField label='Username' placeholder='Enter username' variant="outlined" fullWidth required/>
                <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required/> */}
                {/* <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 /> */}
                 <br>
                 </br>
                <br></br>
                  <button onClick={loginUser}>Login</button>
                  <br></br>
                  <br></br>
                {/* <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button> */}
                <Typography > 
                     {/* <Link href="#" >
                        Sign Up 
                </Link> */}
                <button onClick={goToRegister}>Don't have an account? Sign Up</button>
                </Typography>
            </Paper>
        </Grid>
        {/* </form> */}
            </div>
    
    )
}
export default Login;