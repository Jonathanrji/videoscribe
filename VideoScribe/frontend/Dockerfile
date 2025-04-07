# Etapa 1: construir React
FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: servir con nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# ⬇️ Aquí usamos el nuevo nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
