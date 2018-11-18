# nodeloft

https://habr.com/post/309936/


3 основных пакета-конкурента:

https://www.npmtrends.com/commander-vs-minimist-vs-yargs

доп:

https://npms.io/search?q=fs-extra


## Run

`node index.js -f=testfolder`

результат примерно такой: (я пока не понял как сделать чтобы вывод был сгруппирован по папкам и файлам, а не в разброс, попробовал несколько способов, рузультат разный, но во всех случаях не тот что нужен)

```
Работаем!
File: eee.txt
Dir: new1
  File: ooo.txt
Dir: new2
  File: ppp.txt
  File: sss.txt
Dir: new3
  Dir: new4
    Dir: new5
      File: iii.txt
      File: uuu.txt
  File: yyy.txt
File: rrr.txt
File: ttt.txt
Всё сделано!
```
желаемый

```
Работаем!
Dir: new1
  File: ooo.txt
Dir: new2
  File: ppp.txt
  File: sss.txt
Dir: new3
  Dir: new4
    Dir: new5
      File: iii.txt
      File: uuu.txt
  File: yyy.txt
File: eee.txt
File: rrr.txt
File: ttt.txt
Всё сделано!
```
