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

Положить папку для сортировки/копирования в папку с программой (тоесть в корень)

`node index.js -f=testfolder -o=result`

`node index.js -f=testfolder -o=result -d`


## Options

```
-f or --folder: папка для сортировки и копирования

-o or --output: папка для результата, куда копировать

-d or --delete: удалить исходную папку после копирования, (необязательный) передавать без значения

```


## Error `EPERM` on Windows

https://github.com/jprichardson/node-fs-extra#windows


## Explanation

после checkFiles приходит массив с: там где был файл -> просто объект, там где была папка -> массив с объектами, тоесть таккой массив с возможными вложенными массивами:

```
files : [ { name: 'eee.txt', _path: 'testfolder\\eee.txt' },
  [ { name: 'eop.txt', _path: 'testfolder\\new1\\eop.txt' },
    { name: 'ooo.txt', _path: 'testfolder\\new1\\ooo.txt' } ],
  [ { name: 'ppp.txt', _path: 'testfolder\\new2\\ppp.txt' },
    { name: 'rwq.txt', _path: 'testfolder\\new2\\rwq.txt' },
    { name: 'sss.txt', _path: 'testfolder\\new2\\sss.txt' } ],
  [ [ [Array] ],
    { name: 'yyy.txt', _path: 'testfolder\\new3\\yyy.txt' } ],
  { name: 'rrr.txt', _path: 'testfolder\\rrr.txt' },
  { name: 'ttt.txt', _path: 'testfolder\\ttt.txt' } ]
```

после flattenArray нам уже приходит один развёрнутый массив, тоесть все вложенные массивы мы развернули:

```
files : [ { name: 'eee.txt', _path: 'testfolder\\eee.txt' },
  { name: 'eop.txt', _path: 'testfolder\\new1\\eop.txt' },
  { name: 'ooo.txt', _path: 'testfolder\\new1\\ooo.txt' },
  { name: 'ppp.txt', _path: 'testfolder\\new2\\ppp.txt' },
  { name: 'rwq.txt', _path: 'testfolder\\new2\\rwq.txt' },
  { name: 'sss.txt', _path: 'testfolder\\new2\\sss.txt' },
  { name: 'iii.txt',
    _path: 'testfolder\\new3\\new4\\new5\\iii.txt' },
  { name: 'trw.txt',
    _path: 'testfolder\\new3\\new4\\new5\\trw.txt' },
  { name: 'uuu.txt',
    _path: 'testfolder\\new3\\new4\\new5\\uuu.txt' },
  { name: 'yyy.txt', _path: 'testfolder\\new3\\yyy.txt' },
  { name: 'rrr.txt', _path: 'testfolder\\rrr.txt' },
  { name: 'ttt.txt', _path: 'testfolder\\ttt.txt' } ]
```

тоесть в итоге функция readDir вернёт нам вот этот результат, массив с вложенными объектами
