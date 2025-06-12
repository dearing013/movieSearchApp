import React, {useState,useEffect} from "react";
import NavigationBar from "./components/layouts/NavigationBar";
import SearchBox from "./components/SearchBox";
import MovieList from "./components/MovieList";
import AddFavourite from './components/AddToFavorites';
import FavouriteMovies from './components/FavouriteMovies';

function MainPage () {

    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [moviesList,setMoviesList] = useState(false);
    const [favourites,setFavourites] = useState([]);
    const [openModal,setOpenModal] = useState(false);


    const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		console.log(openModal)
		setMoviesList(true)
		saveToLocalStorage(newFavouriteList);
	};

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

    return (
        <div className='container-fluid movie-app'>
            <NavigationBar />
        <div className='row d-flex align-items-center mt-4 mb-4'>
                {/* <MovieListHeading heading='Movies' updateFavouritesShown={setFavouritesShown} /> */}
            
        </div>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
                <div className='row'>
                    <MovieList movies={movies} page={"results"} favourite={AddFavourite} handleFavouriteClick={addFavouriteMovie}/>
                </div>
                <label>Your Favourites</label>
        </div>
    )
}
export default MainPage;