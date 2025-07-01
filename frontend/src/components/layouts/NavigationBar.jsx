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
// const pages = [
//   { name: "Products", id: "products" },
//   { name: "Services", id: "services" },
//   { name: "About", id: "about" },
//   { name: "Testimonials", id: "testimonials" },
//   { name: "Contact", id: "contact" },
// ];


const NavigationBar = () => {

  const navigate = useNavigate()
  const [state, setState] = useContext(StoreContext);

  const logOff = () => {
    console.log("logout")
    setState(state => ({ ...state,isLoggedIn: false}));
    localStorage.setItem("loggedIn",false)
    navigate("/")
    console.log("test",localStorage.loggedIn)
  }


  const logIn = () => {
    setState(state => ({ ...state,isLoggedIn: true}));
    console.log("help",state)
    navigate("/Login")
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
            <Typography variant="h6">Movie Search</Typography>
            <Stack direction="row" gap={3}>
              
                {window.location.pathname != "/Login" && localStorage.loggedIn == 'false' ? <Button sx={{marginRight:"15px",
                    fontSize: 14.5,
                    backgroundColor: "black", 
                    color: "white",
                    "&:hover": {
                      backgroundColor: "grey",
                    }
                    }} onClick={logIn}>Login</Button> : window.location.pathname != "/Login" && localStorage.loggedIn == 'true' ? <Button sx={{ 
                    marginRight:"15px",
                    fontSize: 14.5,
                    backgroundColor: "black", 
                    color: "white",
                    "&:hover": {
                      backgroundColor: "grey",
                    }
                    
                  }} onClick={logOff} >Logout</Button> : null }
  
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavigationBar;