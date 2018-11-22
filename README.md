# nodeloft

https://github.com/brianc/node-postgres

https://github.com/sequelize/sequelize


## Start

https://postgrespro.ru/windows - скачал базу PostgreSQL 10.5 32-разрядная

https://www.pgadmin.org/download/pgadmin-4-windows/ - pgAdmin 4 v3.5 (released Nov. 1, 2018)

https://postgrespro.ru/education/books - PostgreSQL для начинающих

https://edu.postgrespro.ru/introbook_v4.pdf - кратко почитал книгу

Сначала мы установили базу на компьютер, паротль при установке не ставили, выбрали пункт «Использовать
параметры по умолчанию», чтобы СУБД не занимала много оперативной памяти.

Дальше запустили службу сервера базы данных, если не запущена.

Дальше через pgAdmin создали базу test,
и создали в ней таблицу:

```sql
CREATE TABLE students(
s_id integer PRIMARY KEY,
name text,
start_year integer
);
```

и вставили первую запись:

```sql
INSERT INTO students(s_id, name, start_year)
VALUES (1451, 'Анна', 2014),
(1432, 'Виктор', 2014),
(1556, 'Нина', 2015);
```


## Sequelize

For using Sequelize with postgres you must install sequelize, pg, pg-hstore

`npm install --save sequelize pg pg-hstore`

Операции нужно делать по очереди, создали таблицы(модели с ассоциациями), потом создали группы, потом обновили и т.д.


### Create groups

![Create groups](https://i.imgur.com/qjqqhdR.png)

### Update group

![Update group](https://i.imgur.com/GhxMILz.png)


## Установка eslint

https://eslint.org/docs/user-guide/getting-started

`npm install eslint --save-dev`

https://www.npmjs.com/package/eslint-config-standard

`npm install --save-dev eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node`

`echo "node_modules/" >> .eslintignore`

`touch .eslintrc.json`

with these settings

```json
{
  "root": true,
  "extends": "standard",
  "rules": {
    "no-extra-semi": "error",
    "semi": [
      "error",
      "always"
    ],
    "quotes": [
      "error",
      "double"
    ]
  }
}
```
