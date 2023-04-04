from database.db import get_connection
from .entities.Cliente import Cliente

class ClienteModel():

    @classmethod
    def get_clientes(self):
        try:
            connection = get_connection()
            clientes=[]

            with connection.cursor() as cursor:
                cursor.execute("SELECT id, nome, sobrenome, data_nasc, telefone, email, data_ir FROM clientes ORDER BY nome ASC")
                resultset = cursor.fetchall()

                for row in resultset:
                    cliente = Cliente(row[0], row[1], row[2], row[3], row[4], row[5], row[6])
                    clientes.append(cliente.to_JSON())

            connection.close()
            return clientes
        except Exception as ex:
            raise Exception(ex)
        
    @classmethod
    def get_cliente_id(self, id):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute("SELECT id, nome, sobrenome, data_nasc, telefone, email, data_ir FROM clientes WHERE id = %s", (id,))
                row = cursor.fetchone()

                cliente = None
                if row != None:
                    cliente = Cliente(row[0], row[1], row[2], row[3], row[4], row[5], row[6])
                    cliente = cliente.to_JSON()

            connection.close()
            return cliente
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def add_cliente(self, cliente):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute("INSERT INTO clientes (nome, sobrenome, data_nasc, telefone, email, data_ir) VALUES (%s, %s, %s, %s, %s, %s)", (cliente.nome, cliente.sobrenome, cliente.data_nasc, cliente.telefone, cliente.email, cliente.data_ir))
                affected_rows = cursor.rowcount
                connection.commit()
                
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def delete_cliente(self, cliente):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute("DELETE FROM clientes WHERE id = %s", (cliente.id,))
                affected_rows = cursor.rowcount
                connection.commit()
                
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def update_cliente(self, cliente):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute("UPDATE cliente SET nome = %s, sobrenome = %s, data_nasc = %s, telefone = %s, email = %s, data_ir = %s WHERE id = %s", (cliente.nome, cliente.sobrenome, cliente.data_nasc, cliente.telefone, cliente.email, cliente.data_ir))
                affected_rows = cursor.rowcount
                connection.commit()
                
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)