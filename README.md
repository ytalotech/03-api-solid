# App

GymPass style app

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu historico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

# RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RFs (Requisitos não funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

================================================================================================================================

npm init -y
npm i typescript @types/node tsx tsup -D
npx tsc --init

npm i fastify

npm i dotenv

conseguimos acessar no terminal: process.env.NODE_ENV

npm i zod

npm run start:dev
npm run build

# FIxar as versões dos pacotes

save-exact = true

renovatebote no github, fica tendnado atualizar as dependencias do nosso projeto

Posso rodar esse comando no terminal para teste: http localhost:3333/

npm i eslint @rocketseat/eslint-config -D

mais criar minha propria eslint.config.js:

npm i eslint -D

npx eslint --init

npm run eslint:fix

npx prisma -h

Esse prisma ainda nao é o cara que faz acesso direto ao banco

- npm i prisma -D

- npx prisma init

- npx prisma generate

- npm i @prisma/client

docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5433:5432 bitnami/postgresql

Copara os arquivo de migração e faz as alteracoes

- npx prisma migrate dev

Pega todas as migrates criada e gera as tabelas, não procura por novas alterações...

- npx prisma migrate deploy

npx prisma studio

docker compose up -d

docker compose stop

docker compose down

npm run start:dev

npm i bcryptjs
npm i --save-dev @types/bcryptjs

// SOLID
// Single Responsibility Principle
// Open/Closed Principle
// Liskov Substitution Principle
// Interface Segregation Principle
// Dependency Inversion Principle

implementar o que falta da interface
control + .

realizar testes e adicionando plugin para resolver os paths:
npm i vitest vite-tsconfig-paths -D

teste unitario nunca vai acessar banco de dados ou camadas externas a nossa aplicação

npm run test

npm run test:watch

npm run test:coverage

npm run test:ui

para navegar pelo vitest ui:
Vitest UI

npm i -D @vitest/ui

cada teste deve ser unico e nao aproveitar o outro
