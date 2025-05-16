
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

    title: str = Column(String(100),primary_key=True)
    year: int = Column(Integer, nullable=False)