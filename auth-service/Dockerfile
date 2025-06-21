# Dockerfile
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Puerto que expone el contenedor
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "src/server.js"]