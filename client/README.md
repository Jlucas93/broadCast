## WEB BroadCast

App feito com NextJs e typescript, para cadastro de contato, Conexões de WhatsAPP e Lista de trasnmissões

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
> É necessário mudar suas envs para conectar a API

## 🖥️ Rodar

### ☕ Local

Para rodar o projeto rode o comando

```

npm run dev
ou
yarn dev

```

### ☕ Para build

Para realizar o build do projeto basta executar o comando:

```

npm run build
ou
yarn build

```

## 📁 Pastas

- Pages: Páginas do projeto.
- Services: Todas os serviços de cada página do sistema.
- Style: Estilização global do CSS.
- Layout: Prover o layout do sistema, nesse caso a sidebar
- Components: Todos os componentes do app, como botões, Modais, Inputs e componentes da página.
- InterfaceS: Todos as tipagens ncessária do projeto
- Cntext: Contextos necessários para execução do app

## 📖 Dependências

- react-hook-form: Biblioteca para lidar com formulários de forma eficiente e controlada.
- zod: Biblioteca para tratamento de dados dos formulários.
- react-toastify: Biblioteca para notificar ao usuário ações de erros e sucesso.
- Material UI e Tailwind: Biblioteca para css.
- axios: Biblioteca para lidar com http requests
- nookies: Biblioteca para lidar com armazenamento e manipulação de cookies

## 🗎 Variaveis de Ambiente Essenciais executar o projeto

- **NEXT_PUBLIC_BASE_API_URL**: Definição do do link da sua API.
