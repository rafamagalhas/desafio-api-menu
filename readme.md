
# Desafio Backend

Resolução do desafio proposto pela **Base39**, abaixo, contém as instruções para que seja possível executar a aplicação.

## Conteúdo

- Requisitos
- Instalação
- Modo de usar
- Testes
- Suporte
- Contribuição
- Observação

## Requisitos

Tecnologias que o projeto utiliza.

-  [NodeJS](https://nodejs.org/en/download/)
-  [Docker](https://docs.docker.com/get-docker/)
-  [Dock~er Compose](https://docs.docker.com/compose/install/)
-  [MongoDB](https://www.mongodb.com/)
-  [VSCode](https://code.visualstudio.com/download)
-  [Postman](https://www.postman.com/downloads/)

## Instalação

Após clonar o projeto, execute os passos abaixo:

### Execução

Para executar a aplicação, análogo ao que será executado em produção:

```sh
docker-compose up  -d  --build
```  

### Execução ambiente de desenvolvimento

#### Criar .env contendo as configurações do projeto:

Criar o arquivo `.env` baseado no `.env.example`. Esse arquivo contém os dados para conexão do banco de dados.

#### Instalar dependências do projeto:
```sh
npm install
```

#### Dependência externa (MongoDB):
```sh
docker-compose up  -d
```  

#### Executando o projeto:
```sh
npm start
```

#### A aplicação estará rodando em:
```sh
http://localhost:8000
```

## Modo de usar

Com a aplicação em execução, há duas maneiras de consumir seus recursos:

### 1. Acessando os recursos da api manualmente:

#### Criando menus
```
curl --location 'http://localhost:8000/api/v1/menu' \
--header 'Content-Type: application/json' \
--data '{
	"name": "menu name",
	"relatedId": "parent id"
}'
```

Lembrando que o campo `relatedId` é opcional, ou seja, só deve ser informado para indicar relação entre menus.

 #### Listando menus
```
curl --location 'http://localhost:8000/api/v1/menu'
```

#### Removendo menus
```
curl --location --request DELETE 'http://localhost:8000/api/v1/menu/640120d11ea40cc9c1eb9864'
```

### 2. Utilizando a coleção do postman:

É possível importar o arquivo `postman.json` que se encontra no diretório `/.docs` via `postman`. Após importar o mesmo, as rotas listadas acima, serão importadas no seu postman.

## Testes

Os testes do projeto encontram-se dentro da pasta `./test`, na qual utiliza as dependências `jest`. Para executar a suíte de teste execute o comando:

### Subir o container do MongoDB:
```sh
docker-compose -f docker-compose-deps.yml up -d
```

### Executar os testes:
```sh
$ npm  test
```

## Suporte

Por favor [abra uma issue](https://github.com/rafamagalhas/desafio-api-menu/issues/new) para suporte. 

## Contribuição

1. Faça um fork do projeto.
2. Crie sua feature branch (`git checkout -b my-new-feature`).
3. Commit suas alterações (`git commit -am 'Add some feature'`).
4. Faça um push de sua branch (`git push origin my-new-feature`).
5. Crie uma nova [pull request](https://github.com/rafamagalhas/desafio-api-menu/pulls).

## Observação

Esse projeto utiliza o `husky` para executar algumas ações, uma delas é o `pre-push`. Ou seja, antes que o git push seja executado, os testes serão rodados.
Como os testes necessitam de uma instância do MongoDB, com o intuito de serem mais eficazes, é importante que o container esteja no ar. Portanto quando for executar os testes ou subir alguma alteração, verifique:

### Container em execução
```sh 
docker ps -a
```

### Executar o container com a dependencia
```sh
docker-compose -f docker-compose-deps.yml up -d
```