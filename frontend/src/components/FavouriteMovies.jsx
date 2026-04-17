import {useState,useEffect} from "react";
import MovieList from './MovieList';
import '../App.css';
import axios from "axios";
import RemoveFavourites from "./RemoveFavourites";
import PopUpModal from "./PopUpModal";

function FavouriteMovies (props) {

    const [favouriteMovies,setFavouriteMovies] = useState([]);
    const [textColor,setTextColor] = useState("")
    const [description,setDescription] = useState("")
    const [openModal,setOpenModal] = useState(false)

    const API_URL = process.env.REACT_APP_API_URL;


    useEffect(() => {
             const movieFavourites = JSON.parse(
            localStorage.getItem('react-movie-app-favourites')
        );
        if (movieFavourites) {
            setFavouriteMovies(movieFavourites);
        }
        setTimeout(() => getAllFavourites(),2000)
      },[props.updates]);

    useEffect(() => {
        getAllFavourites()
    },[])
    

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
            const results = await axios.get(`${API_URL}/movieSearch/movies/getMoviesByUser?userId=${localStorage.userId}`)
            console.log("theresults",results.data)
       
            setFavouriteMovies(results.data)
            console.log("asnwer",favouriteMovies)
        }

        catch (e) {
            console.log("error retrieving favorite movies")
        }
    }

    const deleteFavouriteMovie = async (title) => {
        const deletedMovie = await axios.delete(`${API_URL}/movieSearch/movies/deleteMovie?title=${title}`)

        getAllFavourites()
        const newFavouriteList = favouriteMovies.filter(
            (favourite) => favourite.Title !== title
        );

        setFavouriteMovies(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
        setTextColor("Green")
        setDescription("Movie Removed Successfully")
        setOpenModal(true);
    }
    

    return (
        <>
        <h1>{localStorage.userName}'s Favourite Movies and Shows</h1> 
         <br></br>
        <div className='image-container d-flex justify-content space-between m-4 '>
            <PopUpModal open={openModal} color={textColor} description={description}  onClose={() => setOpenModal(false)} /> 
            <MovieList movies={favouriteMovies} page={"favourites"} favourite={RemoveFavourites}  removeFavouriteClick={deleteFavouriteMovie}  /> 
        </div> 
        </>
    )  
}
export default FavouriteMovies;