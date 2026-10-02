import React from "react";
import { SaveMovieToDb } from "./SaveMovieToDb";
import Card from '@mui/material/Card';
import { CardContent, CardMedia } from "@mui/material";


const MovieList = (props) => {
    // console.log("theprops",props)
    const FavouriteComponent = props.favourite;
    const SaveComponent = props.saveMovie;
    return (
   <div
          className="movie-list-scroll"
          style={{
            width: "100%",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch", // smooth scrolling on touch devices
          }}
          aria-label="Movie list scroll container"
        >
          <div
            style={{
              display: "flex",
              gap: ".4rem",
              padding: "0.25rem",
              flexWrap: "nowrap",
              alignItems: "flex-start",
            }}
          >
            {props.movies.map((movie, index) => (
              <div
                key={movie?.imdbID ?? movie?.id ?? index}
                style={{ flex: "0 0 auto",  margin: "0.2rem" }} // prevent shrinking so horizontal scroll works
                className="image-container  "
              >
                {/* Absolute wrap for the top delete button to keep it out of the flex flow */}
               
                <Card sx={{ width: 280, position: "relative", boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    image={movie.Poster}
                    alt={movie.Title || "Movie poster"}
                    sx={{
                      height: 420,
                      width: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <CardContent sx={{ p: 0 }}>
                    {/* Hover/Overlay trigger completely covering the image card */}
                    {props.page !== "favourites" && (
                      <div
                        onClick={() => props.handleFavouriteClick(movie)}
                        className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-start"
                        style={{ cursor: "pointer" }}
                      >
                        <FavouriteComponent />
                      </div>
                    )}
                     {props.page === "favourites" && (
                  <div
                    onClick={() => props.removeFavouriteClick(movie.Title)}
                    className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-start"
                    style={{ zIndex: 10,cursor: "pointer",color:"white" }}
                  >
                    <FavouriteComponent />
                  </div>
                )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
    )
}
export default MovieList;