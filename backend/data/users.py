from data.schemas import UserCreate,requestdetails,TokenSchema
# from models import User
# from database import Base, engine, SessionLocal
from fastapi import FastAPI, Depends, HTTPException,status,APIRouter
from sqlalchemy.orm import Session
from sqlalchemy import select,delete
from data.db import get_user_db
from data.models.user_models import UserDetails
from data.utils import get_hashed_password,verify_password

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/register")
def register_user(user: UserCreate,session: Session = Depends(get_user_db)):
    existing_user = session.query(UserDetails).filter_by(email=user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="email already registered")

    encrypted_password = get_hashed_password(user.password)

    new_user = UserDetails(username=user.username,email=user.email,password=encrypted_password)

    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return {"message":"user created successfully"}


@router.post('/login' )
def login(request: requestdetails, db: Session = Depends(get_user_db)):
    user = db.query(UserDetails).filter(UserDetails.email == request.email).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="user not found")
    hashed_pass = user.password
    if not verify_password(request.password, hashed_pass) or request.email == "" :
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect password"
        )
    return {user}


@router.get("/getUserById",
    status_code=200,
    summary="get user by id",
    responses={
        "404": dict(description="User not found")
    }
)

def get_user_by_id(userId: int,user_db: Session = Depends(get_user_db)):

    results  = []

    user_session = user_db

    q = select(UserDetails).where(UserDetails.id == userId)
    res = user_session.execute(q)

    rows = res.fetchall()

    user_session.commit()
    
    for row, in rows:
        results.append((row.username))

    return results

@router.delete("/deleteUser",
  status_code=200,
    summary="delete user by id",
    responses={
        "404": dict(description="User not found")
    })
def delete_user_by_id(userId: int,user_db: Session = Depends(get_user_db)):

    user_session = user_db

    q = delete(UserDetails).where(UserDetails.id == userId)

    user_session.execute(q)

    # rows = res.fetchall()

    user_session.commit()

    # if rows:
    #     user_session.delete(row)
    #     user_session.commit()
    return {"user successfully deleted"}
    # else:
    #     return {"user not found"}
    
    # q = delete(UserDetails).where(UserDetails.id == userId)
    # res = user_session.execute(q)

    # user_session.commit()

    # return {"user successfully deleted"}

    

    

# @router.post("/changePassword")
# def changePassord(request: RequestDetails):

#     print ("changing password")
#     return {"password changed successfully"}