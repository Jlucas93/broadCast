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

## 🗎 Variaveis de Ambiente Essenciais executar o projeto

- NODE_ENV: Definição do ambiente, onde pode ser dev, sta, test e prod.
- JWT_SECRET_KEY

- AWS_ACCESS_KEY_ID: Chave de acesso da AWS.
- AWS_SECRET_ACCESS_KEY: Chave secreta de acesso da AWS.
- AWS_BUCKET: Bucket do S3.
- AWS_BUCKET_REGION: Região do Bucket do S3.


## 🫙 Docker

Esse projeto possui um docker compose para a instalação da api.


## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.
