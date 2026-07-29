# Projeto Login React + Tailwind + React Hook Form + Axios + JSON Server

> Material de estudo desenvolvido durante a construção do projeto.
>
> Objetivo: criar um fluxo completo de autenticação com formulário, API fake, tratamento de erros, loading, navegação entre páginas e persistência do usuário.

# 🎯 O que foi desenvolvido

Ao final do projeto temos:

✅ Formulário de Login
✅ React Hook Form
✅ Componentização
✅ Custom Hook
✅ Axios
✅ API Fake com JSON Server
✅ Tratamento de erros
✅ Loading no botão
✅ Persistência com Local Storage
✅ React Router
✅ Página Home
✅ Estrutura organizada de projeto

# 📦 Tecnologias utilizadas

```bash
React
Typescript
Tailwind CSS
React Hook Form
Axios
React Router Dom
Json Server
```

# 🚀 Instalação do projeto

## Clonar projeto

```bash
git clone SEU_REPOSITORIO
```

## Instalar dependências

```bash
npm install
```

## Dependências

```bash
npm install react-hook-form
npm install react-router-dom
npm install axios
npm install json-server
```

# 🔥 Criando a API Fake

Crie o arquivo `db.json`:

```json
{
  "users": [
    {
      "id": 1,
      "email": "admin@email.com",
      "password": "123456",
      "name": "Henrique"
    }
  ]
}
```

No package.json:

```json
{
  "scripts": {
    "server": "json-server --watch db.json --port 3001"
  }
}
```

Executar:

```bash
npm run server
```

# 🌎 Axios

```ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001'
});
```

# 🔐 Auth Service

```ts
import { api } from './api';

export const authService = {
  async login(email: string, password: string) {
    const response = await api.get('/users');

    const user = response.data.find(
      (user: any) =>
        user.email === email &&
        user.password === password
    );

    return user;
  }
};
```

# ✅ Testes

## Login válido

Email:

```txt
admin@email.com
```

Senha:

```txt
123456
```

Resultado:

```txt
Redirecionamento para Home
```

## Login inválido

Resultado:

```txt
Usuário ou senha inválidos
```

## API desligada

Resultado:

```txt
Erro ao conectar com servidor
```

# 🚀 Próximos passos

- Logout
- Private Routes
- Context API
- Backend Node.js + Express
- JWT
- Banco de Dados

---

Projeto construído para estudos de arquitetura React, componentização, hooks, services e autenticação.
