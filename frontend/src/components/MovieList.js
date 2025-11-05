import React from "react";
import { SaveMovieToDb } from "./SaveMovieToDb";


const MovieList = (props) => {
    // console.log("theprops",props)
    const FavouriteComponent = props.favourite;
    const SaveComponent = props.saveMovie;
    return (
        <>
        {props.movies.map((movie, index) => (
            <div className='image-container d-flex justify-content-space-between m-4'>
                {props.page == "favourites" ?
                <div onClick={() => props.removeFavouriteClick(movie.Title)} >
                   <FavouriteComponent />
                   </div> : null}
                <img src={movie.Poster} id={props.imdbID} alt='movie'></img>
                <div onClick={() => props.handleFavouriteClick(props.page == "favourites"? movie.imdbID : movie)}
                className='overlay d-flex align-items-center justify-content-start'>
                        {props.page == "favourites" ? null : <FavouriteComponent /> }
				</div>
            </div>
        ))}
    </>
    )
}
export default MovieList;