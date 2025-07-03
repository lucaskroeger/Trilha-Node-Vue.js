# Etapa única para ambiente de produção
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Instala apenas as dependências de produção
COPY package.json ./

# Copia o restante da aplicação
COPY .. .

# Expondo a porta do backend
EXPOSE 3000

# Copia o script de entrada e torna executável
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Entrypoint do container
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
