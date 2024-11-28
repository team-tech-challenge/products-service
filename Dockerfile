# Etapa base: Utilizando uma imagem oficial do Node.js com suporte ao TypeScript
FROM node:19

# Criando e definindo o diretório de trabalho
WORKDIR /usr/src/app

# Criar o usuário e grupo para evitar problemas de permissão
RUN useradd -ms /bin/bash appuser

# Criar diretório temporário gravável e ajustar permissões
RUN mkdir -p /usr/src/app/tmp /usr/src/app/.npm-cache && \
    chown -R appuser:appuser /usr/src/app

# Trocar para o usuário appuser
USER appuser

# Definir o diretório temporário no ambiente
ENV TMPDIR=/usr/src/app/tmp

# Configurar o cache do npm para evitar problemas de permissão
ENV NPM_CONFIG_CACHE=/usr/src/app/.npm-cache

# Copiar os arquivos necessários
COPY --chown=appuser:appuser package.json .
COPY --chown=appuser:appuser . .

# Instalar dependências e gerar Swagger
RUN npm install && npm run swagger

# Adicionar o diretório node_modules/.bin ao PATH
ENV PATH="./node_modules/.bin:$PATH"

# Expor a porta usada pela aplicação
EXPOSE 3000

# Comando de inicialização
ENTRYPOINT ["npm"]
CMD ["start"]
