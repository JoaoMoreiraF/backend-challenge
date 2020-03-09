# Backend Challenge
Este desafio me ajudou a melhorar as minhas skills como desenvolvedor backend, que é algo que eu busco a cada dia. Tive algumas dificuldades, mas busquei superá-las ao longo do mesmo. 

## Dependencies

- node.js >= 10.16
- postgresql >= 10 
- npm >= 6.0

### Installing
 
Clone esse repositório e navegue até a pasta raiz

OS X & Linux:

```
npm install
```

* Crie um banco de dados no postgresql e define os dados de acesso no database.js
```
export let sequelize = new Sequelize(<nom_do_seu_banco>, <seu_usuario>, <sua_senha>, {
    host: <host>,
    port: <port>,
    dialect: 'postgres',
    operatorsAliases: false
});
```
* Transpile o seu projeto
```
npm run build
```

### Running

```
npm start
```

### User guide
* **Cadastro de usuário**

Antes de realizar qualquer ação na API, é necessário ter um usuário cadastrado. Para criar um, envie uma requisição do tipo **POST** para o endpoint **/api/v1/user** com a seguinte estrutura:

```json
{
	  "name": "Name",
	  "email": "email@example.com",
    "cnpj": "111111111111",
	  "password": "password123",
}
```

A resposta esperada deverá ser na seguinte estrutura:

```json
{
    "token" "<token>":
}
```

* **Login**

Para realizar ações na API é necessário estar autenticado. Para fazer isso, apenas envie uma requisição **POST** para o endpoint **/api/v1/auth/sign_in** com a seguinte estrutura:

```json
{
	"email": "email@example.com",
	"password": "password123"
}
```
A resposta esperada deverá ser na seguinte estrutura:

```json
{
    "token" "<token>":
}
```
***Observação: Para realizar qualquer ação na API é necessário enviar o token de autenticação no Header no seguinte campo:***

```json
x-access-token: <Token>
```

* **Cadastro de item**

Para cadastrar um novo item no sistema, apenas envie uma requisição do tipo **POST** para o endpoint **/api/v1/item** com a seguinte estrutura:

```json
{
	"name": "Name",
	"description": "descriptioon",
	"prince": "R$ 10,00"
}
```

* **Listar itens**

Para listar os itens, envie uma requisção do tipo GET para algum dos enpoints abaixo

```
/api/v1/item - Retorna todos os itens cadastrados no sistema
/api/v1/item/{id} - Retorna o item referente ao id passado
```

* **Atualizar item** 

Para atualizar algum item, apenas envie ma requisição do tipo put para o endpoin **/api/v1/item/{id}**, onde se pode atualizar qualquer um dos campos com a seguinte estrutura

```json
{
	"name": "Name",
	"description": "descriptioon",
	"prince": "R$ 10,00"
}
```

* **Deletar um item**

Para deletar um item, apenas envie uma requisiçã DELETE para o seguinte endpoint:
```
/api/v1/item/{id}
```

* **Para pegar as informações do usuário conectado**


Para pegar as informações do usuário conectado, envie uma requisição do tipo GET para o seguinte endpoint:

```
/api/v1/profile
```

## Built With

* node.js
* npm
* postgresql
