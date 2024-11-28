# Etapa base: Utilizando uma imagem oficial do Node.js com TypeScript
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

# Expondo a porta usada pela aplicação (ajuste conforme necessário)
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "run", "start"]
