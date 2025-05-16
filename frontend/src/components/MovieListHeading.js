import React,{useContext,useState} from 'react';
import Box from "@mui/material/Box"
import MovieIcon from '@mui/icons-material/Movie';

const MovieListHeading = (props) => {

	
    // const [state, setState] = useContext(StoreContext);


	const viewFavourites = () => {
	
		localStorage.setItem("myFavouritesShown",true)
		props.updateFavouritesShown("True")
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
			{props.heading == "Movies" ? <button onClick={viewFavourites}>Show my Favourite Movies</button> : null}
			{props.heading == "Favourites"? <button onClick={closeFavourites}>Close Favourites</button> : null }
			<h1>{props.heading}</h1>
			</Box>
		</div>
	);
};

export default MovieListHeading;