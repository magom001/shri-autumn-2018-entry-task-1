# Задание 1 — найди ошибки

В этом репозитории находятся материалы тестового задания "Найди ошибки" для [14-й Школы разработки интерфейсов](https://academy.yandex.ru/events/frontend/shri_msk-2018-2) (осень 2018, Москва, Санкт-Петербург, Симферополь).

Для работы тестового приложения нужен Node.JS v9. В проекте используются [Yandex Maps API](https://tech.yandex.ru/maps/doc/jsapi/2.1/quick-start/index-docpage/) и [ChartJS](http://www.chartjs.org).

## Задание

Код содержит ошибки разной степени критичности. Некоторые из них — стилистические, а другие — даже не позволят вам запустить приложение. Вам нужно найти все ошибки и исправить их.

Пункты для самопроверки:

1.  Приложение должно успешно запускаться.
1.  По адресу http://localhost:9000 должна открываться карта с метками.
1.  Должна правильно работать вся функциональность, перечисленная в условиях задания.
1.  Не должно быть лишнего кода.
1.  Все должно быть в едином codestyle.

## Запуск

```
npm i
npm start
```

При каждом запуске тестовые данные генерируются заново случайным образом.

## Решение

1.  После скачивания репозитория устанавливаем Eslint, создаем `.eslintrc`, исправляем все ошибки и предупреждения Eslint. Все var заменяем на `let` и `const`. Анонимные функции заменяем на стрелочные (в **details.js** это приведет к потере контекста, будет исправлено в дальнейшем). В **popup.js** находим необъявленную переменную htmlInfo. После анализа кода понимаем, что ее htmlInfo надо заменить на content.
2.  Добавляем в webpack.config.js `devtools: "source-map"` для более удобной отладки. В index.js правим импорт initMap. При попытке запуска приложения видим белый экран. Анализ html страницы в devtools показывает, что у контейнера с id map 0 высота. Прописываем в стилях min-height: 100vh. Перезагружаем приложение - отображается яндекс карта.
3.  Яндекс карта отображается, но никаких объектов на ней нет. Читаем документацию [ymaps](https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ObjectManager-docpage/). В одном из примеров видим, что объект objectManager нужно добавить к свойству geoObjects экземпляра ymaps. В map.js добавляем: `myMap.geoObjects.add(objectManager)`. На карте появляются метки... но не в Москве, а в Иране.
4.  Находим координаты Москвы, сравниваем с координатами места в Иране, в радиусе которого появляются метки. Делаем вывод, что перепутали местами долготу и широту. Ищем по всему проекту использование `long` и `lat`. В файле **mappers.js** меняем местами долготу и широту в `coordinates: [obj.lat, obj.long]`.
5.  При нажатии на станцию не отображаются детали. Вспоминаем, что в 1 шаге заменили все функции на стрелочные. В **details.js** переписываем обратно на анонимные функции. Открывается окно с информацией о станции, но график отображается некорректно. Изучаем документацию [chart.js](https://www.chartjs.org/docs/latest/axes/cartesian/linear.html). После trial and error обращаем внимание на:
   
    | **Name** | **Type** | **Default** | **Description**                                                                       |
    | -------- | -------- | ----------- | ------------------------------------------------------------------------------------- |
    | ...      | ...      | ...         | ...                                                                                   |
    | max      | Number   |             | User defined maximum number for the scale, overrides maximum value from data. more... |
    | ...      | ...      | ...         | ...                                                                                   |
    
    Удаляем `max` в options > scales > yAxes. График отображается корректно.
6. Кластеры отображаются зеленым цветом, в независимости от наличия в них неисправных дронов. Вновь изучаем документацию [ymaps](https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/objectManager.ClusterCollection-docpage/). В описании задания сказано:
    > Неисправные станции обозначаются на карте красным цветом, исправные — синим.
    > - Используя фильтр, можно отобразить на карте объекты с нужным состоянием — например, отобразить только неисправные. 
    > - Если неисправный объект входит в кластер, то иконка кластера должна показывать, что в нем есть неисправная станция.
    
    В **map.js** удаляем строку
    ```
     objectManager.clusters.options.set("preset", "islands#greenClusterIcons");
     ```
     Кластеры отображаются согласно условиям задания.
