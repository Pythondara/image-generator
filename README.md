# Сервис "Image generator"

## Описание

Сервис для генерации изображений

## Требования

* NodeJS 20+
* TypeScript 5+

## Установка и запуск

### Переменные окружения

| Переменная                 | Описание                                  | Тип       | Значение |
|----------------------------|-------------------------------------------|-----------|----------|
| **Сервер**                 |                                           |           |          |
| `NODE_ENV`                 | Тип разработки                            | `String`  |          |
| `PORT`                     | Порт HTTP-сервера                         | `Number`  |          |
| `HOST`                     | Хост HTTP-сервера                         | `String`  |          |
| `LOG_LEVEL`                | Уровень логирования                       | `String`  |          |
| **База данных**            |                                           |           |          |
| `DB_HOST`                  | Адрес хоста БД                            | `String`  |          |
| `DB_PORT`                  | Порт БД                                   | `Number`  |          |
| `DB_USERNAME`              | Имя пользователя БД                       | `String`  |          |
| `DB_PASSWORD`              | Пароль пользователя                       | `String`  |          |
| `DB_NAME`                  | Название БД                               | `String`  |          |
| `DATABASE_URL`             | URL БД                                    | `String`  |          |
| **MinIO**                  |                                           |           |          |
| `MINIO_PORT`               | Порт S3 хранилища                         | `Number`  |          |
| `MINIO_USERNAME`           | Пользователь S3 хранилища                 | `String`  |          |
| `MINIO_PASSWORD`           | Пароль пользователя S3 хранилища          | `String`  |          |
| `MINIO_ENDPOINT`           | Хост S3 хранилища                         | `String`  |          |
| `MINIO_ACCESS_KEY`         | Ключ доступа к АПИ S3 хранилища           | `String`  |          |
| `MINIO_SECRET_KEY`         | Секретный ключ доступа к АПИ S3 хранилища | `String`  |          |
| `BUCKET_NAME`              | Наименование бакета                       | `String`  |          |
| **FusionBrain**            |                                           |           |          |
| `FUSION_BRAIN_URL`         | Имя хоста сервиса "Справочники"           | `String`  |          |
| `FUSION_BRAIN_API_KEY`     | Порт хоста сервиса "Справочники"          | `String`  |          |
| `FUSION_BRAIN_SECRET_KEY`  |                                           | `String`  |          |


## Деплой в докере 
1. Ввести предоставленную команду в консоль `docker-compose up -d`
2. Применить миграции `npx prisma migrate dev`

## Локально
1. Убедитесь, что на вашем пк есть `postgresql`
2. Убедитесь, что на вашем пк есть `minio`
3. Примените миграции `npx prisma migrate dev`
4. Запустите приложение `yarn start:dev`

## Заполняя .env ориентируйтесь на файлы env.[development, production, test] там предустановленные mock данные

## Создание новой версии сборки

Добавить изменения

```bash
$ git add .
```

Создать коммит

```bash
$ git commit -m 'Commit comments'
```

Инкремент версии (патч), будет создан новый коммит и тег

```bash
$ yarn version --patch # указать точную версию сборки, например, 0.0.1
$ yarn version --minor # автоматически увеличить минорную версия, 0.1.0
$ yarn version --major # автоматически увеличить мажорную версия, 1.0.0
```

Публикация изменений

```bash
$ git push
$ git push --tags
```
