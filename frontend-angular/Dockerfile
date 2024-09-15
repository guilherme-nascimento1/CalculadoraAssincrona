# Usar uma imagem base do Node.js com Alpine
FROM node:18-alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o package.json e o package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar todos os arquivos da aplicação Angular para o container
COPY . .

# Expor a porta 4200 para a aplicação Angular
EXPOSE 4200

# Comando para rodar a aplicação Angular com ng serve
CMD ["npm", "start"]
