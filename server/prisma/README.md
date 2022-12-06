npm i typescript -D
npm i fastify

npm i tsx -D

npm i @prisma/client
 -> Criar um arquivo com o nome ".env" na raiz do projeto
    -> No arquivo passar apenas isso:
            DATABASE_URL = "file:./dev.db"

npx prisma migrate dev (Despois de criar as colunas da sua model/tabela)

npm i fastify/cors

npx prisma format

Class02
Sempre salvar datas no banco com timestamp.
        -> Abre o inspetor do navegador
        -> No console escreva:
                new Date().toISOString()

npm i zod
