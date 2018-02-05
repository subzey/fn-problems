Это набор упражнений на расширение сознания в области JavaScript.

В директории /impl/ лежат несколько файлов .js, ваша задача - их реализовать.

Для удобства рядом с каждым .js файлом лежит файл `.d.ts`, это тайпинги TypeScript, их редактировать не нужно (только разве что вам захочется всё написать на TS, хозяин - барин).

## Как подготовить проект

Достаточно склонировать (или скачать и распаковать) этот репозиторий куда-нибудь и там запустить `npm install`.


## Как проверить правильность решения

```sh
npm test
```

Тест-раннер Jest укажет вам на ошибки, если они есть.

Если хочется запустить только отдельные тесты, можно запустить, например, `npm test debounce`.

## Упражнения

Разумеется, всё это уже давно реализовано, но цель упражнений - именно написать это руками, не пользуясь копипастом и npm'ом.

Все решения - в пару строчек, дерзайте и не бойтесь.

### Memoize

Паттерн мемоизация. Цель - не вызывать обёрную функцию когда это не нужно, т.е., когда значение для аргумента уже было посчитано ранее.

_Упражнение позволяет разобраться с замыканиями._

### Debounce

Обёрнутая функция вызывается только спустя определённое время после последнего вызова оборачивающей.

Звучит сложно, но всё проще, чем кажется. Предположим, нам мы следим за событиями `scroll`, и хотим. чтобы что-то произошло через 50 мс после того, как юзер перестал скроллить.

```js
document.addEventListener(
	'scroll',
	debounce(onScroll, 50)
)
```

_Упражнение на замыкания и таймеры._

### Bind

Хардкор из прошлого. Цель - повторить реализацию `.bind()`: вызов `someFunc.myBind(ctx, arg1, arg2)` должен вернуть функцию с "прибитыми гвоздями" `this` и первыми двумя аргументами.

Вы можете, конечно, смухлевать и просто написать `Function.prototype.myBind = Function.prototype.bind`, но, наверное, интереснее будет реализовать самостоятельно.

_Упражнение на замыкания и `this`._