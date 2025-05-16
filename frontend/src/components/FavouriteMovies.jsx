import React,{useState,useEffect,useContext} from "react";
import MovieList from './MovieList';
import '../App.css';
import axios from "axios";
import { StoreContext } from "./Stores/AppStore";
import RemoveFavourites from "./RemoveFavourites";
import {SaveMovieToDb} from "./SaveMovieToDb";
import PopUpModal from "./PopUpModal";

function FavouriteMovies (props) {

    const [favourites,setFavourites] = useState([]);
    const [description,setDescription] = useState("")
    const [openModal,setOpenModal] = useState(false)
    const [selectedMovieTitle,setSelectedMovieTitle] = useState("");
    const [selectedMovieYear,setSelectedMovieYear] = useState("")
    const [state,setState] = useContext(StoreContext);

    useEffect(() => {
        const movieFavourites = JSON.parse(
            localStorage.getItem('react-movie-app-favourites')
        );
        if (movieFavourites) {
            setFavourites(movieFavourites);
        }
    },[]);

    useEffect(() => {
      console.log("update")
    },[props.theList]);


    const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
        const movieFavourites = JSON.parse(
            localStorage.getItem('react-movie-app-favourites')
        );
        if (movieFavourites) {
            setFavourites(movieFavourites);
        }
	};

    const getAllFavourites = async () => {

        const results = await axios.get("http://127.0.0.1:8003/movieSearch/movies/getAllFavouriteMovies")

        console.log(results)
    }


    const saveFavouriteMovie = (id) => {
 
        const selectedMovie = favourites.filter(
            (favourite) => favourite.imdbID == id
        )
        setSelectedMovieTitle(selectedMovie[0].Title)
        setSelectedMovieYear(selectedMovie[0].Year)
        console.log("selected",selectedMovieTitle)
    

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
        <div className='image-container d-flex '>
            {/* <button onClick={getAllFavourites}>Get All Favourites</button> */}
            <PopUpModal open={openModal} description={description}  onClose={() => setOpenModal(false)} /> 
            {/* <MovieList movies={favourites} page={"favourites"} favourite={RemoveFavourites} saveMovie={SaveMovieToDb} removeFavouriteClick={deleteFavouriteMovie} handleFavouriteClick={saveFavouriteMovie} /> */}
        </div>
    )
}
export default FavouriteMovies;