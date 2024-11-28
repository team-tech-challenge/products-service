# Etapa base: Utilizando uma imagem oficial do Node.js com suporte ao TypeScript
FROM node:19

# Criando e definindo o diretório de trabalho
WORKDIR /usr/src/app

# Copiando o restante do código
COPY . .

# Copiando os arquivos necessários para instalar dependências
COPY package.json .

# Instalando dependências (incluindo as de desenvolvimento, como `ts-node-dev`)
RUN npm install && npm run swagger

# Adicionando o diretório node_modules/.bin ao PATH para garantir que os binários estejam acessíveis
ENV PATH="./node_modules/.bin:$PATH"

# Expondo a porta usada pela aplicação (ajuste conforme necessário)
EXPOSE 3000

# Comando de inicialização
ENTRYPOINT ["npm"]
CMD ["start"]
