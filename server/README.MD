## API BroadCast

API feita com Express e TypeScript, utilizando Firebase para conexão com o banco.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão do Node 20.9.0.
- Você tem uma máquina Windows, Linux ou Mac.
- Você leu este documento por completo.

## 🚀 Instalando

Para instalar o projeto, siga estas etapas:

- Abra o projeto no VSCode e instale as dependências:

```
npm install
ou
yarn
```

- Em seguida, copie o arquivo .env.example e renomeie para .env

> [!TIP]
> É necessário alterar suas variáveis de ambiente para conectar ao banco de dados.

## 🖥️ Rodar

### ☕ Local

Para rodar o projeto localmente, execute o comando:

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

- Em seguida, execute o comando:

```

npm run start
ou
yarn start

```

## 📖 Dependências

- express: Framework para construir a API com Node de maneira mais rápida e fácil.
- cors: Biblioteca para habilitar CORS.
- bcryptjs: Biblioteca para salvar senhas com hash.
- lightlogging: Biblioteca para gerar logs de fácil visualização e armazenar sempre os últimos 6 meses de logs de maneira organizada.
- dotenv: Biblioteca para lidar com arquivos de variáveis de ambiente.
- firebase: Biblioteca para conectar ao banco de dados.
- firebase-admin: Biblioteca para codificar um token e garantir segurança nas rotas necessárias.
- zod: Biblioteca para validação de dados nas requisições e garantir variáveis de ambiente necessárias.

## 🗎 Variáveis de Ambiente Essenciais para Executar o Projeto

- **PORT**: Opcional. Define a porta que a API será executada. (Exemplo: `3003`)
- **NODE_ENV**: Define o ambiente. Pode ser `dev`, `sta`, `test`, ou `prod`. (Exemplo: `DEVELOPMENT`)

### Credenciais do Firebase

- **FIREBASE_API_KEY**: Sua chave de API do Firebase.
- **FIREBASE_AUTH_DOMAIN**: Domínio de autenticação do Firebase.
- **FIREBASE_PROJECT_ID**: ID do projeto Firebase.
- **FIREBASE_STORAGE_BUCKET**: Bucket de armazenamento do Firebase.
- **FIREBASE_MESSAGING_SENDER_ID**: ID do remetente de mensagens do Firebase.
- **FIREBASE_APP_ID**: ID do aplicativo Firebase.

### Configurações de Autenticação Firebase

- **FIREBASE_SERVICE_ACCOUNT_TYPE**: Tipo da conta de serviço Firebase.
- **FIREBASE_SERVICE_ACCOUNT_PROJECT_ID**: ID do projeto da conta de serviço.
- **FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID**: ID da chave privada da conta de serviço.
- **FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY**: Chave privada da conta de serviço.
- **FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL**: Email do cliente da conta de serviço.
- **FIREBASE_SERVICE_ACCOUNT_CLIENT_ID**: ID do cliente da conta de serviço.
- **FIREBASE_SERVICE_ACCOUNT_AUTH_URI**: URI de autenticação da conta de serviço.
- **FIREBASE_SERVICE_ACCOUNT_TOKEN_URI**: URI do token da conta de serviço.
- **FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL**: URL do certificado X509 do provedor de autenticação.
- **FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL**: URL do certificado X509 do cliente.
- **FIREBASE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN**: Domínio do universo da conta de serviço.

## 🫙 Docker

Este projeto possui um Docker Compose para a instalação da API.
