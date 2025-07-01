import axios from "axios";
import React,{useState} from "react"
import { Navigate, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Container from '@mui/material/Container';

function Register () {

    const navigate = useNavigate()

    const [username,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");


    
const useStyles = makeStyles(theme => ({
    // "@global": {
    //   body: {
    //     backgroundColor: theme.palette.common.white
    //   }
    // },
    paper: {
    //   marginTop: "200px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    // avatar: {
    // //   margin: theme.spacing(1),
    //   backgroundColor: theme.palette.secondary.main
    // },
    form: {
      width: "100%", // Fix IE 11 issue.
    //   marginTop: theme.spacing(3)
    },
    // submit: {
    //   margin: theme.spacing(3, 0, 2)
    // }
  }));

  const classes = useStyles();

    const registerUser = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:8003/movieSearch/users/register", 
            JSON.stringify({username,email,password}),
            {
                headers: {'Accept': 'application/json','Content-Type': 'application/json'},   
            })
            navigate("/Login")
            console.log("successfully registered")
        } 
        catch(ex) {
            console.log("error registering account")
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
        <Container component="main" maxWidth="xs">
            <CssBaseline />
        {/* <div style={{marginTop: "200px",display: "flex",flexDirection: "column"}}> */}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <label>Username</label><input onChange={(e) => setUserName(e.target.value)} type="text"></input>
        
            {/* <div style={{marginLeft: "200px"}}> */}
            <label>Email</label><input onChange={(e) => setEmail(e.target.value)} type="text"></input>
            {/* </div> */}
            
            <label>password</label><input onChange={(e) => setPassword(e.target.value)} type="text"></input>
            <label>Confirm Password</label><input type="text"></input>
            <button onClick={registerUser}>Register</button>

        {/* </div> */}
        </Grid>
          </Grid>
        </form>
        </Container>
    
    )
}
export default Register;