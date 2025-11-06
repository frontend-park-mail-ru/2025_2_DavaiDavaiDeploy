FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Стадия деплоя в S3
FROM amazon/aws-cli:latest AS deploy

# Устанавливаем рабочую директорию
WORKDIR /deploy

# Копируем собранные файлы в текущую директорию
COPY --from=build /app/dist ./

# Проверяем что файлы скопировались
RUN ls -la

# Устанавливаем переменные окружения для AWS
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_DEFAULT_REGION
ARG S3_BUCKET

# Синхронизируем с S3
RUN aws s3 sync ./dist s3://$S3_BUCKET/ \
    --delete \
    --acl public-read \
    --cache-control "max-age=31536000" && \
    aws s3 cp ./dist s3://$S3_BUCKET/assets/prod \
    --acl public-read \
    --cache-control "no-cache, no-store, must-revalidate"

#базовый образ
FROM nginx:alpine AS nginx

COPY --from=build /app/dist /usr/share/nginx/html

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]