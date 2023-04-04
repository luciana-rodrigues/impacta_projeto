from utils.DateFormat import DateFormat

class Cliente():

    def __init__(self, id, nome=None, sobrenome=None, data_nasc=None, telefone=None, email=None, data_ir=None) -> None:
        self.id=id
        self.nome=nome
        self.sobrenome=sobrenome
        self.data_nasc=data_nasc
        self.telefone=telefone
        self.email=email
        self.data_ir=data_ir

    def to_JSON(self):
        return{
            'id':self.id,
            'nome':self.nome,
            'sobrenome':self.sobrenome,
            'data_nasc':DateFormat.convert_date(self.data_nasc),
            'telefone':self.telefone,
            'email':self.email,
            'data_ir':DateFormat.convert_date(self.data_ir)
        }
    