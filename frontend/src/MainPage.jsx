import {useState,useEffect} from "react";
import NavigationBar from "./components/layouts/NavigationBar";
import SearchBox from "./components/SearchBox";
import MovieList from "./components/MovieList";
import AddFavourite from './components/AddToFavorites';
import axios from "axios";
import FavouriteMovies from './components/FavouriteMovies';
import { useDispatch, useSelector } from "react-redux";
import {axiosInstance} from "./customAxiosInterceptor"
import { addFavourite } from "./components/Stores/authSlice";
import { openModal } from "./components/Stores/modalSlice";
import { api } from "./components/api/apiMethods";

function MainPage () {

    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [favourites,setFavourites] = useState([]);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    
    const API_URL = process.env.REACT_APP_API_URL;
    const OMDB_URL = process.env.REACT_APP_OMDB_URL;

    const dispatch = useDispatch()

    const saveFavouriteMovie = async (movie) => {
    
        if (isLoggedIn){

        try {
            dispatch(addFavourite(movie));
        } catch (err) {
            console.error("dispatch addFavourite error", err);
        }

         // ensure favourites is an array
        const currentFavourites = Array.isArray(favourites) ? favourites : [];

        // avoid duplicates
        const exists = currentFavourites.some(
            (f) =>
                (f?.imdbID ?? f?.id ?? f?.Title ?? f?.title) ===
                (movie?.imdbID ?? movie?.id ?? movie?.Title ?? movie?.title)
        );
        const newFavouriteList = exists ? currentFavourites : [...currentFavourites, movie];

        if (!exists) {
            setFavourites(newFavouriteList);
            saveToLocalStorage(newFavouriteList);
        }

        
         // find the saved movie object (not an array)
        const selectedMovie =
            newFavouriteList.find(
                (f) =>
                    (f?.imdbID ?? f?.id ?? f?.Title ?? f?.title) ===
                    (movie?.imdbID ?? movie?.id ?? movie?.Title ?? movie?.title)
            ) || movie;

            // safe Year handling
            const yearRaw = (selectedMovie?.Year ?? selectedMovie?.year ?? "").toString();
            const normalized = yearRaw.replace(/[–—]/g, "-");
            let [startYearStr, endYearStr] = normalized.split("-").map((s) => (s || "").trim());
            let startYear = parseInt(startYearStr, 10);
            let endYear = parseInt(endYearStr, 10);
            if (Number.isNaN(startYear)) startYear = undefined;
            if (Number.isNaN(endYear) || !endYear) endYear = startYear;

            const title = selectedMovie?.Title ?? selectedMovie?.title ?? "";
            const imdbid = selectedMovie?.imdbID ?? selectedMovie?.id ?? "";
            const poster = selectedMovie?.Poster ?? selectedMovie?.poster ?? "";


            try {
             const res = await api.post(`/movieSearch/movies/saveMovie?title=${encodeURIComponent(title)}&startYear=${startYear}&endYear=${endYear}&imdbid=${imdbid}&poster=${poster}&userId=${localStorage.userId}`,
                {
                    headers: {'Accept': 'application/json','Content-Type': 'application/json'}   
                }
            )

            if (res === "movie already in favorites"){
                dispatch(openModal({description:"Unable to save. Movie already in favourites",color: "red"}))   
            }
            else {
                dispatch(openModal({ description: "Movie Added Successfully",color:"green"}))   
            }
            }
        catch (ex){
            console.log("error saving movie",ex)
        }
    
        }
        else {
            dispatch(openModal({description:"Please login to save movies to favourites",color: "red"}))   
        }
    }

    const getMovieRequest = async (searchValue) => {

        const url = `${OMDB_URL}/?s=${searchValue}&apikey=652f4f1`;

        try {
       
            const response = await fetch(url)
            const responseJson = await response.json();
    
            if (responseJson.Search != null) {
                setMovies(responseJson.Search);
            }
        } catch (e) {
            console.log("error",e)
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
        
        <div className='row d-flex align-items-center mt-4 mb-4'>
              <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} placeholder="Search for a movie or tv show" />
        </div>
    
        
                    <MovieList movies={movies} page={"results"} favourite={AddFavourite} handleFavouriteClick={saveFavouriteMovie}/>
    
        </div>
    )
}
export default MainPage;