import {useState,useEffect} from "react";
import MovieList from './MovieList';
import '../App.css';
import axios from "axios";
import RemoveFavourites from "./RemoveFavourites";
import PopUpModal from "./PopUpModal";
import {axiosInstance} from "../customAxiosInterceptor"
import { openModal } from "./Stores/modalSlice";
import { useDispatch } from "react-redux";
import { api } from "./api/apiMethods";
import { removeFavourite, setFavourites } from "./Stores/authSlice";
import SearchBox from "./SearchBox";

function FavouriteMovies (props) {

    const [favouriteMovies,setFavouriteMovies] = useState([]);
    const [allFavourites, setAllFavourites] = useState([]); // master list for filtering
    const [searchValue, setSearchValue] = useState('');
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [pendingDeleteTitle, setPendingDeleteTitle] = useState(null);

    const dispatch = useDispatch()

    const API_URL = process.env.REACT_APP_API_URL;


     useEffect(() => {
        const movieFavourites = JSON.parse(
            localStorage.getItem('react-movie-app-favourites') || '[]'
        );
       getAllFavourites()
    },[props.updates]);

    // keep an initial load as well (if you prefer a single effect you can remove this)
    useEffect(() => {
        const movieFavourites = JSON.parse(
            localStorage.getItem('react-movie-app-favourites') || '[]'
        );
        const list = Array.isArray(movieFavourites) ? movieFavourites : [];
    },[])

 useEffect(() => {
       
       // filter when searchValue changes
     const q = (searchValue ?? "").trim().toLowerCase();
       if (!q) {
           setFavouriteMovies(allFavourites);
           return;
      }
       // simple filter: match title, year, or imdbID
       const filtered = (allFavourites || []).filter((m) => {
       const title = (m?.Title ?? m?.title ?? "").toString().toLowerCase();
       const year = (m?.Year ?? m?.year ?? "").toString().toLowerCase();
          const id = (m?.imdbID ?? m?.id ?? "").toString().toLowerCase();
          return (
              title.includes(q) ||
             year.includes(q) ||
               id.includes(q)
           );
       });       
       setFavouriteMovies(filtered);

   }, [searchValue, allFavourites]);
 

    const saveToLocalStorage = (items) => {
        localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
        const movieFavourites = JSON.parse(
            localStorage.getItem('react-movie-app-favourites')
        );
    };
    
    const getAllFavourites = async () => {
        try {
            const results = await api.get(`/movieSearch/movies/getMoviesByUser?userId=${localStorage.userId}`)
            console.log("theresults",results)
    
           const moviesArray = Array.isArray(results) ? results : (Array.isArray(results) ? results: []);
          setFavouriteMovies(moviesArray);
          console.log("thefavouritesare",favouriteMovies)
          setAllFavourites(moviesArray);
          saveToLocalStorage(moviesArray);
          dispatch(setFavourites(moviesArray));
        }
 
        catch (e) {
            console.log("error retrieving favorite movies")
        }
    }
    const deleteFavouriteMovie = async (title) => {

        
        try {
        // optimistic local update
        const newFavouriteList = (favouriteMovies || []).filter((f) => (f?.Title ?? f?.title) !== title);
        setFavouriteMovies(newFavouriteList);
        setAllFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);

        // update redux immediately
        dispatch(removeFavourite(title));

        // call backend
        await api.delete(`${API_URL}/movieSearch/movies/deleteMovie?title=${encodeURIComponent(title)}`);

        // ensure canonical state
        await getAllFavourites();

        // dispatch(openModal({ description: "Movie Removed Successfully", color: "green" }));
        } catch (err) {
        console.error("deleteFavouriteMovie error", err);
        dispatch(openModal({ description: "Unable to remove movie", color: "red" }));
        }
        finally {
          // clear pending title and close confirm modal if still open
          setPendingDeleteTitle(null);
          setOpenConfirmModal(false);
        }
    };


    const confirmDelete = async (title) => {
        console.log("confirm delete",title)
        setPendingDeleteTitle(title);
        setOpenConfirmModal(true);
        console.log("isopen",openConfirmModal)
        
    };

    return (
        <>
        <h1>{localStorage.userName}'s Favourite Movies and Shows</h1> 
         <br></br>
          <div className='row d-flex align-items-center mt-4 mb-4'>
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}  placeholder="Search through favourites" />
          </div>
        <div  className='container-fluid movie-app'>
              <PopUpModal
                open={openConfirmModal}
                description={`Are you sure you want to remove "${pendingDeleteTitle ?? ''}" from favourites?`}
                color={"red"}
                confirmAction={async () => {
                    // call delete with the pending title
                    if (pendingDeleteTitle) await deleteFavouriteMovie(pendingDeleteTitle);
                                }}
                    onClose={() => {
                    setOpenConfirmModal(false);
                    setPendingDeleteTitle(null);
                    }}
                 />
            {/* <PopUpModal open={openModal} color={textColor} description={description}  onClose={() => setOpenModal(false)} />  */}
            <MovieList movies={favouriteMovies} page={"favourites"} favourite={RemoveFavourites}  removeFavouriteClick={confirmDelete} />
    </div> 
        </>
    )  
}
export default FavouriteMovies;