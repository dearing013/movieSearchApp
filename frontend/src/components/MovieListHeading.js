import React,{useContext,useState} from 'react';
import Box from "@mui/material/Box"
import MovieIcon from '@mui/icons-material/Movie';
import AppBar from '@mui/material/AppBar'
import Login from './Login'
import { useNavigate } from 'react-router-dom';

const MovieListHeading = (props) => {

	
    // const [state, setState] = useContext(StoreContext);

	const navigate = useNavigate()


	const viewFavourites = () => {
	
		localStorage.setItem("myFavouritesShown",true)
		props.updateFavouritesShown("True")
	}

	const goToLogin = () => {
		console.log("gotologin")
		navigate("/Login")
	}

	const closeFavourites = () => {
	
		localStorage.setItem("myFavouritesShown",false)
		props.updateFavouritesShown("False")
	
	}


	return (
		<div className='col'>
		  <Box  sx={{
          backgroundColor: "grey",
          borderBottom: `solid 4px`,
          color: "white",
		  width: "500px",
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",
        
        }}
      >
			{props.heading == "Movies" ? <MovieIcon fontSize='large'/> : null }
			<button onClick={goToLogin} >Login</button> 
			{props.heading == "Movies" ? <button onClick={viewFavourites}>Show my Favourite Movies</button> : null}
			{props.heading == "Favourites"? <button onClick={closeFavourites}>Close Favourites</button> : null }
			<h1>{props.heading}</h1>
			</Box>
		</div>
	);
};

export default MovieListHeading;