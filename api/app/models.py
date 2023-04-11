from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.sql.expression import null
from .database import Base

class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, nullable=False)
    nome = Column(String, nullable=False)
    sobrenome = Column(String, nullable=False)
    data_nasc = Column(Date, nullable=False)
    telefone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    data_ir = Column(Date, nullable=False)