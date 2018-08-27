# JSON-server, concurrently и запуск сервера

Проект использует в качестве сервера json-server и concurrently для запуска сервера одной командой.
Для запуска проекта наберите `npm run dev`. Сервер разработки стартует на `http://localhost:4200`, json-server - `http://localhost:3000`.

# ВНЕСЕННЫЕ ИЗМЕНЕНИЯ (версия 2)

Александр, в соответствии с Вашими замечаниями я внес следующие изменения:

1 - Исправил ошибку работы окна редактирования сотрудника. Хендлер открытия модального окна принимает (-1) или id редактируемого сотрудника, по которому с помощью метода .filter() из массива employees получает нужного сотрудника;

2 - Заменил отображение в поле "должность" строки "не задано" c присвоения значения на отображение с помощью pipe,
    теперь при открытии окна редактирования строка остается пустой;
    
3 - Теперь список справочных значений типов занятости приложение получает через отдельный сервис по отдельному запросу с сервера;

4 - AuthService удален;

5 - DataService переименован в UserService;

6 - Контрол смены поля, по которому выполняется фильтрация, сделан на дропдауне, потому, что я хотел попробовать, как это работает,
    если это критично, исправлю на <select>,
    исправил проблему с тем, что пользователь не видит по какому параметру происходит фильтрация;
  
7 - Структура папок изменена (на самом деле предложенная Вами структура мне непонятна, я попробовал ее исправить как смог, прошу особо
    не кидаться какахами);
    
8 - В LoginComponent.ts функция-валидатор checkForLength удалена и заменена на стандартный валидатор minLength;

9 - переработано поведение системы для отображения списка сотрудников после  его изменения без запроса на сервер (с использованием в 
    EmployeesService BehaviorSubject); 

10 - Стиль has-error - это стандартный стиль Bootstrap, он вешается в форме редактирования сотрудника для того, чтобы инпут приобретал 
    красную рамку, если он не валиден;

11 - Махинации с delay(n) вынесены в EmployeesService;

12 - URL сервера из shared/employees.service.ts перенесен  environment-файл;

13 - Наименования классов CSS изменены на более информативные.

# StuffBase

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development serve

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
