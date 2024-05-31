# desafio-fcamara

## Sobre o desafio

Este desafio consiste na implementação de um software para gerenciamento de tarefas.
Foi utilizado para o desenvolvimento backend, a linguagem de programação Java e o framework
Spring Boot. Para o armazenamento dos dados, foi utilizado o banco de dados relacional MySQL.

No Backend, foram implementados testes unitários com jUnit 5 para garantir a integridade das funcionalidades
de registrar uma nova tarefa, falha ao registrar uma nova tarefa, listar todas as tarefas pendentes e listar 
todas as tarefas completadas.

## Pré-requisitos

- Docker
- Docker Compose
- MySQL
- Maven
- Java 17
- NodeJS 21.5.0

## Rodar a aplicação

### Com Docker

Caso você já possua o docker instalado e configurado no seu PC, basta rodar o comando
`docker compose up --build -d` para subir a aplicação.

A URL para acessar a aplicação pelo navegador é `http://localhost:9999`.

### Sem o Docker

Primeiro, instale o banco de dados MySQL. Caso não tenha, poderá ser feito o download
pelo link [Mysql Download](https://dev.mysql.com/downloads/installer/]).

Para rodar a API, você precisa ter o Maven instalado na sua máquina. Com o maven funcional, navegue até a pasta
`/ToDo-List-API` que se encontra na raiz do projeto. Dentro dessa pasta, rode o comando `mvn spring-boot:run`
para subir a API.

Para rodar o frontend, você precisa ter instalado e configurado o Nodejs. Com o NodeJS funcional, navegue até a pasta
`/ToDo-List-Frontend` que se encontra na raiz do projeto. Dentro dessa pasta, rode os comandos respectivamente
`npm install`, `npm run build` e por fim `npm run preview` para subir o frontend.

A URL para acessar a aplicação pelo navegador é `http://localhost:9999`.

#### Contatos

Qualquer dúvida estou a disposição para tirar quais quer dúvidas

Nome: Rodrigo Otacilio\
e-mail: roqls23@gmail.com