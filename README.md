<div align="center">

# Binds challenge

<img src="./binds.jpeg" width="150px">

Esse repositório se trata do teste técnico para empresa [Binds.co](https://binds.co/).


</div>

## Descrição
O projeto faz um CRUD de livros, onde é necessário ter um usuário criado e logado para conseguir ter acesso a esse CRUD. Somente o usuário que cria o registro de um livro tem acesso para fazer o CRUD.

## Tecnologias:
  - NodeJS
  - Express
  - Javascript
  - Mongoose
  - MongoDB
  - JWT

## Deploy:
- https://binds-challenge-api.herokuapp.com/

## Instruções de uso para API localmente:
- Clone o repositório em sua máquina;
- Acesse as pasta e rode o comando `npm install` para instalação das dependencias;
- Rode o comando `npm start` inicializar a Api localmente;
- API rodará na porta 3001 de sua máquina;
- É necessário o serviço do MongoDB funcionando localmente.
- Também é possível acessar API pelo deploy no Heroku pelo link: https://binds-challenge-api.herokuapp.com/

## Rotas:

### - `/users`:
- Rotas e métodos:
  - POST: `/users`
  - DELETE: `/users`
  - PUT: `/users`

#### POST `/users`:
- API permite que seja criado um novo usuario através do método POST no endpoint `/users` passando no body um json no formato:
```json
    {
      "email": "String no formato de email.",
      "password": "String com no minimo 6 caracteres"
    }
```

#### DELETE `/users`:
- API permite que seja possivel deletar o usuario que esteja logado com um token válido através do método DELETE no endpoint `/users`. Não é possível deletar um outro usuário que não seja o próprio. O token tem que ser passado no header utilizando a chave `authorization`.

#### PUT `/users`:
- API permite que seja possivel editar a senha do usuario que esteja logado com um token válido através do método PUT no endpoint `/users`. Não é possível alterar a senha um outro usuário que não seja o próprio. O token tem que ser passado no header utilizando a chave `authorization`. É necessário passar um body, no formato json com as seguintes chaves:
```json
    {
      "password": "String referente a senha atual.",
      "newPassword": "String referente a nova senha, com no minimo 6 caracteres"
    }
```

### - `/login`:
- Rotas e métodos:
  - POST: `/login`

#### POST `/login`:
- API permite que seja feito um novo login através do método POST no endpoint `/login`. Esse método retornará um token válido. É necessário passar no body um json no formato:
```json
    {
      "email": "Email de um usuário já cadastrado ",
      "password": "Senha de um usuário já cadastrado"
    }
```
### - `/books`:
- Rotas e métodos:
  - GET, POST: `/books`,
  - GET, PUT, DELETE: `/books/:id`,
  - GET: `/books/search?type=`
* Todos os metodos necessitam do header estar preenchido com o token valido, com o nome chave sendo `authorization`.

#### POST `/books`:
- API permite que seja feito um novo cadastro de um livro através do método POST no endpoint `/books`. É necessário estar logado e passar no body um json no formato:
```json
    {
      "title": "String, não pode ser vazio e tem que ser preenchido.",
      "type": "String, não pode ser vazio e tem que ser preenchido.",
      "author": "String, não pode ser vazio e tem que ser preenchido."
    }
```

#### GET `/books`:
- API permite que seja possivel listar todos os livros cadastrados pelo usuário logado, através do método GET no endpoint `/books`.

#### GET `/books/:id`:
- API permite que seja possivel listar um livro especifico cadastrados pelo usuário logado, através do método GET no endpoint `/books/:id`, onde tem que ser passado um id válido de um livro cadastrado no parametro da rota.

#### DELETE `/books/:id`:
- API permite que seja possivel deletar um livro especifico cadastrados pelo usuário logado, através do método DELETE no endpoint `/books/:id`, onde tem que ser passado um id válido de um livro cadastrado no parametro da rota. Lembrando que somente o usuário que cadastrou o livro tem acesso a deleta-lo.

#### PUT `/books/:id`:
- API permite que seja possivel editar a chave type de um livro especifico cadastrados pelo usuário logado, através do método PUT no endpoint `/books/:id`, onde tem que ser passado um id válido de um livro cadastrado no parametro da rota. Lembrando que somente o usuário que cadastrou o livro tem acesso a edita-lo. É necessário passar no body da requisição o seguinte json:
```json
    {
      "type": "String, não pode ser vazio e tem que ser preenchido."
    }
```

#### GET: `/books/search?type=`:
- API permite que seja possivel procurar um livro especifico cadastrados pelo usuário logado, através do método GET no endpoint `/books/search?type=`, onde é passado um tipo de livro na url para filtrar a busca. Lembrando que a busca será feita nos livros cadastrados pelo usuário.

## Próximos passos no projeto:
- Aprimoramento nos testes;
- Dockerizar aplicação

### Considerações finais:
  Dúvidas ou sugestões me contate por:
  - Linkedin: https://www.linkedin.com/in/guicouto90/
  - Email: gui.couto90@yahoo.com.br