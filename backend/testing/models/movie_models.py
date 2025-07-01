
from sqlalchemy import (
    Column,
    String,
    Text,
    Integer,
    Float,
    Index,
    Date,
    DateTime,
    Boolean,
)
from testing.db import movie_Base


class MovieDetails(movie_Base):
    __tablename__ = "movies_data"

    title: str = Column(String,primary_key=True)
    user_id: int = Column(Integer,nullable=False)
    year: int = Column(Integer, nullable=False)
    poster: str = Column(String,nullable=False)
    imdbID: str = Column(String(100),nullable=False)
