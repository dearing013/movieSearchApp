import React, {useContext} from "react";
import {
  Stack,
  Link,
  Toolbar,
  Typography,
  Container,
  AppBar,
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
    console.log("test",localStorage.loggedIn)
  }

  const logIn = () => {
    localStorage.setItem("loggedIn",true)
    setState(state => ({ ...state,isLoggedIn: true}));
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
              
                {!state.isLoggedIn ? <button onClick={logIn}>Login</button> : <button onClick={logOff} >Logout</button>}
                {/* <Link

                  to="/Login"
                  // component={NavLink}
                  sx={{
                    color: { xs: "primary", sm: "white" },
                  }}
                >
                  Login
                </Link> */}
            
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavigationBar;