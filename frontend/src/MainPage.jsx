import React, {useState,useEffect} from "react";
import NavigationBar from "./components/layouts/NavigationBar";
import SearchBox from "./components/SearchBox";
import MovieList from "./components/MovieList";
import AddFavourite from './components/AddToFavorites';
import axios from "axios";
import FavouriteMovies from './components/FavouriteMovies';
import PopUpModal from "./components/PopUpModal";

function MainPage () {

    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [moviesList,setMoviesList] = useState(false);
    const [favourites,setFavourites] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    const [description,setDescription] = useState("");


    const addFavouriteMovie = (movie) => {
        console.log("hello",movie)
		const newFavouriteList = [...favourites, movie];
        console.log("thelist",newFavouriteList)
		setFavourites(newFavouriteList);
		console.log(openModal)
		setMoviesList(true)
		saveToLocalStorage(newFavouriteList);
        setTimeout(() =>  saveFavouriteMovie(movie.imdbID),2000);
        // saveFavouriteMovie(movie.imdbID)
        console.log("Favourite",favourites)
	};

    // const saveToLocalStorage

    const saveFavouriteMovie = (movie) => {
    
        if (localStorage.loggedIn == 'true'){
        const newFavouriteList = [...favourites, movie];
        console.log("thelist",newFavouriteList)
		setFavourites(newFavouriteList);
        // console.log("theid",id)
        console.log("Favorites",favourites)
        const selectedMovie = newFavouriteList.filter(
            (favourite) => favourite.imdbID == movie.imdbID
        )

        console.log("theselected",selectedMovie)

        axios.post(`http://127.0.0.1:8003/movieSearch/movies/saveMovie?title=${selectedMovie[0].Title}&year=${selectedMovie[0].Year}&imdbid=${selectedMovie[0].imdbID}&poster=${selectedMovie[0].Poster}&userId=${localStorage.userId}`,
        {
            headers: {'Accept': 'application/json','Content-Type': 'application/json'}   
        }
        )
        setDescription("Movie Saved Successfully")
        
        setOpenModal(true);
    
        }
        else {
            setDescription("Please login to save movies to favourites")
        
            setOpenModal(true);
        }
        }

    const getMovieRequest = async (searchValue) => {

        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=652f4f1`;

        try {
       
            const response = await fetch(url)
            console.log("help",response)
            const responseJson = await response.json();
    
            if (responseJson.Search != null) {
                console.log("search",responseJson.Search)
                setMovies(responseJson.Search);
            }
        } catch (e) {
            console.log("error",e)
        }
      }

    useEffect(() => {
        getMovieRequest(searchValue);
        console.log("Seachvalue",searchValue)
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
                <div className='image-container d-flex justify-content space-between m-4 '>
                    <PopUpModal open={openModal} description={description}  onClose={() => setOpenModal(false)} /> 
                    <MovieList movies={movies} page={"results"} favourite={AddFavourite} handleFavouriteClick={saveFavouriteMovie}/>
                </div>
                {localStorage.loggedIn == 'true' ?
                // <h1>Your Favourite Movies</h1>
                <FavouriteMovies updates={favourites} /> : null }
        </div>
    )
}
export default MainPage;