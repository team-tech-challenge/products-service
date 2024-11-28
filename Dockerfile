# Etapa base: Utilizando uma imagem oficial do Node.js com suporte ao TypeScript
FROM node:19

# Criando e definindo o diretório de trabalho
WORKDIR /usr/src/app

# Configurando o usuário para evitar problemas de permissões
RUN useradd -ms /bin/bash appuser
USER appuser

# Copiando os arquivos necessários para instalar dependências
COPY --chown=appuser:appuser package.json .

# Copiando o restante do código
COPY --chown=appuser:appuser . .

# Instalando dependências (incluindo as de desenvolvimento)
RUN npm install && npm run swagger

# Adicionando o diretório node_modules/.bin ao PATH para garantir que os binários estejam acessíveis
ENV PATH="./node_modules/.bin:$PATH"

# Expondo a porta usada pela aplicação
EXPOSE 3000

# Comando de inicialização
ENTRYPOINT ["npm"]
CMD ["start"]
