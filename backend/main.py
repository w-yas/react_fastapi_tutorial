from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import crud
from . import models
from . import schema
from .database import Session_class, Engine

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = Session_class()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=schema.User)
def create_user(user:schema.UserCreate, db:Session = Depends(get_db)):
    db_user = crud.get_user_by_name(user_name=user.name, db=db)
    if db_user:
        raise HTTPException(status_code=400, detail="user is already exits")
    return crud.create_user(db=db, user=user)


@app.get("/users/", response_model=schema.User)
def read_user(name:str, password:str, db:Session=Depends(get_db)):
    db_user = crud.get_user_by_name_by_password(user_name=name, password=password, db=db)
    if db_user is None:
        raise HTTPException(status_code=404, detail="user is not found")
    return db_user




@app.post("/sales/", response_model=schema.Sales)
def create_sales(sales:schema.SalesCreate, db:Session=Depends(get_db)):
    db_sales = crud.get_sales_by_year_by_department(year=sales.year, department=sales.department, db=db)
    if db_sales:
        raise HTTPException(status_code=400, detail="Sales Info already registered")
    return crud.create_sales(sales=sales, db=db)


@app.get("/sales/", response_model=list[schema.Sales])
def read_sales(db:Session=Depends(get_db)):
    return crud.get_sales(db=db)


@app.get("/sales/{year}", response_model=list[schema.Sales])
def read_sales_by_year(year:int, db:Session=Depends(get_db)):
    sales = crud.get_sales_by_year(db=db, year=year)
    if sales is None:
        raise HTTPException(status_code=404, detail="sales is not found")
    return sales
    


    
    
    