from typing import Optional, List
from fastapi import FastAPI, Response, status, HTTPException, Depends
from fastapi.params import Body
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from sqlalchemy.orm import Session
from . import models, schemas
from .database import engine, get_db
from datetime import datetime, date

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CONECTA E RECONECTA AO BANCO DE DADOS
while True:
    try:
        conn = psycopg2.connect(host='localhost', database='impacta_api', user='postgres', password='adminlu', cursor_factory=RealDictCursor)
        cursor = conn.cursor()
        print("Database connection was successfull!")
        break
    except Exception as error:
        print("Connecting to database failed.")
        print(f"Error: {error}")
        time.sleep(2)

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

# BUSCA CLIENTE PELO NOME
@app.get("/clients/nome/{nome}")
def get_client_by_name(nome: str, db: Session = Depends(get_db)):
    client = db.query(models.Client).filter(models.Client.nome.ilike(f'%{nome}%')).all()

    if not client:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"O cliente com nome: {nome} não foi encontrado.")
    return client

# BUSCA CLIENTE PELO SOBRENOME
@app.get("/clients/sobrenome/{sobrenome}")
def get_client_by_surname(sobrenome: str, db: Session = Depends(get_db)):
    client = db.query(models.Client).filter(models.Client.sobrenome.ilike(f'%{sobrenome}%')).all()

    if not client:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"O cliente com nome: {sobrenome} não foi encontrado.")
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



# LISTA CLIENTES PELA DATA DE DECLARAÇÃO DE IR - TENTATIVAS
############################################### 
@app.get("/clients/nome/{data_ir}")
def get_client_by_data_ir(data_ir: str, db: Session = Depends(get_db)):
    client = db.query(models.Client).filter(models.Client.data_ir.ilike(f'%{data_ir}%')).all()

    if not client:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"O cliente com data de declaração: {data_ir} não foi encontrado.")
    return client
###############################################
@app.get("/clients/pending", response_model=List[schemas.Client])
def get_clients_pending(db: Session = Depends(get_db)):
    clients = db.query(models.Client).all()
    current_year = date.today().year
    clients_before_current_year = []
    for client in clients:
        if datetime.strptime(client.data_ir, '%Y-%m-%d').year < current_year:
            clients_before_current_year.append(client)
    return clients_before_current_year
###############################################
@app.get("/clients/teste", response_model=List[schemas.Client])
def get_old_clients(db: Session = Depends(get_db)):
    clients = db.query(models.Client).all()

    format = '%Y-%m-%d'
    
    old_clients = []
    for client in clients:
        datetime = datetime.strptime(client.data_ir, format)
        if client.data_ir:
            data_ir = datetime.date()
            if data_ir.year < datetime.now().year:
                old_clients.append(client)
    
    return old_clients
###############################################
# TENTANDO EXTRAIR APENAS O ANO EM FORMATO STR MESMO E DEPOIS CONVERTER PARA INTEIRO E FAZER A COMPARAÇÃO COM O ANO ATUAL
@app.get("/clients/pendings", response_model=List[schemas.Client])
def get_clients_pending(db: Session = Depends(get_db)):
    clients = db.query(models.Client).all()
    current_year = date.today().year
    current_year_int = int(current_year)
    clients_before_current_year = []
    for client in clients:
        year = int(client.data_ir[:4]) # extrai apenas o ano da data_ir e converte para int
        if year < current_year_int:
            clients_before_current_year.append(client)
    return clients_before_current_year
###############################################