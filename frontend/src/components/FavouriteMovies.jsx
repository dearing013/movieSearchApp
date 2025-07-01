import React,{useState,useEffect,useContext} from "react";
import MovieList from './MovieList';
import '../App.css';
import axios from "axios";
import { StoreContext } from "./Stores/AppStore";
import RemoveFavourites from "./RemoveFavourites";
import {SaveMovieToDb} from "./SaveMovieToDb";
import PopUpModal from "./PopUpModal";

function FavouriteMovies (props) {

    const [favouriteMovies,setFavouriteMovies] = useState([]);
    const [description,setDescription] = useState("")
    const [openModal,setOpenModal] = useState(false)
    const [selectedMovieTitle,setSelectedMovieTitle] = useState("");
    const [selectedMovieYear,setSelectedMovieYear] = useState("")
    const [state,setState] = useContext(StoreContext);

    // useEffect(() => {
    //     const movieFavourites = JSON.parse(
    //         localStorage.getItem('react-movie-app-favourites')
    //     );
    //     if (movieFavourites) {
    //         setFavouriteMovies(movieFavourites);
    //     }
    // },[]);
    useEffect(() => {
        console.log("updateddata",props.updates)
        // getAllFavourites()
        setFavouriteMovies(props.updates)
        console.log("compare",props.updates === favouriteMovies)
        getAllFavourites()
      },[props.updates]);

    useEffect(() => {
      console.log("update")
    },[props.theList]);

    useEffect(() => {
        getAllFavourites()
        console.log("test")
    },[])

    // useEffect(() => {
    //     console.log("favouritechanges")
    // },[fa]


    const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
        const movieFavourites = JSON.parse(
            localStorage.getItem('react-movie-app-favourites')
        );
        // if (movieFavourites) {
        //     setFavouriteMovies(movieFavourites);
        // }
	};
    
    const getAllFavourites = async () => {

        try {
            const results = await axios.get(`http://127.0.0.1:8003/movieSearch/movies/getMoviesByUser?userId=${localStorage.userId}`)
                // setFavourites(results.data)
            //need to convert result into proper format for displaying on page
                // console.log("theresults",results)
                var newFavouriteList = [...favouriteMovies,results.data]
                // console.log("newfavour",newFavouriteList)
                setFavouriteMovies(results.data)
                console.log("asnwer",favouriteMovies)
        }

        catch (e) {
            console.log("error retrieving favorite movies")
        }
    }

    const deleteFavouriteMovie = async (title) => {
        const deletedMovie = await axios.get(`http://127.0.0.1:8003/movieSearch/movies/removeMovie?title=${title}`)

        const newFavouriteList = favouriteMovies.filter(
            (favourite) => favourite.Title !== title
        );

        setFavouriteMovies(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
        setDescription("Movie Removed Successfully")
        setOpenModal(true);
    }

    return (
        <>
         <h1>Your Favourite Movies</h1>
         <br></br>
        <div className='image-container d-flex justify-content space-between m-4 '>
            <PopUpModal open={openModal} description={description}  onClose={() => setOpenModal(false)} /> 
            <MovieList movies={favouriteMovies} page={"favourites"} favourite={RemoveFavourites}  removeFavouriteClick={deleteFavouriteMovie}  /> 
        </div>
        </>
    )
}
export default FavouriteMovies;