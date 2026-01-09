FROM node:24.11.0-alpine

RUN apk add --no-cache wget ca-certificates
RUN apk add --no-cache curl

WORKDIR  /usr/home/

RUN npm install -g pnpm 

COPY package* . 

RUN pnpm install 

COPY . . 

RUN pnpm dlx prisma@6.3.0 generate

CMD ["sh", "-c", "npx prisma migrate dev --name init && pnpm dev"]

