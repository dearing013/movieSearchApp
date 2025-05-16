import aiohttp
from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy import insert, delete, select
from testing.connection_pool import requests_session,aiohttp_session
from testing.models.movie_models import MovieDetails
from sqlalchemy.orm import sessionmaker, Session
from testing.db import get_movie_db

router = APIRouter(prefix="/movies", tags=["movies"])

class Movies:

    def __init__(
        self,
        requests_session: Session = Depends(requests_session),
        # async_client_session: aiohttp.ClientSession = Depends(aiohttp_session),
        movie_db: Session = Depends(get_movie_db),
    ):
        self.requests_session = requests_session
        # self.async_client_session = async_client_session
        self.movie_db = movie_db


@router.post(
    "/listmovie",
    status_code=200,
    summary="list name of searched movie",
    responses={
        "404": dict(description="movie Not Found"),
    },
)
def displayMovie(searchedMovie: str):
    print ("your searched movie was",searchedMovie)
    return searchedMovie


@router.post(
    "/saveMovie",
    status_code=200,
    summary="save movie to db"
)
def saveMovieToDb(title: str,year: str,movie_db: Session = Depends(get_movie_db)):

    movie_session = movie_db

    exists = movie_session.query(movie_session.query(MovieDetails).filter(
           MovieDetails.title == title).exists()).scalar()

    if not exists:
        q = insert(MovieDetails).values(title=title,year=year)

        res = movie_session.execute(q)
        movie_session.commit()
        movie_session.close()

        return {"movie successfully added"}

@router.get(
    "/removeMovie",
    status_code=200,
    summary="delete movie",
    responses={
        "404": dict(description="Movie Not Found"),
    },
)
def removeMovies(title: str,movie_db: Session = Depends(get_movie_db)):

    movie_session = movie_db

    q = delete(MovieDetails).where(MovieDetails.title == title)
    res = movie_session.execute(q)

    movie_session.commit()

    return {"movie successfully deleted"}


@router.get(
    "/getAllFavouriteMovies",
    status_code=200,
    summary="get all saved movies",
    responses={
        "404": dict(description="No Movies Found"),
    },
)
def getAllMovies (movie_db: Session = Depends(get_movie_db)):

    favouriteMovies = []
    movie_session = movie_db

    q = select(MovieDetails)
    res = movie_session.execute(q)

    rows = res.fetchall()

    movie_session.commit()

    for (row,) in rows:
        print ("therow",row)
        favouriteMovies.append((row.title,row.year))

    return favouriteMovies

@router.get(
    "/getMoviesByYear",
    status_code=200,
    summary="get all movies for a particular year",
    responses={
        "404": dict(description="No Movies Found"),
    },
)
def get_movies_by_year(year: int,movie_db: Session = Depends(get_movie_db),):

    results = []

    movie_session = movie_db

    movie_session = movie_db

    q = select(MovieDetails).where(MovieDetails.year == year)

    res = movie_session.execute(q)

    rows = res.fetchall()

    movie_session.commit()


    for (row,) in rows:
        results.append((row.title))

    return results

@router.get(
    "/getMoviesByRange",
    status_code=200,
    summary="get all movies within a particular range of years",
    responses={
        "404": dict(description="No Movies Found"),
    },
)

def get_movies_by_range(start_year: int,end_year: int,movie_db: Session = Depends(get_movie_db)):

    results = []

    movie_session = movie_db


    q = select(MovieDetails).where(MovieDetails.year >= start_year,MovieDetails.year <= end_year)
    res = movie_session.execute(q)

    rows = res.fetchall()
    
    movie_session.commit()

    for row, in rows:
        results.append((row.title))

    return results





