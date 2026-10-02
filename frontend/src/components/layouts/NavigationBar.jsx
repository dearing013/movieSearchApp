import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import LoginIcon from "@mui/icons-material/Login";
import GradeIcon from '@mui/icons-material/Grade';
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {logout } from '../Stores/authSlice';
// import { useSelector } from "react-redux";

  
// const pages = [
//   { name: "Products", id: "products" },
//   { name: "Services", id: "services" },
//   { name: "About", id: "about" },
//   { name: "Testimonials", id: "testimonials" },
//   { name: "Contact", id: "contact" },
// ];


// const NavigationBar = () => {

//   const navigate = useNavigate()
//   const dispatch = useDispatch();
//   const [state, setState] = useContext(StoreContext);
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   // const isLoggedIn = localStorage.getItem("loggedIn")
//   console.log('isloggedin', isLoggedIn)
//   const logOff = () => {
//     console.log("logout")
//     setState(state => ({ ...state,isLoggedIn: false}));
//     dispatch(logout());
//     localStorage.setItem("loggedIn",false)
//     localStorage.removeItem("authToken")
//     localStorage.removeItem("refresh_token")
//     navigate("/")
//     console.log("test",localStorage.loggedIn)
//   }


//   const logIn = () => {
//     setState(state => ({ ...state,isLoggedIn: true}));
//     console.log("help",state)
//     navigate("/Login")
//   }

//   const navigateToHome  = () => {

//     navigate("/")
//     setState(state => ({}))

//   }

//   const navigateToReports = () => {
//     navigate("/Reports")
//   }

//   return (
//     <AppBar>
//       <Container>
//         <Toolbar>
//           <Stack
//             direction="row"
//             justifyContent="space-between"
//             alignItems="center"
//             width="100%"
//           >
//             <Typography variant="h6">Movie and TV Search</Typography>
//             <Stack direction="row" gap={3}>
//               {!isLoggedIn && window.location.hash != "#/Login" ? 
//                  <Button sx={{marginRight:"15px",
//                     fontSize: 14.5,
//                     backgroundColor: "black", 
//                     color: "white",
//                     "&:hover": {
//                       backgroundColor: "grey",
//                     }
//                     }} onClick={logIn}>Login</Button>  
//                     : isLoggedIn ?  <Button sx={{ 
//                     marginRight:"15px",
//                     fontSize: 14.5,
//                     backgroundColor: "black", 
//                     color: "white",
//                     "&:hover": {
//                       backgroundColor: "grey",
//                     }
                    
//                   }} onClick={logOff} >Logout</Button>  : null }

//                   {window.location.hash != "#/" ?
//                     <Button sx={{
//                     marginRight:"17px",
//                     fontSize: 16.5,
//                     backgroundColor: "black", 
//                     color: "white",
//                     "&:hover": {
//                       backgroundColor: "grey",
//                     }
//                    }} onClick={navigateToHome}>Go Home</Button> : null }
//                   {isLoggedIn ? <Button   
//                    sx={{marginRight:"17px",
//                     fontSize: 16.5,
//                     backgroundColor: "black", 
//                     color: "white",
//                     "&:hover": {
//                       backgroundColor: "grey",}}
//                     } onClick={navigateToReports}>Reports</Button> : null}
                 
//             </Stack>
//           </Stack>
//           <br></br>{isLoggedIn ? <Typography>Welcome {localStorage.userName} </Typography> : null}
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };
// export default NavigationBar;


const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // read from auth slice, fallback to localStorage for initial hydration
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn ?? (localStorage.getItem("loggedIn") === "true"));

  // avatar menu state
  const [anchorEl, setAnchorEl] = useState(null);

  const menuOpen = Boolean(anchorEl);

  const userName = localStorage.getItem("userName") || "";


    const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleAvatarClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const goHome = () => {
    navigate("/");
    handleMenuClose();
  };

  const goReports = () => {
    navigate("/Reports");
    handleMenuClose();
  };

  const goToFavourites = () => {
    navigate("/Favourites");
    
  }

  const handleLogin = () => {
    navigate("/Login");
    handleMenuClose();
  };

    const handleLogout = () => {
    dispatch(logout());
    localStorage.setItem("loggedIn", false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("refresh_token");
    navigate("/");
    handleMenuClose();
  };

  return (
    <AppBar position="sticky" color="grey" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2}}>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 2, cursor: "pointer" }}
            onClick={goHome}
            aria-label="Go home"
          >
            <HomeIcon fontSize="large" sx={{ color: "text.primary" }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
              Movie & TV Search
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isLoggedIn && (

              <div>
              <Tooltip title="Favourte Movies / Shows">
                <IconButton color="inherit" onClick={goToFavourites} aria-label="Favourites">
                  <GradeIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Reports">
                <IconButton color="inherit" onClick={goReports} aria-label="Reports">
                  <BarChartIcon />
                </IconButton>
              </Tooltip>
              </div>
            )}

            {!isLoggedIn ? (
              <Button
                variant="contained"
                color="primary"
                startIcon={<LoginIcon />}
                onClick={handleLogin}
                sx={{ textTransform: "none", borderRadius: 2 }}
              >
                Login
              </Button>
            ) : (
   <>
                <Tooltip title={`Welcome ${userName || "User"}`}>
                  <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: "primary.main" }}>{initials || "U"}</Avatar>
                  </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose} keepMounted>
                  <MenuItem onClick={goHome}>Home</MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;