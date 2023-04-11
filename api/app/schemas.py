from pydantic import BaseModel
from datetime import date

class ClientBase(BaseModel):
    nome: str
    sobrenome: str
    data_nasc: date
    telefone: str
    email: str
    data_ir: date

class ClientCreate(ClientBase):
    pass

class Client(ClientBase):
    id: int

    class Config:
        orm_mode = True