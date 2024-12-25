## Перед запуском

Перед запуском важно заполнить конфиг (.env)
P.S. стоит ориентироваться на поля .env.sample

## Миграции
```bash
# Запуск миграций
$ npm run migration:run

# Откат миграции
$ npm run migration:revert
```

## Загрузка зависимостей

```bash
$ npm install
```

## Запуск приложения

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Запуск SQLite
```bash
$ docker-compose up -d --build
```