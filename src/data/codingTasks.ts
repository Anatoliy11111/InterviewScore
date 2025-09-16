// src/data/codingTasks.ts

export interface CodingTask {
    id: string;
    title: string;
    description: string;
    codeTemplate: string;
    solution: string;
    tests?: string;
    question: {
        text: string;
        hints: string[];
    };
}

export const CODING_TASKS: CodingTask[] = [
    // --- ЗАДАЧА 1: Подсчёт гласных ---
    {
        id: '1',
        title: 'Подсчёт гласных',
        description: 'Реализуйте функцию, подсчитывающую количество гласных букв (a, e, i, o, u, y) в строке.',
        codeTemplate: `// Гласные: a, e, i, o, u, y\nconst findVowelsLength = (str) => {\n  // ваш код\n};`,
        solution: `const findVowelsLength = (str) => {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'y']);
  return str
    .toLowerCase()
    .split('')
    .filter(char => vowels.has(char))
    .length;
};

// Пример:
console.log(findVowelsLength('akksja')); // → 2`,
        tests: `expect(findVowelsLength('hello')).toBe(2);
expect(findVowelsLength('rhythm')).toBe(0);
expect(findVowelsLength('AeIoUy')).toBe(6);`,
        question: {
            text: 'Как оптимизировать поиск гласных при работе с очень длинными строками?',
            hints: [
                'Set даёт O(1) при проверке наличия элемента',
                'Избегайте многократного вызова строки методов',
                'Можно ли использовать регулярное выражение?'
            ]
        }
    },

    // --- ЗАДАЧА 2: Анаграммы ---
    {
        id: '3',
        title: 'Группировка анаграмм',
        description: 'Напишите функцию, которая группирует слова по анаграммам. Верните только группы, где более одного элемента.',
        codeTemplate: `Вход: ['xyz','abc', 'bca', 'zyx', 'klm', 'cab', 'zxy', 'xzy']
Выход: [['xyz', 'zyx', 'zxy', 'xzy'], ['abc', 'bca', 'cab']]\`,
 /**
 * Анаграмма — слово, образованное перестановкой букв.
 * @param {string[]} words - массив строк
 * @returns {string[][]} - массив групп анаграмм (длина > 1)
 */
function groupAnagrams(words) {
  // ваш код
}`,
        solution: `function groupAnagrams(words) {
  const map = new Map();

  for (const word of words) {
    // Сортируем буквы — ключ для анаграмм
    const key = word.toLowerCase().split('').sort().join('');
    
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(word);
  }

  // Возвращаем только группы с длиной > 1
  return Array.from(map.values()).filter(group => group.length > 1);
}

// Пример:
console.log(groupAnagrams(['xyz','abc', 'bca', 'zyx', 'klm', 'cab', 'zxy', 'xzy']));
// → [['xyz', 'zyx', 'zxy', 'xzy'], ['abc', 'bca', 'cab']]`,
        tests: `expect(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']))
  .toEqual([['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']].filter(g => g.length > 1));

expect(groupAnagrams(['a']).length).toBe(0);
expect(groupAnagrams(['ab', 'ba', 'cd'])).toEqual([['ab', 'ba']]);`,
        question: {
            text: 'Как улучшить производительность, если слова очень длинные или их много?',
            hints: [
                'Сортировка — O(n log n). Можно ли заменить на подсчёт букв?',
                'Используйте объект или Map как счётчик символов',
                'Ключ может быть строкой вида "a:2,b:1,c:1"'
            ]
        }
    },

    // --- ЗАДАЧА 3: API и React ---
    {
        id: '2',
        title: 'API-запрос и семантический список',
        description: 'Реализуйте компонент, который делает запрос к API и отображает данные как семантический список (`<ul>`). Учитывайте разные домены (prod / stage).',
        codeTemplate: `function fetchData() {
  fetch('api/tada.json');
}

function Component() {
  return <div />;
}`,
        solution: `import { useEffect, useState } from 'react';

// Базовый URL зависит от окружения
const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://www.sberbank-ru.os-trunk.sberbank.ru';
  }
  return 'https://www.sberbank-ru.stage.sberbank.ru';
};

const API_URL = \`\${getBaseUrl()}/api/tada.json\`;

function Component() {
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(\`Ошибка \${response.status}\`);
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;

  return (
    <ul aria-label="Список полученных данных">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default Component;`,
        question: {
            text: 'Как безопасно обработать CORS, если API не настроен на фронтенд-домен?',
            hints: [
                'CORS контролируется сервером, нельзя обойти с фронтенда',
                'Решение — бэкенд-прокси или CORS-proxy',
                'Во время разработки можно использовать прокси в Vite/Webpack'
            ]
        }
    },
    {
        id: '4',
        title: 'jQuery-подобный чейнинг',
        description: 'Реализуйте мини-библиотеку, которая позволяет выбирать элемент и цеплять методы: добавление класса, установка HTML, обработка кликов.',
        codeTemplate: `/**
 * Мини-библиотека для DOM-манипуляций с поддержкой чейнинга
 * Пример:
 * $('.block')
 *   .appendClass('active')
 *   .setHTML('<span>Hi</span>')
 *   .onClick(() => console.log('clicked'));
 */

function $(selector) {
  // ваш код
}`,
        solution: `function $(selector) {
  const element = document.querySelector(selector);
  
  if (!element) {
    console.warn(\`Элемент с селектором "\${selector}" не найден\`);
    return {
      // Возвращаем пустой объект с теми же методами для поддержки чейнинга
      appendClass: () => $(),
      setHTML: () => $(),
      onClick: () => $()
    };
  }

  function addMethod(name, fn) {
    instance[name] = fn;
    return instance;
  }

  const instance = {
    element,
    appendClass(className) {
      element.classList.add(className.replace(/^\\./, '')); // убираем точку, если есть
      return this;
    },
    setHTML(html) {
      element.innerHTML = html;
      return this;
    },
    onClick(handler) {
      element.addEventListener('click', handler);
      return this;
    }
  };

  return instance;
}

// Использование:
// const node = $('.some-block');
// node
//   .appendClass('additional-class')
//   .setHTML('<h1>Hello, World!</h1>')
//   .onClick(() => console.log('click'));`,
        question: {
            text: 'Как сделать библиотеку расширяемой, чтобы можно было легко добавлять новые методы?',
            hints: [
                'Используйте шаблон "Builder" или реестр методов',
                'Можно хранить методы в объекте и динамически их добавлять',
                'Подумайте о плагинах: $.fn.extend = function(...) { ... }'
            ]
        }
    }

];