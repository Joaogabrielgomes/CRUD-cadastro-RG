# CRUD — Sistema de Cadastro de Pessoas

Projeto de CRUD completo utilizando **Node.js**, **Express** e **JSON Server** como banco de dados.

## Operações disponíveis

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/post/` | Cadastrar nova pessoa |
| GET | `/get/` | Listar todas as pessoas |
| PUT | `/put/` | Atualizar pessoa pelo RG |
| DELETE | `/delete/` | Excluir pessoa pelo RG |

## Campos do cadastro

`nome` · `sobrenome` · `email` · `idade` · `telefone` · `rua` · `bairro` · `cidade` · `estado` · `rg`

## Como rodar

**1. Instalar as dependências:**
```bash
npm install
```

**2. Iniciar o servidor:**
```bash
node server.js
```

**3. Acessar no navegador:**
```
http://localhost:3000
```

## Estrutura do projeto

```
projeto-crud/
├── server.js
├── db.json
└── public/
    ├── index.html
    ├── style.css
    ├── post/
    ├── get/
    ├── put/
    └── delete/
```
