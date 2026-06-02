# TaskFlow — To-Do List Full-Stack

Aplicacao full-stack de lista de tarefas com autenticacao JWT, categorias e CRUD completo.

## Stack

- **Frontend:** React 19 + Vite 6 + TypeScript, shadcn/ui on Base UI (@base-ui/react), Tailwind CSS v4 with indigo theme and dark mode, React Query, React Router.
- **Backend:** Node.js + Express 5 + TypeScript, arquitetura em camadas (routes -> controllers -> services -> repositories).
- **Banco:** PostgreSQL via Prisma ORM.

## Stack notes

UI uses shadcn/ui components built on Base UI primitives with Tailwind v4, an indigo theme and full dark mode support toggled at runtime.

## Pre-requisitos

- **Node.js 20+** (20.19 ou superior).
- **PostgreSQL** local (versao 15/16/17), rodando na porta padrao **5432**.

> 👉 Primeira vez / passo a passo do zero (instalar Node, instalar Postgres, criar banco): veja **[SETUP.md](./SETUP.md)**.

## Como rodar

```bash
# 1. Crie o banco no seu PostgreSQL local (uma vez):
#    psql postgres -c "CREATE USER todo WITH PASSWORD 'todo';"
#    psql postgres -c "CREATE DATABASE todo OWNER todo;"

# 2. Configure o .env do backend
cp .env.example backend/.env      # ajuste a DATABASE_URL se necessario

# 3. Instalar dependencias (na raiz, instala os workspaces)
npm install

# 4. Migrar e (opcional) popular o banco
npm run db:migrate
npm run db:seed

# 5. Rodar API e Web (terminais separados)
npm run dev:api    # http://localhost:3000
npm run dev:web    # http://localhost:5173
```

**Login demo:** `demo@todo.app` / `demo1234`

## Testes

```bash
npm test -w backend   # 20 testes (unit + integration)
npm test -w frontend  # 1 teste de componente (TaskCard)
```

## Endpoints

| Metodo | Rota | Descricao |
|--------|------|-----------|
| POST | /api/auth/register | Cadastrar usuario |
| POST | /api/auth/login | Login (retorna JWT) |
| GET | /api/categories | Listar categorias |
| POST | /api/categories | Criar categoria |
| PUT | /api/categories/:id | Editar categoria |
| DELETE | /api/categories/:id | Remover categoria |
| GET | /api/tasks | Listar tarefas (filtros: ?completed=&categoryId=) |
| POST | /api/tasks | Criar tarefa |
| GET | /api/tasks/:id | Buscar tarefa |
| PUT | /api/tasks/:id | Editar tarefa |
| PATCH | /api/tasks/:id/complete | Alternar conclusao |
| DELETE | /api/tasks/:id | Remover tarefa |
| GET | /api/health | Health check |

Todos os endpoints de tarefas e categorias requerem `Authorization: Bearer <token>`.
