// Типы
type  level = 'junior' | 'middle' | 'senior'

export interface SubQuestion {
    text: string;
    sampleAnswer: string
    level?: level
}

export interface Question {
    text: string;
    maxScore: number;
    level?: level;
    sampleAnswer: string;
    subQuestions: SubQuestion[];
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export enum Categories {
    JavaScript = 'JavaScript & ES6+',
    TypeScript = 'TypeScript',
    React = 'React & State Management',
    CSS = 'Верстка & CSS',
    HTTP = 'HTTP & HTTPS',
    Storage = 'Браузерные хранилища',
    Build = 'Сборка, CI/CD',
    Tests = 'Тестирование',
    Api = 'Работа с API'
}

export interface QuestionCategory {
    category: Categories;
    weight: number;
    questions: Question[];
}

export const MINI_TASKS = {
    [Categories.JavaScript]: [
        {
            title: 'Порядок вывода?',
            code: `console.log('start');

        setTimeout(() => {
          console.log('timeout');
        }, 0);

        queueMicrotask(() => {
          console.log('microtask');
        });

        Promise.resolve().then(() => {
          console.log('promise');
        });

        console.log('end');`,
            expected: 'start, end, microtask, promise, timeout',
            explanation: '`queueMicrotask` и `Promise.then()` — микрозадачи, выполняются после текущего стека, но до `setTimeout`.',
        },
        {
            title: 'Что вернёт последний вызов? Как это работает?',
            code: `const module = (function() {
  let privateValue = 0;

  const currentValue = () => privateValue;

  return {
    increment: () => ++privateValue,
    logger: {
      log: (function() {
        const snapshot = privateValue;
        return () => console.log(snapshot);
      })(),
      getValue: () => privateValue
    }
  };
})();

module.increment();
module.logger.log(); // ?
module.increment();
console.log(module.logger.getValue()); // ?`,
            expected: '0\n2',
            explanation: '`logger.log` — это замыкание на момент создания модуля: оно захватило `privateValue = 0`. Даже после инкрементов, `log` продолжает ссылаться на старое окружение. `getValue` читает актуальное значение.',
            hint: 'Помните: замыкание фиксирует переменную, но не её значение.',
        }
    ],
    [Categories.TypeScript]: [
        {
            title: 'Почему ошибка?',
            code: `interface User {
  name: string;
}
const user = {} as User;
console.log(user.name);`,
            expected: 'Объект пустой. Утверждение типа не гарантирует наличие данных.',
        },
    ],
    [Categories.React]: [
        {
            title: 'Почему компонент не перерисовывается?',
            code: `function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => {
    count++; // ❌
  };
  return <button onClick={increment}>{count}</button>;
}`,
            expected: 'Нужно использовать setCount(count + 1). Прямое изменение state не работает.',
        },
        {
            title: 'Где утечка памяти?',
            code: `useEffect(() => {
  const interval = setInterval(() => {
    console.log('tick');
  }, 1000);
}, []);`,
            expected: 'Нет cleanup. Нужно: return () => clearInterval(interval);',
        },
    ],
    [Categories.CSS]: [
        {
            title: 'Как центрировать элемент?',
            code: `.center {
  position: absolute;
  top: 50%;
  left: 50%;
  /* Что дальше? */
}`,
            expected: 'transform: translate(-50%, -50%);',
        },
        {
            title: 'Почему текст "прыгает" при анимации?',
            code: `.animate:hover {
  opacity: 0.8;
  transform: scale(1.02);
}`,
            expected: 'Анимация вызывает repaint. Лучше: только transform и opacity.',
        },
    ],
    [Categories.HTTP]: [
        {
            title: 'Почему CORS блокирует запрос?',
            code: `fetch('https://api.external.com/data')
  .then(r => r.json())
  .then(console.log);`,
            expected: 'CORS. Нужен backend-прокси или сервер должен отправлять Access-Control-Allow-Origin.',
        },
    ],
    [Categories.Storage]: [
        {
            title: 'Почему данные не сохраняются?',
            code: `localStorage.user = { name: 'John' };
console.log(localStorage.user);`,
            expected: 'Нужно: JSON.stringify / JSON.parse. Объект превращается в "[object Object]".',
        },
    ],
    [Categories.Build]: [
        {
            title: 'Как уменьшить размер бандла?',
            code: `import _ from 'lodash'; // весь lodash`,
            expected: 'Импортируйте отдельные функции: import debounce from "lodash/debounce";',
        },
    ],
    [Categories.Tests]: [
        {
            title: 'Как дождаться асинхронного рендера?',
            code: `render(<AsyncComponent />);
expect(screen.getByText('Loaded')).toBeInTheDocument();`,
            expected: 'Используйте waitFor или findByText — getByText не ждёт.',
        },
    ],
    [Categories.Api]: [
        {
            title: 'Как избежать дублирующих запросов?',
            code: `useEffect(() => {
  fetch('/api/user');
}, [userId]);`,
            expected: 'Используйте debounce, abortController или memoization.',
        },
    ],
};

export const questions: QuestionCategory[] = [
    {
        category: Categories.JavaScript,
        weight: 20,
        questions: [
            // === Существующий вопрос о замыканиях (можно оставить или чуть улучшить) ===
            {
                text: "Объясните, как работает замыкание. Приведите пример, где оно используется в реальной практике.",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "Замыкание — функция, сохраняющая доступ к переменным из внешней области видимости. Используется в каррировании, кешировании, модулях, `debounce/throttle`.",
                subQuestions: [
                    {
                        text: "Что такое лексическое окружение?",
                        sampleAnswer: "Контекст, в котором была объявлена функция, и доступ к переменным в этой области.",
                        level: 'junior'
                    },
                    {
                        text: "Может ли внутренняя функция изменять переменные внешней?",
                        sampleAnswer: "Да, замыкание предоставляет полный доступ на чтение и запись.",
                        level: 'junior'
                    },
                    {
                        text: "Приведите простой пример замыкания с подсчётом вызовов.",
                        sampleAnswer: "function createCounter() { let count = 0; return () => ++count; }",
                        level: 'junior'
                    },
                    {
                        text: "Может ли замыкание привести к утечкам памяти? Как избежать?",
                        sampleAnswer: "Да, если удерживает большие объекты или DOM-узлы. Очищайте ссылки при необходимости.",
                        level: 'middle'
                    },
                    {
                        text: "Как замыкания используются в реализации `debounce`?",
                        sampleAnswer: "`debounce` хранит `timeoutId` в замыкании, чтобы отменить предыдущий таймер при новом вызове.",
                        level: 'middle'
                    },
                    {
                        text: "Что будет выведено: `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i), 100)`?",
                        sampleAnswer: "Три раза `3`. Переменная `i` одна на всё замыкание из-за `var`.",
                        level: 'middle'
                    },
                    {
                        text: "Как использовать замыкания для создания приватных полей до `#private`?",
                        sampleAnswer: "Объявите переменную в конструкторе или фабричной функции — она будет доступна только через замыкание.",
                        level: 'senior'
                    },
                    {
                        text: "Как замыкания влияют на производительность при создании большого количества функций?",
                        sampleAnswer: "Каждое замыкание хранит ссылку на внешнее окружение — может увеличить потребление памяти.",
                        level: 'senior'
                    },
                    {
                        text: "Как отследить утечку памяти через замыкания в Chrome DevTools?",
                        sampleAnswer: "Heap Snapshot → ищите closure-переменные с долгоживущими ссылками на большие объекты.",
                        level: 'senior'
                    }
                ]
            },

            // === Существующий вопрос о Event Loop ===
            {
                text: "Как работает Event Loop? Приведите пример, где `Promise` выполняется раньше, чем `setTimeout(0)`.",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "Event Loop обрабатывает микрозадачи (`Promise`) до макрозадач (`setTimeout`). Поэтому `Promise.then()` выполнится перед `setTimeout(0)`.",
                subQuestions: [
                    {
                        text: "Что такое асинхронность в JavaScript?",
                        sampleAnswer: "Выполнение операций без блокировки основного потока.",
                        level: 'junior'
                    },
                    {
                        text: "Что делает `setTimeout(fn, 0)`?",
                        sampleAnswer: "Помещает `fn` в очередь макрозадач — выполнится после текущего стека.",
                        level: 'junior'
                    },
                    {
                        text: "Может ли `Promise` выполниться синхронно?",
                        sampleAnswer: "Нет. Даже `Promise.resolve()` попадает в микрозадачи.",
                        level: 'junior'
                    },
                    {
                        text: "Почему `Promise.resolve().then(() => console.log('a')); setTimeout(() => console.log('b'), 0);` выводит 'a', потом 'b'?",
                        sampleAnswer: "Микрозадачи выполняются до следующей макрозадачи.",
                        level: 'middle'
                    },
                    {
                        text: "Что такое `queueMicrotask` и чем он отличается от `Promise.resolve().then()`?",
                        sampleAnswer: "То же — микрозадача. `queueMicrotask` — прямой API, без создания промиса.",
                        level: 'middle'
                    },
                    {
                        text: "Какой порядок выполнения: `setTimeout`, `Promise`, `process.nextTick` (Node.js)?",
                        sampleAnswer: "`process.nextTick` → `Promise` → `setTimeout` (в Node.js `nextTick` приоритетнее).",
                        level: 'middle'
                    },
                    {
                        text: "Как Event Loop влияет на производительность UI при множестве микрозадач?",
                        sampleAnswer: "Микрозадачи блокируют рендер. При их избытке UI может «подвисать».",
                        level: 'senior'
                    },
                    {
                        text: "Как симулировать макрозадачу без `setTimeout`?",
                        sampleAnswer: "Через `MessageChannel` или `postMessage` — это чистые способы отложить выполнение.",
                        level: 'senior'
                    },
                    {
                        text: "Почему `Promise` внутри `setTimeout` выполняется после следующего `setTimeout`?",
                        sampleAnswer: "Каждый `setTimeout` — новая макрозадача. Микрозадачи выполняются только в рамках своей макрозадачи.",
                        level: 'senior'
                    }
                ]
            },

            // === НОВЫЙ: Работа с объектами и иммутабельность ===
            {
                text: "Как правильно клонировать объект в JavaScript? Сравните поверхностное и глубокое копирование.",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "Поверхностно: `{...obj}`, `Object.assign`. Глубоко: `JSON.parse(JSON.stringify())` (ограничения!) или рекурсия. Для сложных случаев — библиотеки или `structuredClone()`.",
                subQuestions: [
                    {
                        text: "Что такое `spread`-оператор (`...`) и как он работает с объектами?",
                        sampleAnswer: "Копирует свойства одного объекта в другой. Поверхностная копия.",
                        level: 'junior'
                    },
                    {
                        text: "Что выведет `const a = { x: 1 }; const b = { ...a }; b.x = 2; console.log(a.x)`?",
                        sampleAnswer: "1. `b` — новый объект, изменения не влияют на `a`.",
                        level: 'junior'
                    },
                    {
                        text: "Почему `JSON.parse(JSON.stringify(obj))` не всегда безопасен?",
                        sampleAnswer: "Теряет `undefined`, `Symbol`, `Function`, циклические ссылки, `Date` становится строкой.",
                        level: 'middle'
                    },
                    {
                        text: "Как работает `structuredClone()` и чем он лучше `JSON`-хака?",
                        sampleAnswer: "Поддерживает `Date`, `RegExp`, циклы, `ArrayBuffer`. Но не поддерживает `Function`.",
                        level: 'middle'
                    },
                    {
                        text: "Как проверить, что два объекта одинаковы по содержимому?",
                        sampleAnswer: "Используйте `isEqual` из Lodash или напишите рекурсивную функцию с `Object.keys`.",
                        level: 'middle'
                    },
                    {
                        text: "Как создать неизменяемый объект?",
                        sampleAnswer: "Используйте `Object.freeze(obj)`. Не глубокое, но базовая защита.",
                        level: 'middle'
                    },
                    {
                        text: "Как реализовать глубокое замораживание объекта?",
                        sampleAnswer: "Рекурсивно проходите по всем полям и вызывайте `Object.freeze`.",
                        level: 'senior'
                    },
                    {
                        text: "Какие проблемы у `==` и когда использовать `===`?",
                        sampleAnswer: "`==` приводит типы. `===` — строгое сравнение. Всегда используйте `===`.",
                        level: 'senior'
                    },
                    {
                        text: "Как безопасно проверить, содержит ли объект ключ?",
                        sampleAnswer: "Используйте `Object.hasOwn(obj, 'key')` вместо `obj.hasOwnProperty`.",
                        level: 'senior'
                    }
                ]
            },

            // === НОВЫЙ: Классы, прототипы, private поля ===
            {
                text: "Чем классы в JavaScript отличаются от классов в других языках? Как работает прототипное наследование?",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "JS использует прототипное наследование. Классы — синтаксический сахар над функциями-конструкторами. `this` и `super` работают через цепочку прототипов.",
                subQuestions: [
                    {
                        text: "Что такое прототип в JavaScript?",
                        sampleAnswer: "Свойство `prototype` функции, которое становится `__proto__` у экземпляра.",
                        level: 'junior'
                    },
                    {
                        text: "Как создать объект с определённым прототипом?",
                        sampleAnswer: "Через `Object.create(proto)`.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое `new` и что он делает?",
                        sampleAnswer: "Создаёт объект, связывает с прототипом, вызывает конструктор с `this`.",
                        level: 'junior'
                    },
                    {
                        text: "Чем `class` отличается от функции-конструктора?",
                        sampleAnswer: "Синтаксис, поведение `super`, `static`, `extends`. Но под капотом — то же самое.",
                        level: 'middle'
                    },
                    {
                        text: "Как работает `super` в методах и конструкторе?",
                        sampleAnswer: "Вызывает родительский метод. В конструкторе — только после `this`.",
                        level: 'middle'
                    },
                    {
                        text: "Что такое `#private` поля и как они работают?",
                        sampleAnswer: "Приватные поля, доступны только внутри класса. Не наследуются, не видны снаружи.",
                        level: 'middle'
                    },
                    {
                        text: "Можно ли получить доступ к `#private` полю извне?",
                        sampleAnswer: "Только через замыкания или геттеры. Напрямую — нет.",
                        level: 'senior'
                    },
                    {
                        text: "Как реализовать статическую фабрику в классе?",
                        sampleAnswer: "Статический метод, возвращающий экземпляр: `User.fromData(data)`.",
                        level: 'senior'
                    },
                    {
                        text: "Какие подводные камни у `this` в колбэках?",
                        sampleAnswer: "`this` теряется. Решение: стрелочные функции, `.bind(this)` или классовые поля.",
                        level: 'senior'
                    }
                ]
            },

            // === НОВЫЙ: Современные возможности JS (ESNext) ===
            {
                text: "Какие современные возможности JavaScript вы используете регулярно? Объясните, зачем нужны `?.`, `??`, `at()`, `AbortController`.",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "`?.` — безопасный доступ. `??` — нулевое слияние. `at()` — индекс с конца. `AbortController` — отмена асинхронных операций.",
                subQuestions: [
                    {
                        text: "Что делает `obj?.prop`?",
                        sampleAnswer: "Проверяет, существует ли `obj`, и только тогда читает `prop`. Избегает ошибки.",
                        level: 'junior'
                    },
                    {
                        text: "Чем `??` отличается от `||`?",
                        sampleAnswer: "`||` проверяет falsy значения. `??` — только `null/undefined`.",
                        level: 'junior'
                    },
                    {
                        text: "Как получить последний элемент массива с помощью `at()`?",
                        sampleAnswer: "`arr.at(-1)` — последний, `arr.at(-2)` — предпоследний.",
                        level: 'junior'
                    },
                    {
                        text: "Зачем нужен `AbortController`?",
                        sampleAnswer: "Для отмены `fetch`, `setTimeout`, `EventTarget`. Удобно при выходе из компонента.",
                        level: 'middle'
                    },
                    {
                        text: "Как использовать `AbortController` с `fetch`?",
                        sampleAnswer: "Передайте `signal` в опции: `fetch(url, { signal })`, затем `controller.abort()`.",
                        level: 'middle'
                    },
                    {
                        text: "Что такое `Object.hasOwn(obj, key)` и чем он лучше `obj.hasOwnProperty`?",
                        sampleAnswer: "`hasOwn` — безопаснее, не ломается, если `hasOwnProperty` перезаписан.",
                        level: 'middle'
                    },
                    {
                        text: "Как работает `Intl` API? Приведите пример форматирования даты.",
                        sampleAnswer: "`new Intl.DateTimeFormat('ru-RU').format(date)` — локализованная дата.",
                        level: 'senior'
                    },
                    {
                        text: "Как сериализовать объект с циклическими ссылками?",
                        sampleAnswer: "Используйте `structuredClone()` или кастомный `replacer` в `JSON.stringify`.",
                        level: 'senior'
                    },
                    {
                        text: "Какие новые методы массивов появились недавно? (`findLast`, `toReversed` и др.)",
                        sampleAnswer: "`toSorted`, `toReversed`, `toSpliced`, `with` — не мутируют оригинал. Полезны в React.",
                        level: 'senior'
                    }
                ]
            }
        ]
    },
    {
        category: Categories.TypeScript,
        weight: 15,
        questions: [
            {
                text: "TypeScript не работает на рантайме. Как гарантировать, что данные с API соответствуют ожидаемому типу?",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "TypeScript удаляется при компиляции. Для валидации на рантайме используйте type guards, `zod` или ручные проверки. Оператор `as` небезопасен.",
                subQuestions: [
                    {
                        text: "Что делает `as` в TypeScript?",
                        sampleAnswer: "Принудительное приведение типа. Не проверяет данные.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое `any` и почему его стоит избегать?",
                        sampleAnswer: "`any` отключает проверку типов. Ломает безопасность. Используйте `unknown`.",
                        level: 'junior'
                    },
                    {
                        text: "Может ли TypeScript предотвратить ошибку `Cannot read property 'x' of undefined`?",
                        sampleAnswer: "Только если тип указан как `T | undefined`. Без проверки — нет.",
                        level: 'junior'
                    },
                    {
                        text: "Почему `response.json() as User` — плохая практика?",
                        sampleAnswer: "`as` не проверяет структуру. Опасно при некорректных данных от API.",
                        level: 'middle'
                    },
                    {
                        text: "Что такое type guard и как его написать для объекта с полем `type`?",
                        sampleAnswer: "Функция, возвращающая `obj is Type`. Пример: `'type' in obj && obj.type === 'user'`.",
                        level: 'middle'
                    },
                    {
                        text: "Как синхронизировать типы с бэкендом, чтобы не писать их вручную?",
                        sampleAnswer: "Генерируйте из OpenAPI/Swagger с помощью `openapi-typescript` или `tsoa`.",
                        level: 'middle'
                    },
                    {
                        text: "Как реализовать безопасный парсер JSON с валидацией типа?",
                        sampleAnswer: "Оберните `JSON.parse` в try/catch и проверьте тип с помощью `zod`.",
                        level: 'senior'
                    },
                    {
                        text: "Как типизировать динамический ключ объекта, если известно, что он из перечисления?",
                        sampleAnswer: "Используйте `keyof typeof enum` или `as const`.",
                        level: 'senior'
                    },
                    {
                        text: "Как предотвратить `type widening` в массивах и объектах?",
                        sampleAnswer: "Используйте `as const` или явно указывайте тип.",
                        level: 'senior'
                    }
                ]
            },
            {
                text: "В чём разница между `interface` и `type`? Когда что использовать?",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "`interface` поддерживает наследование и слияние объявлений. `type` — гибче для объединений и условных типов. Используйте `interface` для объектов, `type` — для сложных типов.",
                subQuestions: [
                    {
                        text: "Можно ли объединить два `interface` с одинаковым именем?",
                        sampleAnswer: "Да. TypeScript объединит их — это declaration merging.",
                        level: 'junior'
                    },
                    {
                        text: "Можно ли использовать `type` для описания объекта?",
                        sampleAnswer: "Да, например: `type User = { name: string }`.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое `extends` в TypeScript?",
                        sampleAnswer: "Позволяет одному типу/интерфейсу наследовать свойства другого.",
                        level: 'junior'
                    },
                    {
                        text: "Как сделать тип, который делает все поля объекта опциональными, но только на один уровень?",
                        sampleAnswer: "Используйте `Partial<T>`. Для глубокой версии — рекурсивный тип.",
                        level: 'middle'
                    },
                    {
                        text: "Как типизировать функцию, возвращающую разные типы в зависимости от аргумента?",
                        sampleAnswer: "Через перегрузки или дженерики с условными типами.",
                        level: 'middle'
                    },
                    {
                        text: "Когда `interface` предпочтительнее `type`?",
                        sampleAnswer: "Когда ожидается расширение или declaration merging.",
                        level: 'middle'
                    },
                    {
                        text: "Как типизировать тип, который запрещает определённые поля (например, исключить `id`)?",
                        sampleAnswer: "Используйте `Omit<T, 'id'>`.",
                        level: 'senior'
                    },
                    {
                        text: "Как создать тип, который позволяет только определённые значения (например, 'small' | 'large')?",
                        sampleAnswer: "Используйте literal types: `type Size = 'small' | 'large'`.",
                        level: 'senior'
                    },
                    {
                        text: "Как типизировать функцию с необязательными параметрами и разными возвращаемыми типами?",
                        sampleAnswer: "Через перегрузки или дженерики с `undefined` и условным типом.",
                        level: 'senior'
                    }
                ]
            }
        ]
    },
    {
        category: Categories.React,
        weight: 20,
        questions: [
            {
                text: "Почему React перерисовывает компонент, если передать ему новый объект в пропсах, даже если данные не изменились? Как оптимизировать?",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "React сравнивает пропсы по ссылке. Новый объект — новая ссылка. Оптимизируйте с помощью `React.memo`, `useMemo`, `useCallback`.",
                subQuestions: [
                    {
                        text: "Что такое пропсы в React и могут ли они меняться?",
                        sampleAnswer: "Пропсы — входные данные. Немутабельны внутри компонента.",
                        level: 'junior'
                    },
                    {
                        text: "Что значит, что объекты сравниваются по ссылке?",
                        sampleAnswer: "Два объекта с одинаковыми полями — разные ссылки. `{} === {}` → false.",
                        level: 'junior'
                    },
                    {
                        text: "Как предотвратить ререндер дочернего компонента при ререндере родителя?",
                        sampleAnswer: "Используйте `React.memo` для мемоизации по пропсам.",
                        level: 'junior'
                    },
                    {
                        text: "Когда `useEffect` с пустым массивом зависимостей может сработать дважды в development?",
                        sampleAnswer: "В `StrictMode` React монтирует и размонтирует компонент дважды.",
                        level: 'middle'
                    },
                    {
                        text: "Как работает `key` в списке? Почему `index` — плохой выбор?",
                        sampleAnswer: "Key помогает React идентифицировать элементы. `index` ломает состояние при reorder.",
                        level: 'middle'
                    },
                    {
                        text: "Как использовать `useCallback`, чтобы предотвратить передачу новой функции на каждый ререндер?",
                        sampleAnswer: "`useCallback(fn, deps)` кэширует функцию, пока зависимости не изменились.",
                        level: 'middle'
                    },
                    {
                        text: "Как отследить ненужные ререндеры в приложении и измерить их влияние на производительность?",
                        sampleAnswer: "Используйте React DevTools Profiler и Highlight Rerenders.",
                        level: 'senior'
                    },
                    {
                        text: "Когда мемоизация (`useMemo`, `React.memo`) может навредить производительности?",
                        sampleAnswer: "При избыточном использовании — накладные расходы на сравнение превышают пользу.",
                        level: 'senior'
                    },
                    {
                        text: "Как реализовать глубокое сравнение пропсов в `React.memo` без `JSON.stringify`?",
                        sampleAnswer: "Напишите кастомную функцию сравнения через рекурсивный обход или `isEqual`.",
                        level: 'senior'
                    }
                ]
            },
            {
                text: "Как управлять состоянием формы с несколькими полями в React без использования внешних библиотек?",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "Используйте `useState` с объектом или `useReducer`. Обновляйте поля через `onChange`, валидируйте при отправке.",
                subQuestions: [
                    {
                        text: "Как обновить значение инпута в состоянии при вводе?",
                        sampleAnswer: "Через `onChange` и `setState`, передавая `event.target.value`.",
                        level: 'junior'
                    },
                    {
                        text: "Как передать `onChange` в дочерний компонент?",
                        sampleAnswer: "Как пропс: `<Input onChange={handleChange} />`.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое контролируемый компонент?",
                        sampleAnswer: "Компонент, значение которого управляется React через `value` и `onChange`.",
                        level: 'junior'
                    },
                    {
                        text: "Когда использовать `useReducer` вместо `useState` для формы?",
                        sampleAnswer: "При сложной логике, множестве полей или асинхронных действиях.",
                        level: 'middle'
                    },
                    {
                        text: "Как управлять состоянием нескольких форм на одной странице?",
                        sampleAnswer: "Разделите состояние. Используйте контекст или отдельные `useState`.",
                        level: 'middle'
                    },
                    {
                        text: "Как сбросить форму после отправки?",
                        sampleAnswer: "Установите состояние в начальное значение через `setState(initialState)`.",
                        level: 'middle'
                    },
                    {
                        text: "Как реализовать валидацию в реальном времени без лагов?",
                        sampleAnswer: "Используйте `debounce` и `useMemo` для кэширования результата.",
                        level: 'senior'
                    },
                    {
                        text: "Как сохранить состояние формы при навигации (например, между шагами)?",
                        sampleAnswer: "Храните в верхнем компоненте, `localStorage`, URL или кастомном хуке.",
                        level: 'senior'
                    },
                    {
                        text: "Как протестировать сложную форму с валидацией и асинхронной отправкой?",
                        sampleAnswer: "Симулируйте ввод, проверяйте ошибки, мокайте API, используйте `findByText`.",
                        level: 'senior'
                    }
                ]
            },
            {
                text: "Как работает `useRef` и чем он отличается от `useState`? Когда `useRef` не вызывает ререндер?",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "`useRef` хранит изменяемое значение между ререндерами без вызова перерисовки. `useState` — для состояния, влияющего на UI.",
                subQuestions: [
                    {
                        text: "Что такое `ref` в React?",
                        sampleAnswer: "Ссылка на DOM-элемент или произвольное изменяемое значение.",
                        level: 'junior'
                    },
                    {
                        text: "Как создать `ref`?",
                        sampleAnswer: "Через `useRef(initialValue)`.",
                        level: 'junior'
                    },
                    {
                        text: "Можно ли использовать `ref` для хранения числа?",
                        sampleAnswer: "Да, `ref.current` — произвольное значение.",
                        level: 'junior'
                    },
                    {
                        text: "Как использовать `useRef` для доступа к DOM-элементу?",
                        sampleAnswer: "Создайте `ref`, передайте в `ref={ref}`, используйте `ref.current`.",
                        level: 'middle'
                    },
                    {
                        text: "Можно ли использовать `useRef` для хранения предыдущего значения пропса?",
                        sampleAnswer: "Да. Сохраните в `useEffect` в `ref.current`.",
                        level: 'middle'
                    },
                    {
                        text: "Когда `useRef` может вызвать ререндер?",
                        sampleAnswer: "Никогда напрямую. Но если значение используется в рендере — косвенно может.",
                        level: 'middle'
                    },
                    {
                        text: "Как использовать `useRef` для отмены асинхронных операций?",
                        sampleAnswer: "Сохраните `AbortController` или `timeoutId` в `ref`, отмените в `cleanup`.",
                        level: 'senior'
                    },
                    {
                        text: "Как реализовать `usePrevious` с помощью `useRef`?",
                        sampleAnswer: "В `useEffect` сохраняйте текущее значение, возвращайте предыдущее.",
                        level: 'senior'
                    },
                    {
                        text: "Чем `useRef` отличается от переменной в замыкании?",
                        sampleAnswer: "Переменная в замыкании теряется при ререндере. `useRef` сохраняет значение.",
                        level: 'senior'
                    }
                ]
            }
        ]
    },
    {
        category: Categories.CSS,
        weight: 15,
        questions: [
            {
                text: "Как вы оцениваете и оптимизируете производительность CSS в крупном приложении? Приведите примеры, где стили могут замедлять рендеринг.",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "Анализирую через DevTools: Performance, Coverage, Rendering. Избегаю тяжёлых селекторов, глубокой вложенности, частых layout/paint. Использую `will-change`, `contain`, оптимизирую анимации через `transform`/`opacity`. Следлю за количеством repaint'ов и композитными слоями.",
                subQuestions: [
                    {
                        text: "Какие инструменты в браузере помогают найти медленные стили?",
                        sampleAnswer: "Performance tab (Layout, Paint), Rendering panel (Paint flashing, Layer borders), Coverage (неиспользуемый CSS).",
                        level: 'junior'
                    },
                    {
                        text: "Почему глубокая вложенность селекторов (`nav ul li a`) — плохая практика?",
                        sampleAnswer: "Замедляет матчинг CSS-правил. Браузер читает справа налево — каждый элемент проверяется глубоко.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое специфичность и как она влияет на производительность?",
                        sampleAnswer: "Не напрямую, но высокая специфичность часто означает сложные селекторы, которые труднее обрабатывать.",
                        level: 'middle'
                    },
                    {
                        text: "Как использовать `content-visibility` для оптимизации длинных страниц?",
                        sampleAnswer: "`content-visibility: auto` откладывает рендеринг внеэкранного контента. Ускоряет первоначальную отрисовку.",
                        level: 'middle'
                    },
                    {
                        text: "Когда стоит использовать `@supports` и `@media (prefers-reduced-motion)`?",
                        sampleAnswer: "`@supports` — для безопасного использования новых свойств. `prefers-reduced-motion` — ради доступности, чтобы не раздражать пользователей.",
                        level: 'middle'
                    },
                    {
                        text: "Как избежать «дрожания» текста при анимации?",
                        sampleAnswer: "Использовать `transform` вместо `top/left`, избегать субпиксельных сдвигов, применять `will-change` умеренно.",
                        level: 'middle'
                    },
                    {
                        text: "Как работает `contain: strict` и где это полезно?",
                        sampleAnswer: "Изолирует layout, style, paint. Полезно для карточек, виджетов — предотвращает влияние на весь документ.",
                        level: 'senior'
                    },
                    {
                        text: "Какие подводные камни у создания множества композитных слоёв (`compositing layers`)?",
                        sampleAnswer: "Расход памяти GPU, особенно на мобильных. Может привести к лагам. Используйте `will-change` осознанно.",
                        level: 'senior'
                    },
                    {
                        text: "Как протестировать производительность CSS на слабых устройствах?",
                        sampleAnswer: "Throttling CPU в DevTools, реальные устройства, Lighthouse, Emulation Mode. Смотрю на FPS во время скролла и анимаций.",
                        level: 'senior'
                    }
                ]
            },
            {
                text: "Как центрировать элемент по вертикали и горизонтали? Приведите 3 способа.",
                maxScore: 5,
                level: 'junior',
                sampleAnswer: "1. `flex`: `align-items + justify-content`. 2. `grid`: `place-items: center`. 3. `position: absolute + transform(-50%)`.",
                subQuestions: [
                    {
                        text: "Как работает `margin: 0 auto`?",
                        sampleAnswer: "Центрирует блочный элемент по горизонтали, если задана ширина.",
                        level: 'junior'
                    },
                    {
                        text: "Что делает `text-align: center`?",
                        sampleAnswer: "Выравнивает инлайновые и inline-block элементы по центру родителя.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое `position: absolute`?",
                        sampleAnswer: "Позиционирует элемент относительно ближайшего позиционированного предка (не static).",
                        level: 'junior'
                    },
                    {
                        text: "Чем `flex-shrink: 0` отличается от `min-width: 0`?",
                        sampleAnswer: "`flex-shrink: 0` — не сжимается. `min-width: 0` — позволяет сжиматься, даже если контент широкий.",
                        level: 'middle'
                    },
                    {
                        text: "Как работает `gap` в `flex` и `grid`?",
                        sampleAnswer: "Добавляет отступ между элементами. В `flex` — только по направлению потока, в `grid` — по двум осям.",
                        level: 'middle'
                    },
                    {
                        text: "Как центрировать элемент с `position: fixed`?",
                        sampleAnswer: "Используйте `top: 50%; left: 50%; transform: translate(-50%, -50%)`.",
                        level: 'middle'
                    },
                    {
                        text: "Как центрировать элемент с неизвестной высотой без `transform`?",
                        sampleAnswer: "Используйте `flexbox` или `grid` — они не зависят от размеров дочерних элементов.",
                        level: 'senior'
                    },
                    {
                        text: "Как центрировать текст по вертикали в `div` без `flex`?",
                        sampleAnswer: "Установите `line-height` равный высоте `div` (для одной строки). Для нескольких — `display: table-cell; vertical-align: middle`.",
                        level: 'senior'
                    },
                    {
                        text: "Какие подводные камни у `position: absolute + transform`?",
                        sampleAnswer: "Зависит от размеров родителя, может выходить за пределы при `overflow: hidden`. Не резиновый."
                    }
                ]
            },
            // ✅ НОВЫЙ: Адаптивная вёрстка
            {
                text: "Как реализовать адаптивную вёрстку для мобильных, планшетов и десктопов? Какие техники используете?",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "Mobile-first, `@media (min-width)`, `rem/em`, `clamp()`, `container queries`. Использую `grid` и `flex` с `gap`.",
                subQuestions: [
                    {
                        text: "Что такое mobile-first и desktop-first?",
                        sampleAnswer: "Mobile-first — базовые стили для мобильных, улучшения через `min-width`. Desktop-first — наоборот.",
                        level: 'junior'
                    },
                    {
                        text: "Что делает `viewport` meta?",
                        sampleAnswer: "<meta name='viewport' content='width=device-width, initial-scale=1'> — корректно масштабирует страницу.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое `rem` и `em`?",
                        sampleAnswer: "`rem` — относительно корня (`html`). `em` — относительно родителя.",
                        level: 'junior'
                    },
                    {
                        text: "Как использовать `clamp()` для резинового шрифта?",
                        sampleAnswer: "font-size: clamp(1rem, 2.5vw, 2rem); — от min до max с зависимостью от ширины.",
                        level: 'middle'
                    },
                    {
                        text: "Что такое container queries и чем они лучше media queries?",
                        sampleAnswer: "Реагируют на размер контейнера, а не экрана. Позволяют создавать независимые компоненты.",
                        level: 'middle'
                    },
                    {
                        text: "Как тестировать адаптивность?",
                        sampleAnswer: "Chrome DevTools, реальные устройства, storybook, Percy (визуальное тестирование).",
                        level: 'middle'
                    },
                    {
                        text: "Как сделать сетку, которая меняется с 1 колонки на 3 при увеличении экрана?",
                        sampleAnswer: "grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));",
                        level: 'senior'
                    },
                    {
                        text: "Как избежать «прыгания» интерфейса при загрузке?",
                        sampleAnswer: "Резервируйте место под изображения (`aspect-ratio`), используйте skeleton-загрузку.",
                        level: 'senior'
                    },
                    {
                        text: "Как оптимизировать производительность адаптивных медиазапросов?",
                        sampleAnswer: "Группируйте правила, минимизируйте количество точек, используйте `prefers-reduced-data`."
                    }
                ]
            },
            // ✅ НОВЫЙ: Доступность (a11y)
            {
                text: "Как обеспечить доступность вёрстки для пользователей с ограниченными возможностями?",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "Семантические теги, `aria-*`, `role`, клавиатурная навигация, контраст, `lang`, `alt`, `focus-visible`.",
                subQuestions: [
                    {
                        text: "Зачем нужен `alt` у изображения?",
                        sampleAnswer: "Для скринридеров и случаев, когда изображение не загружено.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое семантическая вёрстка?",
                        sampleAnswer: "Использование правильных тегов: `<nav>`, `<main>`, `<article>` — для понимания структуры.",
                        level: 'junior'
                    },
                    {
                        text: "Как проверить контраст текста?",
                        sampleAnswer: "Chrome DevTools → Color Picker → AA/AAA рейтинг.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое `aria-label` и когда его использовать?",
                        sampleAnswer: "Текстовое описание для скринридера. Когда текст на кнопке — иконка.",
                        level: 'middle'
                    },
                    {
                        text: "Что делает `role=\"button\"`?",
                        sampleAnswer: "Сообщает скринридеру, что элемент ведёт себя как кнопка (если это div/span).",
                        level: 'middle'
                    },
                    {
                        text: "Как сделать модальное окно доступным?",
                        sampleAnswer: "Фокусировка на модале, `aria-modal=\"true\"`, закрытие по Esc, ловушка фокуса.",
                        level: 'middle'
                    },
                    {
                        text: "Что такое `focus-visible` и зачем он?",
                        sampleAnswer: "CSS-псевдокласс, который показывает outline только при клавиатурной навигации.",
                        level: 'senior'
                    },
                    {
                        text: "Как отключить анимацию для пользователей с motion sensitivity?",
                        sampleAnswer: "@media (prefers-reduced-motion: reduce) { animation: none; }",
                        level: 'senior'
                    },
                    {
                        text: "Как протестировать a11y вручную?",
                        sampleAnswer: "Tab-навигация, скринридер (NVDA, VoiceOver), Lighthouse, axe."
                    }
                ]
            }
        ]
    },
    {
        category: Categories.HTTP,
        weight: 15,
        questions: [
            {
                text: "Чем HTTP отличается от HTTPS? Как работает шифрование в HTTPS?",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "HTTPS — HTTP поверх TLS. Шифрование: обмен ключами (ECDHE), сертификаты, симметричное шифрование сессии.",
                subQuestions: [
                    {
                        text: "Что такое HTTP?",
                        sampleAnswer: "Протокол передачи гипертекста для обмена данными между клиентом и сервером.",
                        level: 'junior'
                    },
                    {
                        text: "Какой порт использует HTTP и HTTPS?",
                        sampleAnswer: "HTTP — 80, HTTPS — 443.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое URL?",
                        sampleAnswer: "Адрес ресурса в интернете, например, `https://example.com/path`.",
                        level: 'junior'
                    },
                    {
                        text: "Какие есть основные HTTP-методы и чем они отличаются?",
                        sampleAnswer: "`GET` — получение, `POST` — создание, `PUT` — полное обновление, `PATCH` — частичное.",
                        level: 'middle'
                    },
                    {
                        text: "Что такое HTTP-статусы 200, 404, 500, 301, 401?",
                        sampleAnswer: "200 — OK, 404 — Not Found, 500 — Server Error, 301 — Redirect, 401 — Unauthorized.",
                        level: 'middle'
                    },
                    {
                        text: "Что такое заголовки HTTP и зачем они нужны?",
                        sampleAnswer: "Метаданные запроса/ответа: `Content-Type`, `Authorization`, `Cache-Control`.",
                        level: 'middle'
                    },
                    {
                        text: "Как работает TLS handshake?",
                        sampleAnswer: "Обмен ключами, согласование шифра, установка зашифрованного соединения.",
                        level: 'senior'
                    },
                    {
                        text: "Что такое HSTS и зачем он нужен?",
                        sampleAnswer: "Заголовок, заставляющий браузер использовать только HTTPS.",
                        level: 'senior'
                    },
                    {
                        text: "Как защититься от MITM-атак при использовании HTTPS?",
                        sampleAnswer: "Проверяйте сертификаты, используйте HSTS, certificate pinning."
                    }
                ]
            },
            {
                text: "Что такое CORS и как он работает? Какие заголовки участвуют в preflight-запросе?",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "CORS — политика безопасности. Preflight (`OPTIONS`) проверяет разрешения через `Access-Control-Request-Method`, `Origin`. Сервер отвечает разрешением.",
                subQuestions: [
                    {
                        text: "Что такое домен, протокол и порт?",
                        sampleAnswer: "Части URL. CORS считает разными, если хотя бы один отличается.",
                        level: 'junior'
                    },
                    {
                        text: "Почему браузер блокирует запрос с `localhost` на `api.example.com`?",
                        sampleAnswer: "Из-за политики одинакового происхождения (same-origin policy).",
                        level: 'junior'
                    },
                    {
                        text: "Что такое `same-origin policy`?",
                        sampleAnswer: "Браузерная политика, запрещающая запросы между разными origin.",
                        level: 'junior'
                    },
                    {
                        text: "Когда браузер отправляет preflight-запрос?",
                        sampleAnswer: "При не-simple запросах: `PUT`, `DELETE`, кастомные заголовки.",
                        level: 'middle'
                    },
                    {
                        text: "Какие заголовки сервер должен отправить, чтобы разрешить CORS?",
                        sampleAnswer: "`Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`.",
                        level: 'middle'
                    },
                    {
                        text: "Что такое `credentials` в запросе и как он влияет на CORS?",
                        sampleAnswer: "Если `credentials: true`, сервер должен отправить `Access-Control-Allow-Credentials: true` и конкретный `Origin`.",
                        level: 'middle'
                    },
                    {
                        text: "Как безопасно настроить CORS на сервере?",
                        sampleAnswer: "Не используйте `*` с `credentials`, проверяйте `Origin`, ограничивайте методы.",
                        level: 'senior'
                    },
                    {
                        text: "Как обойти CORS на фронтенде без сервера?",
                        sampleAnswer: "Нельзя. Только через backend-прокси или CORS-proxy.",
                        level: 'senior'
                    },
                    {
                        text: "Что такое CSRF и как он связан с CORS?",
                        sampleAnswer: "CORS не защищает от CSRF. Для защиты нужны `SameSite=Strict` и CSRF-токены.",
                        level: 'senior'
                    }
                ]
            }
        ]
    },
    {
        category: Categories.Storage,
        weight: 15,
        questions: [
            {
                text: "В чём разница между `localStorage`, `sessionStorage` и `cookies`? Когда что использовать?",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "`localStorage` — постоянное, `sessionStorage` — до закрытия вкладки, `cookies` — с запросами. `cookies` — для аутентификации, `localStorage` — для UI-настроек.",
                subQuestions: [
                    {
                        text: "Как сохранить данные в `localStorage`?",
                        sampleAnswer: "Через `localStorage.setItem('key', 'value')`.",
                        level: 'junior'
                    },
                    {
                        text: "Как получить данные из `sessionStorage`?",
                        sampleAnswer: "Через `sessionStorage.getItem('key')`.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое `cookie`?",
                        sampleAnswer: "Маленький файл, хранящийся в браузере и отправляющийся с каждым запросом.",
                        level: 'junior'
                    },
                    {
                        text: "Почему `localStorage` уязвим к XSS?",
                        sampleAnswer: "JavaScript может его читать. Злоумышленник может украсть токен.",
                        level: 'middle'
                    },
                    {
                        text: "Как ограничить срок жизни `localStorage`?",
                        sampleAnswer: "Самостоятельно: сохраните timestamp и проверяйте при чтении.",
                        level: 'middle'
                    },
                    {
                        text: "Что такое `httpOnly` и `secure` флаги у cookies?",
                        sampleAnswer: "`httpOnly` — недоступен через JS, `secure` — только по HTTPS.",
                        level: 'middle'
                    },
                    {
                        text: "Как синхронизировать `localStorage` между вкладками?",
                        sampleAnswer: "Через событие `storage`: `window.addEventListener('storage', ...)`.",
                        level: 'senior'
                    },
                    {
                        text: "Какие альтернативы `localStorage` для больших данных?",
                        sampleAnswer: "IndexedDB — для больших объёмов, `Cache API` — для сетевых ресурсов.",
                        level: 'senior'
                    },
                    {
                        text: "Как защитить данные в `localStorage` от доступа?",
                        sampleAnswer: "Нельзя. Не храните чувствительные данные. Шифрование — на свой страх и риск.",
                        level: 'senior'
                    }
                ]
            },
            {
                text: "Как работает кэширование в браузере? Какие заголовки управляют им?",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "Кэширование управляется `Cache-Control`, `ETag`, `Expires`. `max-age`, `no-cache`, `must-revalidate` задают политику.",
                subQuestions: [
                    {
                        text: "Что такое кэш?",
                        sampleAnswer: "Временное хранение ресурсов (CSS, JS, изображений) для ускорения загрузки.",
                        level: 'junior'
                    },
                    {
                        text: "Как очистить кэш вручную?",
                        sampleAnswer: "Через DevTools → Network → Disable cache, или Ctrl+F5.",
                        level: 'junior'
                    },
                    {
                        text: "Что делает `Cache-Control: no-store`?",
                        sampleAnswer: "Запрещает кэширование. Ресурс всегда загружается с сервера.",
                        level: 'junior'
                    },
                    {
                        text: "Чем `no-cache` отличается от `no-store`?",
                        sampleAnswer: "`no-cache` — можно кэшировать, но с проверкой `ETag`. `no-store` — никакого кэша.",
                        level: 'middle'
                    },
                    {
                        text: "Что такое `ETag` и как он используется?",
                        sampleAnswer: "Хеш ресурса. Браузер отправляет `If-None-Match`, сервер отвечает 304, если не изменился.",
                        level: 'middle'
                    },
                    {
                        text: "Как настроить кэширование статики в продакшене?",
                        sampleAnswer: "Долгий `max-age`, хешированные имена файлов, `immutable` для версионированных ресурсов.",
                        level: 'middle'
                    },
                    {
                        text: "Как реализовать кэширование API-ответов на уровне приложения?",
                        sampleAnswer: "Кэш в памяти, `Map` с TTL, или `IndexedDB` с политикой invalidation.",
                        level: 'senior'
                    },
                    {
                        text: "Что такое Service Worker и как он влияет на кэширование?",
                        sampleAnswer: "Скрипт в фоне, может перехватывать запросы и управлять кэшем (`Cache API`).",
                        level: 'senior'
                    },
                    {
                        text: "Как избежать кэширования новых версий приложения?",
                        sampleAnswer: "Используйте `Cache-Busting` (query-параметры, хеши), обновляйте Service Worker.",
                        level: 'senior'
                    }
                ]
            }
        ]
    },
    {
        category: Categories.Build,
        weight: 10,
        questions: [
            {
                text: "Какие этапы включает современный процесс доставки фронтенд-приложения в production? Какие цели у каждого этапа?",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "1. Линтинг — проверка стиля и ошибок. 2. Сборка — минификация, tree-shaking. 3. Тесты — юнит, интеграционные, e2e. 4. Деплой на staging. 5. Продакшн — с мониторингом. Цель — безопасность, стабильность, скорость.",
                subQuestions: [
                    {
                        text: "Зачем нужен линтинг перед коммитом?",
                        sampleAnswer: "Чтобы выявить ошибки и стиль до ревью. Поддерживает единообразие кода.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое pre-commit хуки?",
                        sampleAnswer: "Скрипты, запускаемые перед коммитом (через `husky`, `lint-staged`). Проверяют код.",
                        level: 'junior'
                    },
                    {
                        text: "Что происходит при сборке (`build`) проекта?",
                        sampleAnswer: "Код транспилируется, объединяется в бандлы, минифицируется, добавляются sourcemap'ы.",
                        level: 'junior'
                    },
                    {
                        text: "Какие типы тестов вы знаете?",
                        sampleAnswer: "Unit — отдельные функции. Integration — взаимодействие компонентов. E2E — сценарии пользователя.",
                        level: 'middle'
                    },
                    {
                        text: "Зачем нужен `staging`-сервер?",
                        sampleAnswer: "Тестовая среда, максимально похожая на продакшен. Для финальной проверки.",
                        level: 'middle'
                    },
                    {
                        text: "Как проверить, что новая версия работает корректно после деплоя?",
                        sampleAnswer: "Healthcheck, Sentry, e2e-тесты, мониторинг ошибок и метрик загрузки.",
                        level: 'middle'
                    },
                    {
                        text: "Как реализовать безопасный деплой без простоев (zero-downtime)?",
                        sampleAnswer: "Blue-green deployment: два окружения, переключение трафика после проверки.",
                        level: 'senior'
                    },
                    {
                        text: "Что такое canary release и зачем он нужен?",
                        sampleAnswer: "Постепенный выпуск новой версии для части пользователей. Минимизирует риски.",
                        level: 'senior'
                    },
                    {
                        text: "Как автоматически откатить деплой при обнаружении критических ошибок?",
                        sampleAnswer: "По триггеру из Sentry или healthcheck. Автоматический rollback через CI/CD.",
                        level: 'senior'
                    }
                ]
            },
            {
                text: "Какие принципы используются для оптимизации времени загрузки приложения? Как влияет архитектура сборки?",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "Code splitting, tree-shaking, lazy loading, кэширование статики. Архитектура сборки позволяет разделять код и загружать только нужное.",
                subQuestions: [
                    {
                        text: "Что такое бандл и почему большой бандл — плохо?",
                        sampleAnswer: "Объединённый JS-файл. Большой бандл медленно загружается и парсится.",
                        level: 'junior'
                    },
                    {
                        text: "Что делает сборщик (bundler) вроде Webpack или Vite?",
                        sampleAnswer: "Разрешает модули, применяет loaders, создаёт чанки, минифицирует код.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое tree-shaking и как он работает?",
                        sampleAnswer: "Удаление неиспользуемого кода. Работает с ESM и при условии, что код чистый.",
                        level: 'middle'
                    },
                    {
                        text: "Что такое code splitting и как его реализовать в React?",
                        sampleAnswer: "Разделение кода на чанки. Через `React.lazy` и `import()`.",
                        level: 'middle'
                    },
                    {
                        text: "Как проверить размер бандла и найти «тяжёлые» зависимости?",
                        sampleAnswer: "Webpack Bundle Analyzer, `source-map-explorer`, Lighthouse.",
                        level: 'middle'
                    },
                    {
                        text: "Как уменьшить влияние полифиллов на размер бандла?",
                        sampleAnswer: "Использовать `browserslist`, динамические полифиллы (например, `polyfill.io`).",
                        level: 'middle'
                    },
                    {
                        text: "Что такое differential bundling и зачем он нужен?",
                        sampleAnswer: "Отдельные бандлы для старых и новых браузеров. Современные получают легкий код.",
                        level: 'senior'
                    },
                    {
                        text: "Как реализовать prefetching или preload чанков?",
                        sampleAnswer: "Через `webpackPreload`, `webpackPrefetch` или `<link rel='prefetch'>`.",
                        level: 'senior'
                    },
                    {
                        text: "Как оптимизировать загрузку шрифтов и изображений?",
                        sampleAnswer: "Font-display: swap, lazy loading, современные форматы (WebP), CDN.",
                        level: 'senior'
                    }
                ]
            }
        ]
    },
    {
        category: Categories.Tests,
        weight: 10,
        questions: [
            {
                text: "Как с помощью React Testing Library проверить, что компонент отображает данные после асинхронной загрузки?",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "Используйте `screen.findByText()` — он автоматически ждёт появления элемента после асинхронной операции.",
                subQuestions: [
                    {
                        text: "Что такое `screen` в RTL?",
                        sampleAnswer: "Объект для поиска элементов в документе.",
                        level: 'junior'
                    },
                    {
                        text: "Как рендерить компонент в тесте?",
                        sampleAnswer: "Используйте `render(<Component />)` из `@testing-library/react`.",
                        level: 'junior'
                    },
                    {
                        text: "Как найти элемент по тексту?",
                        sampleAnswer: "Через `screen.getByText('текст')`.",
                        level: 'junior'
                    },
                    {
                        text: "В чём разница между `getByText`, `queryByText` и `findByText`?",
                        sampleAnswer: "`getByText` — ищет сразу. `queryByText` — не падает. `findByText` — ждёт асинхронно.",
                        level: 'middle'
                    },
                    {
                        text: "Как проверить, что элемент не отображается?",
                        sampleAnswer: "Используйте `expect(screen.queryByText('текст')).toBeNull()`.",
                        level: 'middle'
                    },
                    {
                        text: "Как дождаться завершения `useEffect`, который делает API-запрос?",
                        sampleAnswer: "Используйте `await screen.findByText('данные')`.",
                        level: 'middle'
                    },
                    {
                        text: "Как замокать API-запрос в тесте?",
                        sampleAnswer: "Используйте `msw` (Mock Service Worker).",
                        level: 'senior'
                    },
                    {
                        text: "Как протестировать ошибку загрузки данных?",
                        sampleAnswer: "Замокайте API, чтобы вернул ошибку, проверьте сообщение.",
                        level: 'senior'
                    },
                    {
                        text: "Как избежать дублирования `wrapper` в тестах?",
                        sampleAnswer: "Создайте кастомный `render` с `wrapper`, переиспользуйте во всех тестах.",
                        level: 'senior'
                    }
                ]
            },
            {
                text: "Как протестировать форму с валидацией с помощью React Testing Library?",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "Симулируйте ввод через `fireEvent.change()`, проверьте появление ошибок и состояние кнопки.",
                subQuestions: [
                    {
                        text: "Как найти инпут по плейсхолдеру?",
                        sampleAnswer: "Используйте `screen.getByPlaceholderText('email')`.",
                        level: 'junior'
                    },
                    {
                        text: "Как найти кнопку по тексту?",
                        sampleAnswer: "Через `screen.getByRole('button', { name: /submit/i })`.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое `fireEvent`?",
                        sampleAnswer: "Утилита для симуляции событий, например, клика или ввода.",
                        level: 'junior'
                    },
                    {
                        text: "Как симулировать ввод текста в инпут?",
                        sampleAnswer: "Используйте `fireEvent.change(input, { target: { value: 'test' } })`.",
                        level: 'middle'
                    },
                    {
                        text: "Как проверить, что кнопка отправки формы заблокирована при невалидных данных?",
                        sampleAnswer: "Проверяйте `expect(submitButton).toBeDisabled()`.",
                        level: 'middle'
                    },
                    {
                        text: "Как проверить, что после отправки формы отображается успех?",
                        sampleAnswer: "Используйте `await screen.findByText('Успешно')` после `fireEvent.submit()`.",
                        level: 'middle'
                    },
                    {
                        text: "Как протестировать динамическое добавление полей в форму?",
                        sampleAnswer: "Симулируйте клик, проверьте появление нового поля.",
                        level: 'senior'
                    },
                    {
                        text: "Как проверить, что валидация срабатывает при потере фокуса?",
                        sampleAnswer: "Используйте `fireEvent.blur(input)`, затем проверьте ошибку.",
                        level: 'senior'
                    },
                    {
                        text: "Как избежать хрупких тестов при изменении текста ошибки?",
                        sampleAnswer: "Используйте `data-testid` или проверяйте по `role='alert'`.",
                        level: 'senior'
                    }
                ]
            },
            {
                text: "Как протестировать компонент, зависящий от `useContext`?",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "Оберните компонент в `Provider` с мок-данными, используя `wrapper` в `render`.",
                subQuestions: [
                    {
                        text: "Что такое `Context` в React?",
                        sampleAnswer: "Механизм передачи данных через дерево без пропсов.",
                        level: 'junior'
                    },
                    {
                        text: "Как создать `Context`?",
                        sampleAnswer: "Через `React.createContext(defaultValue)`.",
                        level: 'junior'
                    },
                    {
                        text: "Как использовать `useContext`?",
                        sampleAnswer: "Передайте контекст: `const value = useContext(MyContext)`.",
                        level: 'junior'
                    },
                    {
                        text: "Как передать мок-значение в контекст при тестировании?",
                        sampleAnswer: "Создайте `wrapper` с `Provider` и моковым `value`.",
                        level: 'middle'
                    },
                    {
                        text: "Как проверить, что компонент реагирует на изменение контекста?",
                        sampleAnswer: "Обновите провайдер через `rerender`, проверьте изменения.",
                        level: 'middle'
                    },
                    {
                        text: "Что такое `wrapper` в `render` и зачем он?",
                        sampleAnswer: "Функция, оборачивающая компонент (например, в `Provider`).",
                        level: 'middle'
                    },
                    {
                        text: "Как протестировать компонент с несколькими контекстами?",
                        sampleAnswer: "Оберните в `wrapper`, содержащий оба провайдера.",
                        level: 'senior'
                    },
                    {
                        text: "Как избежать утечек памяти при тестировании контекста?",
                        sampleAnswer: "Очищайте состояние после теста, не храните ссылки.",
                        level: 'senior'
                    },
                    {
                        text: "Как протестировать fallback-значение контекста?",
                        sampleAnswer: "Рендерите компонент без провайдера, проверьте значение по умолчанию.",
                        level: 'senior'
                    }
                ]
            }
        ]
    },
    {
        category: Categories.Api,
        weight: 10,
        questions: [
            {
                text: "Как реализовать retry-механизм при неудачном API-запросе? Как избежать дублирующих запросов?",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "Используйте retry с экспоненциальной задержкой. Для идемпотентности — `Idempotency-Key` в заголовках.",
                subQuestions: [
                    {
                        text: "Что такое HTTP-ошибка 401?",
                        sampleAnswer: "Unauthorized — пользователь не авторизован.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое HTTP-ошибка 500?",
                        sampleAnswer: "Internal Server Error — ошибка на стороне сервера.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое `fetch`?",
                        sampleAnswer: "Нативный API для HTTP-запросов в браузере.",
                        level: 'junior'
                    },
                    {
                        text: "Чем `fetch` отличается от `axios`?",
                        sampleAnswer: "`axios` — есть interceptors, авто-parsing. `fetch` — нативный, но без abort по умолчанию.",
                        level: 'middle'
                    },
                    {
                        text: "Как показать пользователю, что запрос выполняется или завершился с ошибкой?",
                        sampleAnswer: "Индикатор загрузки, toast-уведомления, подсветка формы.",
                        level: 'middle'
                    },
                    {
                        text: "Что такое идемпотентность?",
                        sampleAnswer: "Операция, результат которой не меняется при повторных вызовах.",
                        level: 'middle'
                    },
                    {
                        text: "Как реализовать retry с экспоненциальной задержкой?",
                        sampleAnswer: "Увеличивайте задержку после каждой попытки: 1s, 2s, 4s, 8s.",
                        level: 'senior'
                    },
                    {
                        text: "Как избежать повторного выполнения неидемпотентных операций (например, оплата)?",
                        sampleAnswer: "Используйте `Idempotency-Key` в заголовках.",
                        level: 'senior'
                    },
                    {
                        text: "Как обрабатывать сетевые ошибки (например, потеря соединения)?",
                        sampleAnswer: "Проверяйте `navigator.onLine`, используйте `retry`, показывайте offline-интерфейс.",
                        level: 'senior'
                    }
                ]
            }
        ]
    }
];