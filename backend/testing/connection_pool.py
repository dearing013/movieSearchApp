import aiohttp
import requests
from starlette.requests import Request

# TODO: replace this with something proper later
USER_AGENT = "Movie Search/" + "0.1.0"
"""str: The user-agent used.
"""


async def aiohttp_session(request: Request) -> aiohttp.ClientSession:
    """Dependency that returns the aiohttp session."""
    return request.app.state.aiohttp_session


def requests_session(request: Request) -> requests.Session:
    """Dependency to return http requests session."""
    return request.app.state.requests_session
