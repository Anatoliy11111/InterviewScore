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

export interface QuestionCategory {
    category: string;
    weight: number;
    questions: Question[];
}

// Данные
export const questions: QuestionCategory[] = [
    {
        category: "JavaScript & ES6+",
        weight: 20,
        questions: [
            {
                text: "Объясните, как работает замыкание. Приведите пример, где оно используется в реальной практике.",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "Замыкание — функция, сохраняющая доступ к переменным из внешней области видимости. Используется в каррировании, кешировании, модулях.",
                subQuestions: [
                    {
                        text: "Что такое лексическое окружение?",
                        sampleAnswer: "Область, в которой была объявлена функция, и доступные в ней переменные.",
                        level: 'junior'
                    },
                    {
                        text: "Может ли внутренняя функция изменять переменные внешней?",
                        sampleAnswer: "Да, замыкание предоставляет доступ на чтение и запись.",
                        level: 'junior'
                    },
                    {
                        text: "Приведите простой пример замыкания с подсчётом вызовов.",
                        sampleAnswer: "function counter() { let count = 0; return () => ++count; }",
                        level: 'junior'
                    },
                    {
                        text: "Может ли замыкание привести к утечкам памяти? Как избежать?",
                        sampleAnswer: "Да, если удерживает большие объекты. Очищайте ссылки, когда они больше не нужны.",
                        level: 'middle'
                    },
                    {
                        text: "Как замыкания используются в реализации `debounce` или `throttle`?",
                        sampleAnswer: "`debounce` хранит `timeoutId` в замыкании, чтобы отменить предыдущий таймер.",
                        level: 'middle'
                    },
                    {
                        text: "Что будет выведено: `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i), 100)`?",
                        sampleAnswer: "Три раза 3. `var` одна на всё замыкание, `i` — одна переменная.",
                        level: 'middle'
                    },
                    {
                        text: "Как использовать замыкания для создания приватных полей в классах до появления `#`?",
                        sampleAnswer: "Объявите переменную в конструкторе — она будет доступна только через замыкание.",
                        level: 'senior'
                    },
                    {
                        text: "Как замыкания влияют на производительность при создании большого количества функций?",
                        sampleAnswer: "Каждое замыкание хранит ссылку на окружение — может увеличить потребление памяти.",
                        level: 'senior'
                    },
                    {
                        text: "Как отследить утечку памяти через замыкания в Chrome DevTools?",
                        sampleAnswer: "С помощью Heap Snapshot — ищите объекты с долгоживущими closure-переменными.",
                        level: 'senior'
                    }
                ]
            },
            {
                text: "Как работает Event Loop? Приведите пример, где `Promise` выполняется раньше, чем `setTimeout(0)`.",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "Event Loop обрабатывает микрозадачи (Promise) до макрозадач (setTimeout). Поэтому `Promise.then()` выполнится перед `setTimeout(0)`.",
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
            }
        ]
    },
    {
        category: "TypeScript",
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
        category: "React & State Management",
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
        category: "Верстка & CSS",
        weight: 15,
        questions: [
            {
                text: "Какие CSS-свойства вызывают repaint, reflow и compositing? Приведите примеры и способы оптимизации.",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "`reflow`: `width`, `height`, `margin`. `repaint`: `color`, `background`. `compositing`: `transform`, `opacity`. Оптимизация: анимируйте `transform` и `opacity`.",
                subQuestions: [
                    {
                        text: "Что такое `reflow`?",
                        sampleAnswer: "Пересчёт позиций и размеров элементов.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое `repaint`?",
                        sampleAnswer: "Перерисовка элемента без изменения макета.",
                        level: 'junior'
                    },
                    {
                        text: "Какие свойства не вызывают `reflow`?",
                        sampleAnswer: "`transform`, `opacity`, `will-change` — работают на GPU.",
                        level: 'junior'
                    },
                    {
                        text: "Как работает `contain: layout` и зачем он?",
                        sampleAnswer: "Ограничивает влияние элемента на макет. Ускоряет рендеринг.",
                        level: 'middle'
                    },
                    {
                        text: "Что такое BFC и когда он создаётся?",
                        sampleAnswer: "Block Formatting Context — изолирует макет. Создаётся при `overflow: hidden`, `display: flex`.",
                        level: 'middle'
                    },
                    {
                        text: "Как ускорить анимацию без `reflow`?",
                        sampleAnswer: "Используйте `transform` и `opacity`, добавьте `will-change: transform`.",
                        level: 'middle'
                    },
                    {
                        text: "Как отследить `reflow` и `repaint` в DevTools?",
                        sampleAnswer: "В Performance tab — ищите события Layout и Paint.",
                        level: 'senior'
                    },
                    {
                        text: "Как использовать `transform` для анимации без дрожжания?",
                        sampleAnswer: "Добавьте `transform: translateZ(0)` или `will-change: transform`.",
                        level: 'senior'
                    },
                    {
                        text: "Как избежать layout thrashing?",
                        sampleAnswer: "Не чередуйте чтение и запись в DOM. Группируйте операции."
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
                        sampleAnswer: "Выравнивает инлайновые элементы по центру родителя.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое `position: absolute`?",
                        sampleAnswer: "Позиционирует элемент относительно ближайшего позиционированного предка.",
                        level: 'junior'
                    },
                    {
                        text: "Чем `flex-shrink: 0` отличается от `min-width: 0`?",
                        sampleAnswer: "`flex-shrink: 0` — не сжимается. `min-width: 0` — позволяет сжиматься.",
                        level: 'middle'
                    },
                    {
                        text: "Как работает `gap` в `flex` и `grid`?",
                        sampleAnswer: "Добавляет отступ между элементами. В `flex` — только по направлению.",
                        level: 'middle'
                    },
                    {
                        text: "Как центрировать элемент с `position: fixed`?",
                        sampleAnswer: "Используйте `top: 50%; left: 50%; transform: translate(-50%, -50%)`.",
                        level: 'middle'
                    },
                    {
                        text: "Как центрировать элемент с неизвестной высотой без `transform`?",
                        sampleAnswer: "Используйте `flexbox` или `grid` — они не зависят от размеров.",
                        level: 'senior'
                    },
                    {
                        text: "Как центрировать текст по вертикали в `div` без `flex`?",
                        sampleAnswer: "Установите `line-height` равный высоте `div` (для одной строки).",
                        level: 'senior'
                    },
                    {
                        text: "Какие подводные камни у `position: absolute + transform`?",
                        sampleAnswer: "Зависит от размеров родителя, может выходить за пределы при `overflow`."
                    }
                ]
            }
        ]
    },
    {
        category: "HTTP & HTTPS",
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
        category: "Браузерные хранилища",
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
        category: "Сборка, CI/CD",
        weight: 10,
        questions: [
            {
                text: "Как уменьшить размер бандла на 30%, не удаляя функциональность?",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "Code splitting, `React.lazy`, tree-shaking, динамические импорты, удаление неиспользуемых полифиллов.",
                subQuestions: [
                    {
                        text: "Что такое бандл?",
                        sampleAnswer: "Объединённый файл JavaScript, созданный сборщиком.",
                        level: 'junior'
                    },
                    {
                        text: "Что делает сборщик (bundler)?",
                        sampleAnswer: "Объединяет модули, минифицирует, транспилирует, оптимизирует код.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое `import` в JavaScript?",
                        sampleAnswer: "Синтаксис для подключения модулей.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое tree-shaking и как он работает?",
                        sampleAnswer: "Удаление неиспользуемого кода на этапе сборки. Работает с `ESM`.",
                        level: 'middle'
                    },
                    {
                        text: "Как проверить, что бандл не слишком большой?",
                        sampleAnswer: "Webpack Bundle Analyzer, Lighthouse, `source-map-explorer`.",
                        level: 'middle'
                    },
                    {
                        text: "Что такое code splitting?",
                        sampleAnswer: "Разделение бандла на чанки, загружаемые по требованию.",
                        level: 'middle'
                    },
                    {
                        text: "Как реализовать prefetching чанков?",
                        sampleAnswer: "Используйте `import()` с `webpackPrefetch: true` или `<link rel='prefetch'>`.",
                        level: 'senior'
                    },
                    {
                        text: "Как минимизировать влияние полифиллов на размер бандла?",
                        sampleAnswer: "Используйте `browserslist`, `core-js` с tree-shaking.",
                        level: 'senior'
                    },
                    {
                        text: "Как настроить differential bundling?",
                        sampleAnswer: "Соберите отдельные бандлы для современных и старых браузеров.",
                        level: 'senior'
                    }
                ]
            },
            {
                text: "Что происходит при `git push`? Какие шаги выполняются в CI/CD?",
                maxScore: 5,
                level: 'middle',
                sampleAnswer: "Запускается pipeline: линтинг, сборка, тесты, деплой на staging. Production — после ревью или автоматически.",
                subQuestions: [
                    {
                        text: "Что такое `git push`?",
                        sampleAnswer: "Команда для отправки коммитов в удалённый репозиторий.",
                        level: 'junior'
                    },
                    {
                        text: "Что такое CI/CD?",
                        sampleAnswer: "Непрерывная интеграция и доставка — автоматизация тестирования и деплоя.",
                        level: 'junior'
                    },
                    {
                        text: "Зачем нужен `lint`?",
                        sampleAnswer: "Проверка кода на стиль и ошибки до коммита.",
                        level: 'junior'
                    },
                    {
                        text: "Как проверить, что деплой прошёл успешно?",
                        sampleAnswer: "Healthcheck, e2e-тесты, мониторинг ошибок (Sentry).",
                        level: 'middle'
                    },
                    {
                        text: "Как откатить деплой?",
                        sampleAnswer: "Rollback через тег или переключение на предыдущий образ.",
                        level: 'middle'
                    },
                    {
                        text: "Что такое `staging` окружение?",
                        sampleAnswer: "Тестовая среда, максимально приближённая к production.",
                        level: 'middle'
                    },
                    {
                        text: "Как реализовать canary-деплой?",
                        sampleAnswer: "Запустите новую версию для 1% пользователей, затем расширьте.",
                        level: 'senior'
                    },
                    {
                        text: "Как безопасно деплоить с нулевым простоем?",
                        sampleAnswer: "Blue-green деплой: два окружения, переключение трафика после проверки.",
                        level: 'senior'
                    },
                    {
                        text: "Как настроить автоматический деплой только при изменениях в определённой папке?",
                        sampleAnswer: "В CI используйте фильтр `paths`.",
                        level: 'senior'
                    }
                ]
            }
        ]
    },
    {
        category: "Тестирование",
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
        category: "Работа с API",
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