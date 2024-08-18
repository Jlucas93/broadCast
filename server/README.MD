## API BroadCast

API feita com express e typescript utilizando Firebase para conexão com o banco

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão do Node 20.9.0.
- Você tem uma máquina Windows ou Linux ou Mac.
- Você leu esse documento por completo.

## 🚀 Instalando

Para instalar o projeto, siga estas etapas:

- Abra o projeto no VSCode e instale as depedências:

```
npm install
ou
yarn
```

- Terceriro, copie o arquivo .env.example e modifique para .env.

> [!TIP]
> É necessário mudar suas envs para conectar ao banco de dados

## 🖥️ Rodar

### ☕ Local

Para rodar o projeto rode o comando

```

npm run dev
ou
yarn dev

```

### ☕ Produção

Para rodar o projeto no ambiente de produção rode o comando:

```

npm run build
ou
yarn build

```

- Em seguida rode o comando:

```

npm run start
ou
yarn start

```

## 📖 Dependências

- express: Framewrokd para construir a API com node de maneira mais rápida e fácil.
- cors: Biblioteca para habilitar CORS
- bcryptjs: Biblioteca para salvar uma senha com hash.
- lightlogging: Biblioteca para gerar logs de fácil visualização e armazenar sempre os ultimos 6 meses de log de maneira organziada.
- dotenv: Biblioteca para lidar com arquivos de envs
- firebase: Biblioteca para conectar ao banco de dados.
- firebase-admin: Biblioteca para codificar um token e garantir segurança nas rotas necessárias
- zod: Biblioteca para validação de dados nas requisições e garantir envs necessárias.

## 🗎 Variaveis de Ambiente Essenciais executar o projeto

- PORT: Opicinal,Definir a porta que será executada a api
- NODE_ENV: Definição do ambiente, onde pode ser dev, sta, test e prod.
- APP_SECRET: Chave secreta para codificar o JWT

- As seguintes envs são relacionadas ao firebase
- API_KEY
- AUTH_DOMAIN
- PROJECT_ID
- STORAGE_BUCKET
- MESSAGING_SENDER_ID
- APP_ID

## 🫙 Docker

Esse projeto possui um docker compose para a instalação da api.
