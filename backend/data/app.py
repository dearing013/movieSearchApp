import aiohttp
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from data import movies,users
import uvicorn
from loguru import logger
import requests
from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.orm import sessionmaker
from data.connection_pool import USER_AGENT
from data.models import movie_models,user_models

root_app = FastAPI()
app = FastAPI(title="Movie Search App")
router = APIRouter()

router.include_router(movies.router)
router.include_router(users.router)
app.include_router(router)

user = 'postgres'
password = 'postgres'
host = 'localhost'
port = 5432
database = 'pricing'
 

origins = [
    "http://localhost:3006",
    "http://localhost:3000",
    "https://dearing013.github.io"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", summary="Hello world endpoint.")
async def hello_world():
    """A hello world endpoint.

    Displays "Hello, world!" as a JSON string.
    """
    return "Hello, world!"


def get_app():
    prefix = "/movieSearch"  # TODO
    root_app.mount(prefix, app)

    @root_app.on_event("startup")
    def connect_db():
        logger.info("Creating database engines")
       
        movie_engine: Engine = create_engine(
            "postgresql+psycopg2://postgres:postgres@localhost/Movie Data",
            pool_pre_ping=True,
            pool_size=20,
            max_overflow=30,
            pool_timeout=60,
        )

        user_engine: Engine = create_engine(
            "postgresql+psycopg2://postgres:postgres@localhost/Movie Data",
            pool_pre_ping=True,
            pool_size=20,
            max_overflow=30,
            pool_timeout=60,
        )
        movie_factory = sessionmaker(movie_engine)
        user_factory = sessionmaker(user_engine)

        app.state.movie_db_engine = movie_engine
        app.state.user_db_engine = user_engine

        app.state.movie_db_factory = movie_factory
        app.state.user_db_factory = user_factory
        logger.info("Creating tables")
        movie_models.movie_Base.metadata.create_all(bind=movie_engine)
        user_models.user_Base.metadata.create_all(bind=user_engine)

    @root_app.on_event("startup")
    def start_requests_session():
        """This starts a connection pool."""
        sess = requests.Session()
        sess.headers["User-Agent"] = USER_AGENT
        app.state.requests_session = sess

    @root_app.on_event("shutdown")
    async def stop_requests_session():
        """This stops the requests session session on app shutdown."""
        if hasattr(app.state, "requests_session"):
            app.state.requests_session.close()

    @root_app.on_event("startup")
    async def start_aiohttp_session():
        """This starts an AIOHTTP pool."""
        sess = aiohttp.ClientSession()
        sess.headers["User-Agent"] = USER_AGENT
        app.state.aiohttp_session = sess

    @root_app.on_event("shutdown")
    async def stop_aiohttp_session():
        """This stops the AIOHTTP pool.."""
        if hasattr(app.state, "aiohttp_session"):
            session: aiohttp.ClientSession = app.state.aiohttp_session
            await session.close()

    return root_app


def dev_server():
    """Entry point for running the dev server."""

    uvicorn.run(
        "data.app:get_app",
        factory=True,
        forwarded_allow_ips="0.0.0.0/0",
        host="0.0.0.0",
        port=8003,
        reload=True,
        reload_delay=1
    )
