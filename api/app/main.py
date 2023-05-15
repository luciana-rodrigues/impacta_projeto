from typing import Optional, List
from fastapi import FastAPI, Response, status, HTTPException, Depends
from fastapi.params import Body
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from sqlalchemy.orm import Session
from sqlalchemy import or_
from . import models, schemas
from .database import engine, get_db
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ENDPOINTS

# RAIZ
@app.get("/")
def root():
    return {"message": "Bem vindo(a) a esta API!"}

# LISTA TODOS OS CLIENTES
@app.get("/clients", response_model=List[schemas.Client])
def get_clientes(db: Session = Depends(get_db)):
    clients = db.query(models.Client).all()
    return clients

# CONTA TOTAL DE CLIENTES
@app.get("/clients/total")
def get_clients_count(db: Session = Depends(get_db)):
    count = db.query(models.Client).count()
    return {"Total de clientes": count}

# CADASTRA CLIENTE
@app.post("/clients", status_code=status.HTTP_201_CREATED, response_model=schemas.Client)
def create_clients(new_client: schemas.ClientCreate, db: Session = Depends(get_db)):
    created_client = models.Client(**new_client.dict())

    db.add(created_client)
    db.commit()
    db.refresh(created_client)

    return created_client

# BUSCA CLIENTE PELO ID
@app.get("/clients/{id}", response_model=schemas.Client)
def get_client(id: int, db: Session = Depends(get_db)):
    client = db.query(models.Client).filter(models.Client.id == id).first()

    if not client:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"O cliente com id: {id} não foi encontrado.")
    return client


# BUSCA CLIENTE PELO NOME OU SOBRENOME
@app.get("/clients/nome/{nome}")
def get_client_by_name(nome: str, db: Session = Depends(get_db)):
    client = db.query(models.Client).filter(or_(models.Client.nome.ilike(f'%{nome}%'), models.Client.sobrenome.ilike(f'%{nome}%'))).all()
    if not client:
        raise HTTPException(status_code=status.HTTP_204_NO_CONTENT, detail=f"O cliente com nome: {nome} não foi encontrado.")
    return client

# EXCLUI CLIENTE
@app.delete("/clients/{id}")
def delete_client(id: int, db: Session = Depends(get_db)):
    deleted_client = db.query(models.Client).filter(models.Client.id == id)

    if deleted_client.first() == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"O cliente com id: {id} não existe.")
    
    deleted_client.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)

# ATUALIZA CLIENTE
@app.put("/clients/{id}", response_model=schemas.Client)
def update_client(id: int, client: schemas.ClientCreate, db: Session = Depends(get_db)):
    client_query = db.query(models.Client).filter(models.Client.id == id)

    updated_client = client_query.first()

    if updated_client == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"O cliente com id: {id} não existe.")
    
    client_query.update(client.dict(), synchronize_session=False)

    db.commit()

    return client_query.first()
    