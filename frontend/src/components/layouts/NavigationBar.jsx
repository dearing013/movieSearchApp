import React, {useContext, useEffect} from "react";
import {
  Stack,
  Link,
  Toolbar,
  Typography,
  Container,
  AppBar,
  Button
} from "@mui/material";
import Login from "../Login";
import { NavLink,useNavigate } from "react-router-dom";
import { StoreContext } from "../Stores/ContextStore";
import { useDispatch } from 'react-redux';
import {logout } from '../Stores/authSlice';
import { useSelector } from "react-redux";

  
// const pages = [
//   { name: "Products", id: "products" },
//   { name: "Services", id: "services" },
//   { name: "About", id: "about" },
//   { name: "Testimonials", id: "testimonials" },
//   { name: "Contact", id: "contact" },
// ];


const NavigationBar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [state, setState] = useContext(StoreContext);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logOff = () => {
    console.log("logout")
    setState(state => ({ ...state,isLoggedIn: false}));
    dispatch(logout());
    localStorage.setItem("loggedIn",false)
    navigate("/")
    console.log("test",localStorage.loggedIn)
  }


  const logIn = () => {
    setState(state => ({ ...state,isLoggedIn: true}));
    console.log("help",state)
    navigate("/Login")
  }

  const navigateToHome  = () => {

    navigate("/")
    setState(state => ({}))

  }

  return (
    <AppBar>
      <Container>
        <Toolbar>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography variant="h6">Movie and TV Search</Typography>
            <Stack direction="row" gap={3}>
              {!isLoggedIn && window.location.hash != "#/Login" ? 
                 <Button sx={{marginRight:"15px",
                    fontSize: 14.5,
                    backgroundColor: "black", 
                    color: "white",
                    "&:hover": {
                      backgroundColor: "grey",
                    }
                    }} onClick={logIn}>Login</Button>  
                    : isLoggedIn ?  <Button sx={{ 
                    marginRight:"15px",
                    fontSize: 14.5,
                    backgroundColor: "black", 
                    color: "white",
                    "&:hover": {
                      backgroundColor: "grey",
                    }
                    
                  }} onClick={logOff} >Logout</Button>  : null }

                  {!isLoggedIn && window.location.hash != "#/" ?
                    <Button sx={{
                    marginRight:"17px",
                    fontSize: 16.5,
                    backgroundColor: "black", 
                    color: "white",
                    "&:hover": {
                      backgroundColor: "grey",
                    }
                   }} onClick={navigateToHome}>Go Home</Button> : null }
                   
                 
            </Stack>
          </Stack>
          <br></br>{isLoggedIn ? <Typography>Welcome {localStorage.userName} </Typography> : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavigationBar;