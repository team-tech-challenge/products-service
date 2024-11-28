## Stage 1: Build
#FROM node:19-alpine as build
#
## Define o diretório de trabalho
#WORKDIR /app
#
## Copia os arquivos de dependência primeiro para utilizar caching
#COPY . .
#
#COPY package.json .
#
## Instala as dependências
#RUN npm install && npm run swagger
#
## Stage 2: Run
#FROM node:19-alpine as runtime
#
## Cria um usuário não-root
#RUN adduser -D tech
#USER tech
#
## Define o diretório de trabalho
#WORKDIR /app
#
## Copia apenas os artefatos necessários do estágio de build
#COPY --from=build /app /app
#
## Expõe a porta em que sua aplicação rodará
#EXPOSE 3000
#
## Comando para iniciar o servidor Node.js
#ENTRYPOINT ["npm"]
#CMD ["start"]

# Etapa base: Utilizando uma imagem oficial do Node.js com suporte ao TypeScript
FROM node:18

# Configurando variáveis de ambiente
ENV NODE_ENV=production

# Criando e definindo o diretório de trabalho
WORKDIR /usr/src/app

# Copiando apenas os arquivos essenciais para instalar dependências
COPY package*.json ./

# Instalando as dependências da aplicação
RUN npm install

# Copiando o restante do código para o diretório de trabalho
COPY . .

# Compilando o TypeScript para JavaScript
RUN npm run build

# Expondo a porta usada pela aplicação (ajuste conforme necessário)
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "run", "start"]
