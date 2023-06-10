# impacta_projeto
Projeto integrado feito em grupo como requisito para a disciplina `Software Product: Analysis, Specification, Project & Implementation` do curso de `Análise e Desenvolvimento de Sistemas` na Faculdade Impacta de Tecnologia.

## Exemplo Online:

O projeto foi publicado online na cloud do Render, em: https://front-impacta.onrender.com/

![Imagem da homepage](https://raw.githubusercontent.com/luciana-rodrigues/impacta_projeto/main/front/public/homepage.jpg)



## O que é?

Um programa de inserção de clientes para a atualização e tracking de quando ele realizou seu último imposto de renda.
É possível listar os clientes, adicionar novos, excluir, editar informações e também realizar a procura por nome e sobrenome, bem como listar somente os que não realizaram IR no ano corrente.

## Como usar localmente?
O projeto utiliza `Docker` e Docker Compose, uma vez instalado o docker desktop no seu computador, rodar o seguinte comando na linha de comando estando na pasta root do projeto:
```bash
$ docker-compose up -d
```

Baixar o Docker: https://www.docker.com/products/docker-desktop/

#### O que aconteceu?

O comando irá subir três containers, um do db (Postgres), um do backend (FastAPI) e um do front (React.js).
O backend estará disponível em localhost:8000, o front em localhost:3000 e o db estará conectado automaticamente com o back por variaveis de ambiente.
