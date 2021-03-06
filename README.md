# fn-problems

Это набор упражнений на расширение сознания в области JavaScript.

В директории `/impl/` лежат несколько файлов-заготовок `.js`, ваша задача — реализовать на их основе приведённые ниже задания.

Для удобства рядом с каждым `.js` файлом лежит файл `.d.ts`, это тайпинги TypeScript, их редактировать не нужно (только разве что вам захочется всё написать на TS, хозяин-барин).

## Как подготовить проект

Достаточно [склонировать](https://github.com/subzey/fn-problems.git) (или [скачать и распаковать](https://github.com/subzey/fn-problems/archive/master.zip)) этот репозиторий куда-нибудь и в нём запустить `npm install`.

## Как проверить правильность решения

Выполните команду `npm test`. Тест-раннер Jest укажет вам на ошибки, если они есть.

Если хочется запустить только отдельные тесты, можно запустить, например, `npm test debounce`.

## Упражнения

Разумеется, всё это уже давно реализовано в библиотеках, но цель упражнений — именно написать самостоятельно, не пользуясь копипастом и npm'ом.

Все решения — в пару строчек — дерзайте и не бойтесь.

### Memoize

> Упражнение позволяет разобраться с замыканиями.

Паттерн «мемоизация». Цель — не вызывать обёрнутую функцию когда это не нужно, если значение для аргумента уже было посчитано ранее. Паттерн может использоваться в ситуациях, когда у нас есть тяжёлая функция, результат которой однозначно определяется входными аргументами (такую функцию называют «детерминированной»). Тогда мы можем заменить такую функцию её мемоизированной версией без потери исходного смысла, но с прибавкой в производительности.

### Debounce

> Упражнение на замыкания и таймеры.

Обёрнутая функция вызывается только спустя определённое время после последнего вызова оборачивающей.

Звучит сложно, но всё проще, чем кажется. Предположим, мы следим за событиями `scroll`, и хотим, чтобы что-то произошло через 50 мс после того, как юзер перестал скроллить. Плёвое дело — для этого обернём хендлер нашего скролла в `debounce`.

```js
document.addEventListener(
	'scroll',
	debounce(onScroll, 50)
)
```

### Bind

> Упражнение на замыкания и `this`.

Хардкор из прошлого. Цель — повторить реализацию `.bind()`: вызов `someFunc.myBind(ctx, arg1, arg2)` должен вернуть функцию с «прибитыми гвоздями» `this` и первыми двумя аргументами.

Вы можете, конечно, смухлевать и просто написать `Function.prototype.myBind = Function.prototype.bind`, но, наверное, интереснее будет реализовать этот метод самостоятельно. Прибитый на гвозди `this` позволяет передать функцию (чаще — метод) третьей стороне, не опасаясь того, что данная функция будет выполнена в некорректном контексте.

```js
element.addEventListener(
	'click',
	someWidget.someMethod.myBind(someWidget)
)
```

Удачи!
