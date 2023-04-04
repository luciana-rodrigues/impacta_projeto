from flask import Blueprint, jsonify, request
import uuid

# Entities
from models.entities.Cliente import Cliente

# Models
from models.ClienteModel import ClienteModel

# Utils
from utils.PhoneFormat import PhoneFormat
from utils.DateFormatAdd import DateFormatAdd

main=Blueprint('cliente_blueprint', __name__)

@main.route('/')
def get_clientes():
    try:
        clientes=ClienteModel.get_clientes()
        return jsonify(clientes)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
    
@main.route('/<id>')
def get_cliente_id(id):
    try:
        cliente = ClienteModel.get_cliente_id(id)
        if cliente != None:
            return jsonify(cliente)
        else:
            return jsonify({}), 404
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/add', methods=['POST'])
def add_cliente():
    try:
        nome = request.json['nome']
        sobrenome = request.json['sobrenome']
        data_nasc = request.json['data_nasc']
        telefone = PhoneFormat.convert_phone(request.json['telefone'])
        email = request.json['email']
        data_ir = request.json['data_ir']
        cliente = Cliente(nome, sobrenome, data_nasc, telefone, email, data_ir)

        affected_rows = ClienteModel.add_cliente(cliente)

        if affected_rows == 1:
            return jsonify(cliente.id)
        else:
            return jsonify({'message': "Error on insert"}), 500

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

# ADD CLIENTE - TESTE DE FORMATAÇÃO DE DATA
# @main.route('/add', methods=['POST'])
# def add_cliente():
#     try:
#         nome = request.json['nome']
#         sobrenome = request.json['sobrenome']
#         data_nasc = DateFormatAdd.convert_date(request.json['data_nasc'])
#         telefone = PhoneFormat.convert_phone(request.json['telefone'])
#         email = request.json['email']
#         data_ir = DateFormatAdd.convert_date(request.json['data_ir'])
#         cliente = Cliente(nome, sobrenome, data_nasc, telefone, email, data_ir)

#         affected_rows = ClienteModel.add_cliente(cliente)

#         if affected_rows == 1:
#             return jsonify(cliente.id)
#         else:
#             return jsonify({'message': "Error on insert"}), 500

#     except Exception as ex:
#         return jsonify({'message': str(ex)}), 500

@main.route('/delete/<id>', methods=['DELETE'])
def delete_cliente(id):
    try:
        cliente = Cliente(id)

        affected_rows = ClienteModel.delete_cliente(cliente)
        
        if affected_rows == 1:
            return jsonify(cliente.id)
        else:
            return jsonify({'message': "No client deleted"}), 404

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/update/<id>', methods=['PUT'])
def update_cliente(id):
    try:
        nome = request.json['nome']
        sobrenome = request.json['sobrenome']
        data_nasc = request.json['data_nasc']
        telefone = PhoneFormat.convert_phone(request.json['telefone'])
        email = request.json['email']
        data_ir = request.json['data_ir']
        cliente = Cliente(id, nome, sobrenome, data_nasc, telefone, email, data_ir)

        affected_rows = ClienteModel.update_cliente(cliente)

        if affected_rows == 1:
            return jsonify(cliente.id)
        else:
            return jsonify({'message': "No cliente updated"}), 404

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
