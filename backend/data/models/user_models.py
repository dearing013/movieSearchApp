import datetime
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
    UUID
)
from data.db import user_Base


class UserDetails(user_Base):
    __tablename__ = "user_profile"

    id = Column(Integer,primary_key=True)
    # id = Column(UUID(as_uuid=True), primary_key=True)
    username = Column(String, nullable=False)
    email = Column(String,unique=True,nullable=False)
    password = Column(String,nullable=False)

class TokenTable(user_Base):
    __tablename__ = "token"
    user_id = Column(Integer)
    access_toke = Column(String(450), primary_key=True)
    refresh_toke = Column(String(450),nullable=False)
    status = Column(Boolean)
    created_date = Column(DateTime, default=datetime.datetime.now)
