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
    const paperStyle={padding :55,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    const API_URL = process.env.REACT_APP_API_URL;





    
// const useStyles = makeStyles(theme => ({
//     // "@global": {
//     //   body: {
//     //     backgroundColor: theme.palette.common.white
//     //   }
//     // },
//     paper: {
//     //   marginTop: "200px",
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center"
//     },
//     // avatar: {
//     // //   margin: theme.spacing(1),
//     //   backgroundColor: theme.palette.secondary.main
//     // },
//     form: {
//       width: "100%", // Fix IE 11 issue.
//     //   marginTop: theme.spacing(3)
//     },
//     // submit: {
//     //   margin: theme.spacing(3, 0, 2)
//     // }
//   }));

//   const classes = useStyles();

    const registerUser = async () => {
        try {
            console.log("isthiscalled")
            const res = await axios.post(`${API_URL}/movieSearch/users/register`, 
            JSON.stringify({username,email,password}),
            {
                headers: {'Accept': 'application/json','Content-Type': 'application/json'},   
            })
            navigate("/Login")
            console.log("successfully registered")
        } 
        catch(ex) {
            console.log("error registering for an account")
        }
    }

    const handleUserNameChange = (e) => {
        console.log("theusername",e.target.value)
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
     
        
          <button onClick={registerUser}>Register</button>
        </Paper>
         </Grid>
    
    </div>




  

   
  
    // return(
    //     <div style={{marginTop: "70px"}}>
    //          {/* <form onSubmit={loginUser}> */}
    //     <Grid>
    //         <Paper elevation={10} style={paperStyle}>
    //             <Grid align='center'>
    //                  {/* <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar> */}
    //                 <h2>Sign In</h2>
    //             </Grid>
    //              <label>Email</label>
    //          <input  onChange={(e) => setEmail(e.target.value)} type="text" style={{width: "250px"}}></input>
    //         <label>password</label>
    //         <input  onChange={(e) => setPassword(e.target.value)} type="password" style={{width: "250px"}} ></input>
    //             {/* <TextField label='Username' placeholder='Enter username' variant="outlined" fullWidth required/>
    //             <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required/> */}
    //             {/* <FormControlLabel
    //                 control={
    //                 <Checkbox
    //                     name="checkedB"
    //                     color="primary"
    //                 />
    //                 }
    //                 label="Remember me"
    //              /> */}
    //              <br>
    //              </br>
    //             <br></br>
    //               <button onClick={loginUser}>Login</button>
    //               <br></br>
    //               <br></br>
    //             {/* <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button> */}
    //             <Typography > 
    //                  {/* <Link href="#" >
    //                     Sign Up 
    //             </Link> */}
    //             <button onClick={goToRegister}>Don't have an account? Sign Up</button>
    //             </Typography>
    //         </Paper>
    //     </Grid>
   
            // </div>

    )
}
export default Register;