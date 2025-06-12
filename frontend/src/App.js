import React, { useState, useEffect,useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter,Navigate, Route, Routes } from "react-router-dom"
import axios from "axios";
import {SaveMovieToDb} from "./components/SaveMovieToDb";
import RemoveFavourites from './components/RemoveFavourites';
import { StoreContext } from "../src/components/Stores/AppStore";
import AddFavourite from './components/AddToFavorites';
import FavouriteMovies from './components/FavouriteMovies';
import Login from './components/Login';
import PopUpModal from './components/PopUpModal';
import Register from './components/Register';
import NavigationBar from './components/layouts/NavigationBar';
import MainPage from './MainPage';

const App = () => {
  
  const [movies, setMovies] = useState([]);;
  const [favouritesShown,setFavouritesShown] = useState("")
  const [favourites,setFavourites] = useState([])
  const [description,setDescription] = useState("")
  const [openModal,setOpenModal] = useState(false)
  const [movieTitle,setMovieTitle] = useState("")
  const [moviesList,setMoviesList] = useState(false)
  const [state,setState] = useContext(StoreContext)

  
  const [isAuthenticated, setIsAuthenticated] = useState(
	() => JSON.parse(localStorage.getItem('loggedIn')) 
);


  const getMovieTitle = async (title) => {
	console.log("thetitle",title)

	const res = await axios.post(`http://127.0.0.1:8003/movieSearch/movies/listmovie?searchedMovie=${title}`,
	{
		headers: {'Accept': 'application/json','Content-Type': 'application/json'},   
	}
	);
	setMovieTitle(res["data"])
	console.log("returned",res["data"])
  }

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	// useEffect (() => {
	// 	console.log("storagechanged")
	// },[localStorage])

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		console.log(openModal)
		setMoviesList(true)
		saveToLocalStorage(newFavouriteList);
	};

	const filterMovieByYearRange = (start_year,end_year) => {
		axios.get(`http://127.0.0.1:8003/movieSearch/movies/getMoviesByRange?start_year=${start_year}&end_year=${end_year}`)
	
	}
	
    const saveFavouriteMovie = (id) => {
 
        const selectedMovie = favourites.filter(
            (favourite) => favourite.imdbID == id
        )


        axios.post(`http://127.0.0.1:8003/movieSearch/movies/saveMovie?title=${selectedMovie[0].Title}&year=${selectedMovie[0].Year}`,
        {
            headers: {'Accept': 'application/json','Content-Type': 'application/json'}   
        }
        )
        setDescription("Movie Saved Successfully")
        setOpenModal(true);
    }

    const deleteFavouriteMovie = async (title) => {
        const deletedMovie = await axios.get(`http://127.0.0.1:8003/movieSearch/movies/removeMovie?title=${title}`)

        const newFavouriteList = favourites.filter(
            (favourite) => favourite.Title !== title
        );

        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
        setDescription("Movie Removed Successfully")
        setOpenModal(true);
    }


	
	return (
	  <div className='container-fluid movie-app'>
		<NavigationBar />
      <div className='row d-flex align-items-center mt-4 mb-4'>
			{/* <MovieListHeading heading='Movies' updateFavouritesShown={setFavouritesShown} /> */}
        
      </div>
		<Routes>
			<Route path='/Login' element={<Login />} />
			<Route path='/Register' element={<Register />} />
			<Route path='/' element={<MainPage />} />
		</Routes>
		{/* </BrowserRouter>  */}
		{/* {localStorage.myFavouritesShown == "true" ? */}
		{/* <div> */}
        {/* <div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' updateFavouritesShown={setFavouritesShown}/>
				
		</div> */}
		{/* <div className='row'>
			<PopUpModal open={openModal} description={description}  onClose={() => setOpenModal(false)} /> 
			{/* <MovieList movies={favourites} page={"favourites"} favourite={RemoveFavourites} saveMovie={SaveMovieToDb} removeFavouriteClick={deleteFavouriteMovie} handleFavouriteClick={saveFavouriteMovie} /> */}
			{/* <FavouriteMovies theList={moviesList} /> */}
		{/* </div>  */}
		{/* </div> */}
		{/* : null } */}
			</div>
	);
};

export default App;