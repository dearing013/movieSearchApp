import React, { useState, useEffect,useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import axios from "axios";
import {SaveMovieToDb} from "./components/SaveMovieToDb";
import RemoveFavourites from './components/RemoveFavourites';
import { StoreContext } from "../src/components/Stores/AppStore";
import AddFavourite from './components/AddToFavorites';
import FavouriteMovies from './components/FavouriteMovies';
import PopUpModal from './components/PopUpModal';

const App = () => {
  
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favouritesShown,setFavouritesShown] = useState("")
  const [favourites,setFavourites] = useState([])
  const [description,setDescription] = useState("")
  const [openModal,setOpenModal] = useState(false)
  const [movieTitle,setMovieTitle] = useState("")
  const [moviesList,setMoviesList] = useState(false)
  const [state,setState] = useContext(StoreContext)


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

  const getMovieRequest = async (searchValue) => {

    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=652f4f1`;
   
		const response = await fetch(url)
		console.log("help",response)
		const responseJson = await response.json();

		if (responseJson.Search != null) {
			console.log("search",responseJson.Search)
			setMovies(responseJson.Search);
		}
  }

  useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

  

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
      <div className='row d-flex align-items-center mt-4 mb-4'>
			<MovieListHeading heading='Movies' updateFavouritesShown={setFavouritesShown} />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
			<div className='row'>
        		<MovieList movies={movies} page={"results"} favourite={AddFavourite} handleFavouriteClick={addFavouriteMovie}/>
        	</div>
		{/* {localStorage.myFavouritesShown == "true" ? */}
		{/* <div> */}
        {/* <div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' updateFavouritesShown={setFavouritesShown}/>
				
		</div> */}
		<div className='row'>
			<PopUpModal open={openModal} description={description}  onClose={() => setOpenModal(false)} /> 
			{/* <MovieList movies={favourites} page={"favourites"} favourite={RemoveFavourites} saveMovie={SaveMovieToDb} removeFavouriteClick={deleteFavouriteMovie} handleFavouriteClick={saveFavouriteMovie} /> */}
			{/* <FavouriteMovies theList={moviesList} /> */}
		</div>
		{/* </div> */}
		{/* : null } */}
			</div>
	);
};

export default App;