import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>TS homework</h1>
  </div>
`;

//---------------------------------------------------------------------------------
//Разминка
// Определите интерфейс для пользователя
interface User {
  id: number;
  name: string;
  email: string;
}

// Определите интерфейс для активности пользователя
interface Activity {
  userId: number;
  activity: string;
  timeStamp: Date;
}

// Реализуйте функцию fetchData используя Generic. Функция должна возвращать Promise.
async function fetchData<T>(url: string): Promise<T> {
  // Реализуйте получение данных с использованием fetch и возвращение их в формате json
  const response = await fetch(url);
  return response.json() as T;
}

// const data = await fetchData<User>('https://jsonplaceholder.typicode.com/users');

// Используйте Utility Types для создания Partial и Readonly версий User и Activity
type PartialUser = Partial<User>;
type ReadonlyActivity = Readonly<Activity>;

//Типизируйте функцию. userId - число
function getUserActivities(userId: Activity["userId"]): Promise<Activity[]> {
  return fetchData(`'https://jsonplaceholder.typicode.com/users/'${userId}`);
}

// const activities = await getUserActivities(1);

// Используйте ReturnType для создания типа возвращаемого значения функции getUserActivities
type ActivitiesReturnType = ReturnType<typeof getUserActivities>; // Заполните тип

// Используйте extends в условных типах для создания типа Permissions
type AdminPermissions = { canBanUser: boolean };
type BasicPermissions = { canEditProfile: boolean };

enum Role {
  Admin = "admin",
  Basic = "basic",
}

// Заполните тип. Должен выявляться на основне некоторого дженерика и опредять, какой из пермишенов выдавать: Admin или Basic.
type Permissions<T = Role.Basic> = T extends Role.Admin
  ? AdminPermissions
  : BasicPermissions;

const adminPermissions: Permissions<Role.Admin> = {
  canBanUser: true,
};

const basicPermissions: Permissions = {
  canEditProfile: true,
};

///ЧАСТЬ 2.
// Определите Type Alias для Union типа String или Number
type StringOrNumber = string | number; // Заполните тип

// Реализуйте функцию logMessage, которая принимает StringOrNumber и не возвращает значение (void)
function logMessage(message: StringOrNumber): void {
  // Реализуйте вывод сообщения в консоль
  console.log(message);
}

// Реализуйте функцию throwError, которая никогда не возвращает управление (never)
function throwError(errorMsg: string): never {
  // Бросьте исключение с errorMsg
  throw new Error(errorMsg);
}

// Реализуйте Type Guard для проверки, является ли значение строкой
function isString(value: StringOrNumber): value is string {
  // Верните результат проверки типа
  return typeof value === "string";
}

// Реализуйте функцию assertIsNumber, которая использует asserts для утверждения типа number
function assertIsNumber(value: any): asserts value is number {
  // Бросьте исключение, если значение не является числом
  if (typeof value !== "number") {
    throw new Error(`Expected number, got ${typeof value}`);
  }
}

// Завершите функцию processValue, используя isString и assertIsNumber
function processValue(value: StringOrNumber) {
  // Реализуйте логику проверки и обработки значения
  if (isString(value)) {
    console.log(`String value: ${value}`);
  } else {
    assertIsNumber(value);
    console.log(`Number value: ${value}`);
  }
}

console.log("");
console.log("-----------------");
console.log("Тест processValue");
console.log(processValue("Hello, world!"));
console.log(processValue(123));

//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 2: Расширенное использование Generics
// Цель: Создать универсальную функцию обработки данных, которая может работать с различными типами данных.

// Определите Generic интерфейс Response с одним параметром типа T. Второй параметр status: number
interface Response<T> {
  data: T;
  status: number;
}

// Реализуйте и типизируйте функцию, которая возвращает объект Response для переданных данных
function createResponse<T>(data: T, status: number): Response<T> {
  // Реализуйте создание и возврат объекта Response
  return { data, status };
}

console.log("");
console.log("-----------------");
console.log("Тест createResponse");

// Используйте функцию createResponse для создания ответа с массивом чисел
const numericResponse = createResponse([1, 2, 3], 4); // Заполните вызов функции
console.log(numericResponse);

// Используйте функцию createResponse для создания ответа с объектом пользователя (User)
const userResponse = createResponse<User>(
  { id: 1, name: "John", email: "123@mail.ru", age: 30 },
  1
); // Заполните вызов функции
console.log(userResponse);
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 3: Расширенное использование Generics
// Цель: Разработать несколько функций для обработки и различения типов данных.

// Определите тип данных для описания автомобиля
type Car = {
  company: string;
  model: string;
  year: number;
  make: string;
};

// Определите тип данных для описания велосипеда
type Bike = {
  company: string;
  type: "road" | "mountain";
  make: string;
};

// Создайте Type Guard для проверки, является ли объект автомобилем
function isCar(vehicle: Car | Bike): vehicle is Car {
  return "year" in vehicle;
}

// Используйте Type Guard в функции, которая печатает информацию о транспорте. Небольшая подсказка о том, какие параметры в себя может принимать isCar дана ниже.
function printVehicleInfo(vehicle: Car | Bike) {
  if (isCar(vehicle)) {
    console.log(`Car: ${vehicle.make} ${vehicle.model} ${vehicle.year}`);
  } else {
    console.log(`Bike: ${vehicle.make} ${vehicle.type}`);
  }
}

console.log("");
console.log("-----------------");
console.log("Тест printVehicleInfo");

console.log(
  printVehicleInfo({
    company: "Toyota",
    model: "Corolla",
    year: 2020,
    make: "Japan",
  })
);
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 4: Использование Utility Types для работы с интерфейсами
// Цель: Модифицировать интерфейсы для специфических нужд без изменения оригинальных интерфейсов.

// Определите интерфейс Employee
interface Employee {
  id: number;
  name: string;
  department: string;
  email: string;
}

// Используйте Utility Type для создания типа, который делает все свойства Employee опциональными
type PartialEmployee = Partial<Employee>; // Заполните тип

// Используйте Utility Type для создания типа, который делает все свойства Employee доступными только для чтения
type ReadonlyEmployee = Readonly<Employee>; // Заполните тип

// Создайте функцию, которая принимает PartialEmployee и выводит информацию о сотруднике
function printEmployeeInfo(employee: PartialEmployee) {
  // Реализуйте логику функции, обрабатывая случай отсутствующих свойств
  Array.from(Object.entries(employee)).forEach(([key, value]) => {
    if (value) {
      console.log(`${key}: ${value}`);
    } else {
      console.log(`${key}: not specified`);
    }
  });
}

console.log("");
console.log("-----------------");
console.log("Тест printEmployeeInfo");

console.log(printEmployeeInfo({ id: 1, name: "John", department: "IT" }));
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
//Задание 5: Работа с Indexed Access Types и Mapped Types
//Цель: Создать утилиты для работы с объектами и их ключами.

// Определите интерфейс для пользователя
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Используйте Indexed Access Types для получения типа поля name из User
type UserNameType = User["name"]; // Заполните тип

// Создайте Mapped Type, который преобразует все поля интерфейса User в boolean. Можно воспользовать конструкцией Key in keyof
type UserFieldsToBoolean = {
  [key in keyof User]: boolean;
};

const UserReference: Omit<User, "id"> = {
  name: "John",
  age: 30,
  email: "",
};

// Реализуйте функцию, которая принимает ключи интерфейса User и возвращает их типы
function getUserFieldType<T extends keyof typeof UserReference>(
  key: T,
  object: typeof UserReference
) {
  // Верните тип ключа
  return object[key];
}

console.log("");
console.log("-----------------");
console.log("Тест getUserFieldType");

const key = getUserFieldType("email", UserReference);
console.log(key);

// Используйте эту функцию для получения типа поля 'age' и 'name'
const ageType = getUserFieldType("age", UserReference);
console.log(ageType);
const nameType = getUserFieldType("name", UserReference);
console.log(nameType);
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 6: Расширение и ограничение Generics
// Цель: Создать универсальные функции с ограничениями типов.

// Создайте базовый интерфейс для сущностей с идентификатором
interface Identifiable {
  id: number;
}

// Типизируйте функцию, которая принимает массив объектов с ограничением на Generics, где каждый объект должен соответствовать интерфейсу Identifiable. Не забывайте, что find может вернуть undefined
function findById<T extends Identifiable[], U extends keyof T>(
  items: T,
  id: U
): Identifiable | undefined {
  return items.find((item) => item.id === id);
}

// Используйте эту функцию для поиска пользователя по id в массиве пользователей
const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
];

console.log("");
console.log("-----------------");
console.log("Тест findById");

const user = findById(users, 1);
console.log(user);
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 7: Работа с обобщённой функцией поиска в массиве
// Цель: Создать функцию, которая может искать элементы в массиве по разным критериям, включая составные типы и условия с использованием нескольких параметров в Generics.
interface User2 {
  id: number;
  name: string;
  age: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Book {
  isbn: string;
  title: string;
  author: string;
}

// Разберитесь с типизацией функции и поймите как она работает.
// Как можно улучшить функцию findInArray, чтобы она обрабатывала случаи, когда ключ или значение отсутствуют?
// Можно ли использовать эту функцию для поиска по нескольким ключам одновременно? Если да, как бы вы это реализовали?
function findInArray<T, K extends keyof T>(
  items: T[],
  key: K,
  value: T[K]
): T | undefined {
  return items.find((item) => item[key] === value);
}

// Поиск по нескольким ключам
function findAllInArray<T>(items: T[], searchObj: Partial<T>): T | undefined {
  return items.find((item) => {
    return Object.keys(searchObj).every((key) => {
      return item[key as keyof T] === searchObj[key as keyof T];
    });
  });
}

// Данные для тестирования функции
const usersss: User2[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
];

const products: Product[] = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Smartphone", price: 500 },
];

const books: Book[] = [
  { isbn: "12345", title: "The TypeScript Handbook", author: "Someone" },
  { isbn: "67890", title: "Learning TypeScript", author: "Another One" },
];

console.log("");
console.log("-----------------");
console.log("Тест findInArray и findAllInArray");
// 1. Найдите пользователя по имени "Alice".
const foundUser = findInArray(usersss, "name", "Alice");
console.log(foundUser);
// 2. Найдите продукт с ценой 500.
const foundProduct = findInArray(products, "price", 500);
console.log(foundProduct);
// 3. Найдите книгу по автору "Another One".
const foundBook = findInArray(books, "author", "Another One");
console.log(foundBook);

// 4. Поиск продукта по цене и названию
const foundProduct2 = findAllInArray(products, { name: "Laptop", price: 1000 });
console.log(foundProduct2);
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 8: Реализация обобщённой функции для сопоставления и преобразования элементов массива
// Цель: Создать функцию mapAndFilter, которая будет принимать массив объектов, функцию для их преобразования и функцию для фильтрации результатов. Функция должна использовать два параметра Generic: один для типа элементов входного массива, а другой для типа элементов выходного массива.

// Описание задачи: Функция mapAndFilter должна выполнить следующие функции:
// Применить функцию преобразования ко всем элементам входного массива.
// Фильтровать преобразованные элементы с помощью предоставленной функции фильтрации.
// Возвращать новый массив с результатами, которые прошли фильтрацию.
interface Person {
  name: string;
  age: number;
}

interface Adult {
  fullName: string;
  age: number;
}

// Напишите функцию mapAndFilter здесь. Используйте два параметра Generic: T для типа входных данных и U для типа выходных данных.
function mapAndFilter<T, U>(
  items: T[],
  transform: (item: T) => U,
  filter: (item: U) => boolean
): U[] {
  return items.map(transform).filter(filter);
}

// Пример данных
const people: Person[] = [
  { name: "Alice", age: 24 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 32 },
];

// Пример использования функции mapAndFilter
const adults: Adult[] = mapAndFilter(
  people,
  (person) => ({ fullName: person.name, age: person.age }),
  (adult) => adult.age >= 18
);

// Выведите результаты для проверки
console.log(adults);

//Вопросы после реализации:
// 1. Как изменится функция, если необходимо добавить возможность изменения критерия сортировки?
// Могут ли типы T и U быть полностью разными или должны иметь общие характеристики? Объясните ваш ответ.

//Ответы:
// 1. Скорее всего имелось в виду изменение критерия фильтрации. Ну и если так, то изменится только функция,
//    которую разработчик передает в функцию, если я все правильно понял...
// 2. Типы T и U могут быть полностью разными. Функция трансформации либо использует поля объекта T, либо возвращает
//    любое другое значение, не связанное с T
//---------------------------------------------------------------------------------
