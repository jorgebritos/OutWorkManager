# Etapa 1: Construir la aplicación Quasar
FROM node:20 AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el resto del código de la aplicación
COPY . .

# Ejecutar la aplicación en modo desarrollo
CMD ["npm", "run", "start"]

# Exponer el puerto en el que Quasar ejecuta la aplicación en desarrollo
EXPOSE 9000

