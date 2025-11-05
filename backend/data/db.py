from sqlalchemy import MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from starlette.requests import Request



metadata = MetaData(schema="movies")
movie_metadata = MetaData(schema="movies")
user_metadata = MetaData(schema="users")

movie_Base = declarative_base(metadata=movie_metadata)
user_Base = declarative_base(metadata=user_metadata)

### PRICING DB FUNCTIONS ###
def get_movie_db(request: Request):
    """Dependency function to get a DB session."""
    session: Session = request.app.state.movie_db_factory()
    request.state.db = session
    try:
        yield session
    finally:
        session.close()

def movie_db_factory(request: Request):
    """Dependency to get the DB factory."""
    session_factory: sessionmaker = request.app.state.movie_db_factory
    return session_factory

def get_user_db(request: Request):
    """Dependency function to get a DB session."""
    session: Session = request.app.state.user_db_factory()
    request.state.db = session
    try:
        yield session
    finally:
        session.close()

def user_db_factory(request: Request):
    """Dependency to get the DB factory."""
    session_factory: sessionmaker = request.app.state.user_db_factory
    return session_factory