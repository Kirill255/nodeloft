# nodeloft

https://habr.com/post/309936/


3 основных пакета-конкурента:

https://www.npmtrends.com/commander-vs-minimist-vs-yargs

доп:

https://npms.io/search?q=fs-extra


## Task

Есть сложная структура папок (обязательна вложенность папок) с файлами (тип файлов на ваш выбор - музыкальные, файлы изображений). Необходимо разобрать коллекцию, создав новую общую папку и расположив внутри все файлы по папкам в алфавитном порядке, т.е. все файлы начинающиеся на “a” должны быть в папке “A” и т.д.

Критерии оценивания:
Создана итоговая папка
Название внутренних папок совпадает с первыми буквами имен файлов находящихся в них
При реализации использовались callback функции

Дополнительно:
- исходная папка удалена
- путь к исходной и итоговой папкам, а также необходимость удаления исходной передавать в качестве параметров в командной строке


Легкий вариант: Можно пользоваться вспомогательными модулями.

Сложный: сделать нативными методами Node.js


## Run

`node index.js -f=testfolder -o=result`


## Error `EPERM` on Windows

https://github.com/jprichardson/node-fs-extra#windows
