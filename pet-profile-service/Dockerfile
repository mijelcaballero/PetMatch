# Dockerfile for User Validation Service
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .


# Cada servicio expone su propio puerto interno:
EXPOSE 3006

CMD ["node", "src/server.js"]
