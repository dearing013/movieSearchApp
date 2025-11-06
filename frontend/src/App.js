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


//   const getMovieTitle = async (title) => {
// 	console.log("thetitle",title)

// 	const res = await axios.post(`http://127.0.0.1:8003/movieSearch/movies/listmovie?searchedMovie=${title}`,
// 	{
// 		headers: {'Accept': 'application/json','Content-Type': 'application/json'},   
// 	}
// 	);
// 	setMovieTitle(res["data"])
// 	console.log("returned",res["data"])
//   }

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	// const filterMovieByYearRange = (start_year,end_year) => {
	// 	axios.get(`http://127.0.0.1:8003/movieSearch/movies/getMoviesByRange?start_year=${start_year}&end_year=${end_year}`)
	
	// }
	
	
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
			</div>
	);
};

export default App;