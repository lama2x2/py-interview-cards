/* Python Backend interview flashcards.
   Каждая карточка: { c: тема, lvl: грейд, q: вопрос, a: ответ (HTML) }
   Грейды: "Джун" | "Мид" | "Синьер" | "Лид"
   Темы:  Python | asyncio | FastAPI | Django/DRF | SQL | Redis | Очереди | Docker | Тесты | Общее | Архитектура | Команда
   Добавляй/правь карточки прямо здесь — приложение подхватит их само. */
window.CARDS = [
  // ========================= POPULAR CORE (50) =========================
  {c:"Python",lvl:"Мид",q:"Что такое GIL и как он влияет на многопоточность?",
   a:`<b>GIL</b> (Global Interpreter Lock) — глобальная блокировка CPython: в один момент байткод исполняет только один поток.<ul>
   <li><b>CPU-bound</b> потоками не ускоряются → <code>multiprocessing</code> / C-расширения.</li>
   <li><b>I/O-bound</b> потоки/asyncio работают: GIL отпускается на время ожидания.</li></ul>`},
  {c:"Python",lvl:"Мид",q:"Процессы vs потоки vs asyncio — когда что?",
   a:`<ul><li><b>asyncio</b> — много I/O в одном потоке (тысячи соединений).</li>
   <li><b>threading</b> — I/O + блокирующие либы без async; параллелизма по CPU нет из-за GIL.</li>
   <li><b>multiprocessing</b> — CPU-bound: реальный параллелизм, свой GIL на процесс.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"list vs tuple — в чём разница?",
   a:`<ul><li><code>list</code> изменяемый, <code>tuple</code> — нет.</li>
   <li>tuple компактнее, может быть ключом dict / элементом set (хешируемый).</li>
   <li>Семантика: tuple — фиксированная запись, list — однородная коллекция.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"Почему нельзя делать изменяемый дефолтный аргумент (def f(x=[]))?",
   a:`Дефолт вычисляется <b>один раз</b> при определении и переиспользуется между вызовами → список накапливает данные.<br>
   Правильно: <code>def f(x=None): x = x or []</code>`},
  {c:"Python",lvl:"Мид",q:"Как работает декоратор? Напиши простой.",
   a:`Функция, принимающая функцию и возвращающая обёртку. <code>@dec</code> = <code>f = dec(f)</code>.<br>
   <code>def dec(fn):<br>&nbsp;@wraps(fn)<br>&nbsp;def w(*a,**k): return fn(*a,**k)<br>&nbsp;return w</code>`},
  {c:"Python",lvl:"Джун",q:"Генераторы и yield — что это и зачем?",
   a:`Функция с <code>yield</code> возвращает значения <b>лениво</b>, сохраняя состояние.<ul>
   <li>Не держит всю последовательность в памяти.</li>
   <li>Для больших/бесконечных потоков: чтение файла, пагинация.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"Что такое контекстный менеджер и with?",
   a:`Объект с <code>__enter__</code>/<code>__exit__</code> — гарантирует освобождение ресурса даже при исключении.<ul>
   <li><code>with open() as f</code> — файл закроется сам.</li>
   <li>Свой: класс или <code>@contextmanager</code> + yield.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"is vs == — в чём разница?",
   a:`<ul><li><code>==</code> — значения (<code>__eq__</code>).</li>
   <li><code>is</code> — идентичность (один объект в памяти).</li>
   <li><code>is</code> только для <code>None</code>/<code>True</code>/<code>False</code>.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"Mutable и immutable типы. Как это связано с передачей в функцию?",
   a:`<ul><li><b>Immutable</b>: int, float, str, tuple, frozenset, bytes.</li>
   <li><b>Mutable</b>: list, dict, set, объекты.</li></ul>
   Передача по ссылке на объект: изменение mutable внутри функции видно снаружи, переприсваивание — нет.`},
  {c:"Python",lvl:"Джун",q:"Чем отличаются @staticmethod и @classmethod?",
   a:`<ul><li><b>classmethod</b> получает <code>cls</code> — для альтернативных конструкторов.</li>
   <li><b>staticmethod</b> — ни <code>self</code>, ни <code>cls</code>, просто функция в неймспейсе класса.</li></ul>`},
  {c:"Python",lvl:"Мид",q:"Как устроен dict? Какая сложность операций?",
   a:`Хеш-таблица: ключ хешируется, по хешу находится корзина.<ul>
   <li>Доступ/вставка/удаление — в среднем <b>O(1)</b>.</li>
   <li>Ключи хешируемы (immutable). С 3.7 порядок вставки сохраняется.</li></ul>`},
  {c:"Python",lvl:"Мид",q:"Как Python управляет памятью и собирает мусор?",
   a:`<ul><li>Основа — <b>подсчёт ссылок</b>: 0 → удаление.</li>
   <li>Для <b>циклов</b> ссылок — сборщик <code>gc</code> по поколениям.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"shallow copy vs deep copy?",
   a:`<ul><li><b>Поверхностная</b> (<code>copy.copy</code>): новый контейнер, вложенное — те же ссылки.</li>
   <li><b>Глубокая</b> (<code>deepcopy</code>): рекурсивно копирует всё.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"*args и **kwargs — что это?",
   a:`<ul><li><code>*args</code> — позиционные (кортеж).</li>
   <li><code>**kwargs</code> — именованные (словарь).</li>
   <li>При вызове <code>f(*lst, **dct)</code> — распаковка.</li></ul>`},
  {c:"Python",lvl:"Мид",q:"__new__ vs __init__?",
   a:`<ul><li><code>__new__</code> создаёт и возвращает экземпляр (синглтоны, immutable-подклассы).</li>
   <li><code>__init__</code> инициализирует уже созданный, ничего не возвращает.</li></ul>`},
  {c:"Python",lvl:"Мид",q:"Что даёт __slots__?",
   a:`Фиксированный набор атрибутов вместо <code>__dict__</code>.<ul>
   <li>Экономит память на массе объектов, чуть быстрее доступ.</li>
   <li>Минус: нельзя добавлять произвольные атрибуты.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"list comprehension vs генераторное выражение?",
   a:`<ul><li><code>[..]</code> строит весь список в памяти.</li>
   <li><code>(..)</code> — ленивый генератор, по одному; лучше для больших данных и агрегаций.</li></ul>`},
  {c:"asyncio",lvl:"Мид",q:"Как работает async/await и event loop?",
   a:`<b>Event loop</b> переключает корутины: на <code>await</code> корутина отдаёт управление на время I/O, цикл крутит другие.<ul>
   <li>Кооперативная многозадачность в одном потоке.</li></ul>`,
   img:`<svg class="dgm" viewBox="0 0 320 150" width="320" xmlns="http://www.w3.org/2000/svg"><circle class="ac" cx="80" cy="72" r="40"/><text x="80" y="69" text-anchor="middle">event</text><text x="80" y="84" text-anchor="middle">loop</text><rect class="bx" x="180" y="24" width="124" height="26" rx="6"/><text x="242" y="41" text-anchor="middle">корутина A</text><rect class="bx" x="180" y="60" width="124" height="26" rx="6"/><text x="242" y="77" text-anchor="middle">корутина B</text><rect class="bx" x="180" y="96" width="124" height="26" rx="6"/><text x="242" y="113" text-anchor="middle">корутина C</text><path class="ln" d="M121 62 L180 37"/><path class="ln" d="M122 72 L180 73"/><path class="ln" d="M121 84 L180 109"/><text class="mut" x="162" y="143" text-anchor="middle">await → управление назад в loop</text></svg>`},
  {c:"asyncio",lvl:"Мид",q:"coroutine, Task и Future — разница?",
   a:`<ul><li><b>Корутина</b> — результат <code>async def</code>, сама не бежит.</li>
   <li><b>Task</b> — корутина в loop (<code>create_task</code>), крутится в фоне.</li>
   <li><b>Future</b> — низкоуровневое обещание результата; Task — его подкласс.</li></ul>`},
  {c:"asyncio",lvl:"Мид",q:"Почему блокирующий код ломает asyncio и что делать?",
   a:`Синхронный блок не отдаёт управление → замирают все корутины.<ul>
   <li>Брать async-либы (<code>httpx</code>, <code>asyncpg</code>).</li>
   <li>Неизбежный блок — <code>run_in_executor</code> / <code>asyncio.to_thread</code>.</li></ul>`},
  {c:"asyncio",lvl:"Мид",q:"asyncio.gather — зачем?",
   a:`Запускает корутины <b>конкурентно</b>, время ≈ самой долгой.<ul>
   <li>Последовательные await складываются.</li>
   <li><code>return_exceptions=True</code> — не падать на первой ошибке.</li></ul>`},
  {c:"asyncio",lvl:"Мид",q:"Когда asyncio НЕ поможет?",
   a:`На <b>CPU-bound</b>: один поток + GIL, параллелизма по вычислениям нет. Нужны процессы/нативные либы.`},
  {c:"FastAPI",lvl:"Джун",q:"Почему FastAPI быстрый и чем хорош?",
   a:`<ul><li>Async (ASGI/Starlette) → высокая конкурентность на I/O.</li>
   <li>Pydantic-валидация из type hints.</li>
   <li>Автодоки OpenAPI, DI через <code>Depends</code>.</li></ul>`},
  {c:"FastAPI",lvl:"Мид",q:"Что такое Depends (DI) в FastAPI?",
   a:`Подстановка зависимостей в хендлер (сессия БД, текущий юзер).<ul>
   <li>Переиспользование логики, лёгкий мок через <code>dependency_overrides</code>.</li></ul>`},
  {c:"FastAPI",lvl:"Мид",q:"async def vs def в эндпоинте FastAPI?",
   a:`<ul><li><code>async def</code> — в event loop, код должен быть неблокирующим.</li>
   <li><code>def</code> — FastAPI гонит в threadpool.</li>
   <li>Блок внутри <code>async def</code> тормозит весь сервер.</li></ul>`},
  {c:"FastAPI",lvl:"Мид",q:"Pydantic — что делает и что нового в v2?",
   a:`Валидация/парсинг/сериализация по моделям.<ul>
   <li>v2 на Rust (pydantic-core) — быстрее.</li>
   <li><code>.model_dump()</code>, <code>field_validator</code>, settings → <code>pydantic-settings</code>.</li></ul>`},
  {c:"FastAPI",lvl:"Мид",q:"BackgroundTasks vs Celery?",
   a:`<ul><li><b>BackgroundTasks</b> — лёгкое после ответа, тот же процесс, упал — потеряли.</li>
   <li><b>Celery/очередь</b> — тяжёлое, ретраи, расписание, отдельные воркеры.</li></ul>`},
  {c:"Django/DRF",lvl:"Мид",q:"Проблема N+1 и как её решить?",
   a:`1 запрос за список + N на связанные = тормоза.<ul>
   <li><b>select_related</b> — FK/OneToOne (JOIN).</li>
   <li><b>prefetch_related</b> — M2M/обратные FK (доп. запрос).</li></ul>`,
   img:`<svg class="dgm" viewBox="0 0 320 150" width="320" xmlns="http://www.w3.org/2000/svg"><text x="78" y="13" text-anchor="middle" class="mut">N+1</text><rect class="bxa" x="30" y="22" width="96" height="22" rx="5"/><text x="78" y="37" text-anchor="middle">SELECT список</text><rect class="bx" x="46" y="52" width="64" height="15" rx="4"/><rect class="bx" x="46" y="71" width="64" height="15" rx="4"/><rect class="bx" x="46" y="90" width="64" height="15" rx="4"/><rect class="bx" x="46" y="109" width="64" height="15" rx="4"/><text class="mut" x="78" y="140" text-anchor="middle">+N запросов</text><line class="ln" x1="160" y1="12" x2="160" y2="138"/><text x="245" y="13" text-anchor="middle" class="mut">fix</text><rect class="bxa" x="197" y="22" width="96" height="22" rx="5"/><text x="245" y="37" text-anchor="middle">SELECT список</text><rect class="bxa" x="197" y="54" width="96" height="22" rx="5"/><text x="245" y="69" text-anchor="middle">JOIN / IN</text><text class="mut" x="245" y="140" text-anchor="middle">2 запроса</text></svg>`},
  {c:"Django/DRF",lvl:"Мид",q:"Почему QuerySet ленивый?",
   a:`В БД не идёт, пока не обратишься (итерация, list, срез, len).<ul>
   <li>Можно строить цепочкой; результат кешируется после первого обращения.</li></ul>`},
  {c:"Django/DRF",lvl:"Джун",q:"Что такое middleware в Django?",
   a:`Слой-обёртка вокруг каждого request/response: auth, сессии, CORS, логирование. Проходит цепочкой на входе и выходе.`},
  {c:"Django/DRF",lvl:"Джун",q:"Django vs FastAPI — когда что?",
   a:`<ul><li><b>Django</b> — батарейки: ORM, админка, auth. CRUD/монолит.</li>
   <li><b>FastAPI</b> — лёгкий async для API, без встроенной ORM/админки.</li></ul>`},
  {c:"Django/DRF",lvl:"Джун",q:"Что такое сериализатор в DRF?",
   a:`Объект ↔ JSON + валидация. <code>ModelSerializer</code> генерит поля из модели, отвечает за вложенные связи и представление.`},
  {c:"SQL",lvl:"Мид",q:"Что такое индекс и когда он НЕ ускоряет?",
   a:`B-tree для быстрого поиска, O(log n). Не используется при:<ul>
   <li>функции над колонкой (<code>lower(name)=</code>);</li>
   <li><code>LIKE '%x'</code>;</li>
   <li>выборке почти всей таблицы (seq scan).</li></ul>`},
  {c:"SQL",lvl:"Мид",q:"Как найти и ускорить медленный SQL?",
   a:`<ul><li><code>EXPLAIN (ANALYZE, BUFFERS)</code> — план запроса.</li>
   <li>Фиксы: убрать N+1, индексы под WHERE/JOIN/ORDER BY, только нужные колонки, пагинация.</li></ul>`},
  {c:"SQL",lvl:"Джун",q:"Что такое ACID?",
   a:`<ul><li><b>A</b> — всё или ничего; <b>C</b> — валидное→валидное;</li>
   <li><b>I</b> — изоляция параллельных; <b>D</b> — переживёт сбой.</li></ul>`},
  {c:"SQL",lvl:"Синьер",q:"Уровни изоляции транзакций и аномалии?",
   a:`<code>READ UNCOMMITTED → READ COMMITTED → REPEATABLE READ → SERIALIZABLE</code>.<ul>
   <li>Аномалии: грязное/неповторяемое чтение, фантомы.</li>
   <li>Дефолт Postgres — READ COMMITTED.</li></ul>`},
  {c:"SQL",lvl:"Джун",q:"Типы JOIN?",
   a:`<ul><li><b>INNER</b> — только совпавшие.</li><li><b>LEFT</b> — все левые + совпавшие правые.</li>
   <li><b>RIGHT</b> — зеркально. <b>FULL</b> — все из обеих.</li></ul>`,
   img:`<svg class="dgm" viewBox="0 0 320 78" width="320" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="jin"><circle cx="48" cy="30" r="17"/></clipPath></defs><circle class="ac" cx="26" cy="30" r="17"/><circle class="ac" cx="48" cy="30" r="17"/><circle class="fl" cx="26" cy="30" r="17" clip-path="url(#jin)"/><text x="37" y="68" text-anchor="middle">INNER</text><circle class="fl" cx="106" cy="30" r="17"/><circle class="ac" cx="106" cy="30" r="17"/><circle class="ac" cx="128" cy="30" r="17"/><text x="117" y="68" text-anchor="middle">LEFT</text><circle class="ac" cx="186" cy="30" r="17"/><circle class="fl" cx="208" cy="30" r="17"/><circle class="ac" cx="208" cy="30" r="17"/><text x="197" y="68" text-anchor="middle">RIGHT</text><circle class="fl" cx="266" cy="30" r="17"/><circle class="fl" cx="288" cy="30" r="17"/><circle class="ac" cx="266" cy="30" r="17"/><circle class="ac" cx="288" cy="30" r="17"/><text x="277" y="68" text-anchor="middle">FULL</text></svg>`},
  {c:"SQL",lvl:"Мид",q:"Нормализация vs денормализация?",
   a:`<ul><li><b>Нормализация</b> — убираем дубли, целостность.</li>
   <li><b>Денормализация</b> — осознанно дублируем ради скорости чтения (меньше JOIN).</li></ul>`},
  {c:"SQL",lvl:"Синьер",q:"Что такое deadlock и как бороться?",
   a:`Две транзакции ждут блокировки друг друга по кругу.<ul>
   <li>Брать блокировки в одном порядке, короткие транзакции, ретрай на ошибку сериализации.</li></ul>`},
  {c:"SQL",lvl:"Джун",q:"WHERE vs HAVING?",
   a:`<ul><li><b>WHERE</b> — до группировки.</li><li><b>HAVING</b> — после GROUP BY, по агрегатам.</li></ul>`},
  {c:"Redis",lvl:"Джун",q:"Для чего Redis и какие структуры?",
   a:`In-memory key-value.<ul><li>String, Hash, List, Set, Sorted Set, Stream.</li>
   <li>Кеш, сессии, счётчики, rate limit, очереди, pub/sub, лидерборды.</li></ul>`},
  {c:"Redis",lvl:"Мид",q:"Кеширование: стратегии и инвалидация?",
   a:`<ul><li><b>Cache-aside</b>: промах → БД → в кеш.</li>
   <li>Всегда <b>TTL</b>; инвалидация по TTL или явно при записи.</li></ul>`,
   img:`<svg class="dgm" viewBox="0 0 330 120" width="330" xmlns="http://www.w3.org/2000/svg"><rect class="bx" x="8" y="45" width="72" height="30" rx="6"/><text x="44" y="64" text-anchor="middle">App</text><rect class="bxa" x="128" y="45" width="72" height="30" rx="6"/><text x="164" y="64" text-anchor="middle">Cache</text><rect class="bx" x="248" y="45" width="74" height="30" rx="6"/><text x="285" y="64" text-anchor="middle">DB</text><path class="ac" d="M80 56 L126 56"/><text class="mut" x="103" y="50" text-anchor="middle">1 read</text><path class="ln" d="M200 64 L246 64"/><text class="mut" x="223" y="80" text-anchor="middle">2 miss</text><path class="ln" d="M246 50 L202 50"/><text class="mut" x="223" y="44" text-anchor="middle">3 set+TTL</text><text class="mut" x="164" y="105" text-anchor="middle">hit → сразу из кеша</text></svg>`},
  {c:"Redis",lvl:"Мид",q:"Как Redis обеспечивает надёжность?",
   a:`<ul><li><b>RDB</b> — снапшоты (быстрый рестарт, риск потерять секунды).</li>
   <li><b>AOF</b> — лог команд (надёжнее). Репликация + Sentinel/Cluster.</li></ul>`},
  {c:"Redis",lvl:"Мид",q:"Атомарный счётчик / rate limit в Redis?",
   a:`<ul><li><code>INCR</code> атомарен; <code>INCR</code> + <code>EXPIRE</code> = rate limiter.</li>
   <li>Многошаговая атомарность — Lua-скрипт или MULTI/EXEC.</li></ul>`},
  {c:"Очереди",lvl:"Мид",q:"Kafka vs RabbitMQ?",
   a:`<ul><li><b>RabbitMQ</b> — брокер очередей (push, удаляется после ack), сложная маршрутизация.</li>
   <li><b>Kafka</b> — распределённый лог (pull, хранится, перечитывается по offset), стриминг/throughput.</li></ul>`},
  {c:"Очереди",lvl:"Синьер",q:"Гарантии доставки: at-least / at-most / exactly-once?",
   a:`<ul><li><b>at-most-once</b> — возможна потеря.</li>
   <li><b>at-least-once</b> — дубли → нужна идемпотентность.</li>
   <li><b>exactly-once</b> — дорого; в Kafka через транзакции/идемпотентного продюсера.</li></ul>`},
  {c:"Очереди",lvl:"Синьер",q:"Партиции и consumer group в Kafka?",
   a:`<ul><li><b>Партиция</b> — единица параллелизма и порядка (по ключу).</li>
   <li><b>Consumer group</b>: партиции делятся между консьюмерами; одну партицию читает один консьюмер группы.</li></ul>`,
   img:`<svg class="dgm" viewBox="0 0 330 150" width="330" xmlns="http://www.w3.org/2000/svg"><text x="8" y="12" class="mut">topic → partitions</text><text x="6" y="38">P0</text><rect class="bx" x="30" y="24" width="34" height="20" rx="4"/><rect class="bx" x="68" y="24" width="34" height="20" rx="4"/><rect class="bx" x="106" y="24" width="34" height="20" rx="4"/><rect class="bx" x="144" y="24" width="34" height="20" rx="4"/><text x="6" y="74">P1</text><rect class="bx" x="30" y="60" width="34" height="20" rx="4"/><rect class="bx" x="68" y="60" width="34" height="20" rx="4"/><rect class="bx" x="106" y="60" width="34" height="20" rx="4"/><rect class="bx" x="144" y="60" width="34" height="20" rx="4"/><text x="6" y="110">P2</text><rect class="bx" x="30" y="96" width="34" height="20" rx="4"/><rect class="bx" x="68" y="96" width="34" height="20" rx="4"/><rect class="bx" x="106" y="96" width="34" height="20" rx="4"/><rect class="bx" x="144" y="96" width="34" height="20" rx="4"/><rect class="bxa" x="250" y="28" width="74" height="26" rx="6"/><text x="287" y="45" text-anchor="middle">consumer 1</text><rect class="bxa" x="250" y="90" width="74" height="26" rx="6"/><text x="287" y="107" text-anchor="middle">consumer 2</text><path class="ln" d="M182 34 L250 40"/><path class="ln" d="M182 70 L250 46"/><path class="ln" d="M182 106 L250 103"/><text class="mut" x="120" y="140" text-anchor="middle">порядок гарантирован внутри партиции</text></svg>`},
  {c:"Очереди",lvl:"Мид",q:"Что такое идемпотентность и зачем в очередях?",
   a:`Повторная обработка не меняет результат. При at-least-once дубли неизбежны.<ul>
   <li>Уникальный ключ + проверка «обработано», UPSERT, dedup-таблица.</li></ul>`},
  {c:"Docker",lvl:"Джун",q:"Образ vs контейнер?",
   a:`<ul><li><b>Image</b> — неизменяемый шаблон из слоёв (класс).</li>
   <li><b>Container</b> — запущенный экземпляр + изменяемый слой (объект).</li></ul>`},
  {c:"Docker",lvl:"Мид",q:"Зачем слои и multi-stage build?",
   a:`<ul><li>Инструкция = слой, кешируется → install до COPY кода.</li>
   <li><b>Multi-stage</b>: собрать в толстом образе, в финал — только артефакт.</li></ul>`},
  {c:"Docker",lvl:"Мид",q:"Docker Compose vs Kubernetes?",
   a:`<ul><li><b>Compose</b> — связка сервисов на одной машине.</li>
   <li><b>K8s</b> — оркестрация на кластере: масштаб, self-healing, rolling-деплой.</li></ul>`},
  {c:"Тесты",lvl:"Джун",q:"Что такое fixture в pytest?",
   a:`<code>@pytest.fixture</code> готовит окружение и прибирается через <code>yield</code>.<ul>
   <li>Переиспользуется, параметризуется, имеет scope.</li></ul>`},
  {c:"Тесты",lvl:"Джун",q:"Unit vs integration. Зачем мокать?",
   a:`<ul><li><b>Unit</b> — изолированно, зависимости замоканы.</li>
   <li><b>Integration</b> — компоненты вместе (API+БД).</li>
   <li>Mock — быстро, детерминированно, без похода наружу.</li></ul>`},
  {c:"Общее",lvl:"Мид",q:"Идемпотентные HTTP-методы?",
   a:`Повтор даёт тот же результат.<ul>
   <li>Идемпотентны: GET, PUT, DELETE, HEAD.</li>
   <li>POST — нет (дубль); защита idempotency-key.</li></ul>`},
  {c:"Общее",lvl:"Джун",q:"Основные HTTP статус-коды?",
   a:`<ul><li>2xx успех (200/201/204); 3xx редирект (301/304);</li>
   <li>4xx клиент (400/401/403/404/409/422/429); 5xx сервер (500/502/503).</li></ul>`},
  {c:"Общее",lvl:"Мид",q:"Аутентификация vs авторизация. Как работает JWT?",
   a:`<ul><li>Аутентификация — кто ты; авторизация — что можно.</li>
   <li><b>JWT</b> — подписанный header.payload.signature, stateless; access + refresh.</li></ul>`},
  {c:"Общее",lvl:"Джун",q:"REST — ключевые принципы?",
   a:`<ul><li>Ресурсы через URL, действия — методами.</li>
   <li>Stateless, правильные коды, версионирование.</li></ul>`},

  // ========================= ДЖУН (доп. 20) =========================
  {c:"Python",lvl:"Джун",q:"set vs frozenset — когда использовать set?",
   a:`<ul><li><code>set</code> — изменяемое множество уникальных хешируемых элементов, O(1) проверка вхождения.</li>
   <li><code>frozenset</code> — неизменяемое, можно как ключ dict/элемент set.</li>
   <li>Когда важны уникальность и быстрый <code>in</code>.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"__str__ vs __repr__?",
   a:`<ul><li><code>__str__</code> — человекочитаемое (для <code>print</code>/пользователя).</li>
   <li><code>__repr__</code> — однозначное, для разработчика/отладки (идеально — валидный Python). Фолбэк, если нет <code>__str__</code>.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"enumerate и zip — зачем?",
   a:`<ul><li><code>enumerate(it)</code> — индекс + элемент, без ручного счётчика.</li>
   <li><code>zip(a,b)</code> — параллельный обход; останавливается по короткой.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"Что считается ложным (falsy) в Python?",
   a:`<code>False, None, 0, 0.0, "", [], {}, (), set()</code> и объекты с <code>__bool__</code>/<code>__len__</code>==0.<br>
   Потому <code>if items:</code> лучше, чем <code>if len(items) &gt; 0</code>.`},
  {c:"Python",lvl:"Джун",q:"f-string vs .format() vs %?",
   a:`<ul><li><b>f-string</b> (<code>f"{x:.2f}"</code>) — быстрее и читаемее, предпочтителен.</li>
   <li><code>.format()</code> / <code>%</code> — старые способы; <code>%</code> уже легаси.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"try / except / else / finally — что когда срабатывает?",
   a:`<ul><li><b>try</b> — рискованный код; <b>except</b> — при ошибке;</li>
   <li><b>else</b> — если исключения НЕ было; <b>finally</b> — всегда (очистка).</li></ul>`},
  {c:"Python",lvl:"Джун",q:"Как создать своё исключение? Почему плохо голый except?",
   a:`<ul><li>Наследуй от <code>Exception</code>: <code>class MyErr(Exception): ...</code>.</li>
   <li>Голый <code>except:</code> ловит всё, включая <code>KeyboardInterrupt</code>/<code>SystemExit</code> и прячет баги. Лови конкретное.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"Зачем аннотации типов? Влияют ли они в рантайме?",
   a:`<ul><li>Подсказки для IDE, mypy, читаемости; Pydantic/FastAPI используют их для валидации.</li>
   <li>Сам Python их <b>не проверяет</b> в рантайме (по умолчанию).</li></ul>`},
  {c:"Python",lvl:"Джун",q:"Зачем виртуальное окружение (venv)?",
   a:`Изолирует зависимости проекта от системного Python и других проектов.<ul>
   <li>Разные версии пакетов не конфликтуют; воспроизводимость окружения.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"requirements.txt и pip freeze — зачем фиксировать версии?",
   a:`<ul><li>Фикс версий (<code>pkg==1.2.3</code>) → одинаковое окружение везде, воспроизводимые сборки.</li>
   <li>Без фикса обновление зависимости может незаметно сломать прод.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"Что делает if __name__ == '__main__'?",
   a:`Код в блоке выполняется только при <b>прямом запуске</b> файла, а не при импорте модуля.<ul>
   <li>Позволяет файлу быть и скриптом, и переиспользуемым модулем.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"sorted: key, reverse, стабильность. sort vs sorted?",
   a:`<ul><li><code>sorted(it, key=f, reverse=True)</code> → новый список; <code>list.sort()</code> — на месте.</li>
   <li>Сортировка <b>стабильная</b> (равные сохраняют порядок).</li></ul>`},
  {c:"Python",lvl:"Джун",q:"Почему строки склеивают через ''.join, а не += в цикле?",
   a:`Строки immutable → каждое <code>+=</code> создаёт новую строку, O(n²).<ul>
   <li><code>''.join(parts)</code> — один проход, O(n).</li></ul>`},
  {c:"Python",lvl:"Джун",q:"bytes vs str, encode/decode?",
   a:`<ul><li><code>str</code> — текст (Unicode), <code>bytes</code> — сырые байты.</li>
   <li><code>str.encode('utf-8')</code> → bytes; <code>bytes.decode()</code> → str. Из сети/файла приходят bytes.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"dict.get / setdefault / defaultdict?",
   a:`<ul><li><code>d.get(k, default)</code> — без KeyError.</li>
   <li><code>d.setdefault(k, [])</code> — вернёт/создаст.</li>
   <li><code>defaultdict(list)</code> — автоинициализация значений.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"Позиционные vs именованные аргументы. Что значат / и * в сигнатуре?",
   a:`<ul><li><code>def f(a, b, /, c, *, d)</code>: до <code>/</code> — только позиционные, после <code>*</code> — только именованные.</li>
   <li>Именованные повышают читаемость вызова.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"isinstance vs type() — что предпочесть?",
   a:`<code>isinstance(x, T)</code> учитывает наследование и кортеж типов → предпочтителен.<br>
   <code>type(x) is T</code> — строгое сравнение, без подклассов.`},
  {c:"Python",lvl:"Джун",q:"Распаковка: что делает a, *rest = [1,2,3]?",
   a:`<ul><li><code>a=1</code>, <code>rest=[2,3]</code> — «звёздочка» собирает остаток.</li>
   <li>Swap без temp: <code>a, b = b, a</code>.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"Что такое dataclass и зачем?",
   a:`<code>@dataclass</code> автогенерит <code>__init__</code>/<code>__repr__</code>/<code>__eq__</code> из аннотаций полей.<ul>
   <li>Меньше boilerplate для классов-контейнеров данных.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"range ленивый? range vs list?",
   a:`<code>range</code> не хранит все числа — вычисляет на лету (O(1) память).<ul>
   <li><code>list(range(n))</code> материализует все числа в память.</li></ul>`},

  // ========================= МИД (доп. 40) =========================
  {c:"Python",lvl:"Мид",q:"Что такое дескриптор?",
   a:`Объект с <code>__get__</code>/<code>__set__</code>/<code>__delete__</code>, управляющий доступом к атрибуту.<ul>
   <li>На них построены <code>property</code>, <code>classmethod</code>, ORM-поля.</li></ul>`},
  {c:"Python",lvl:"Мид",q:"Что такое property?",
   a:`Дескриптор, превращающий метод в «атрибут» с геттером/сеттером.<ul>
   <li>Валидация/вычисление при доступе без смены внешнего API (<code>obj.x</code>).</li></ul>`},
  {c:"Python",lvl:"Мид",q:"Что такое MRO и как работает super()?",
   a:`<b>MRO</b> — порядок разрешения методов при множественном наследовании (алгоритм C3).<ul>
   <li><code>super()</code> идёт по MRO, а не «к родителю» — важно для diamond-наследования и миксинов.</li></ul>`},
  {c:"Python",lvl:"Мид",q:"Late binding: почему lambda в цикле ведёт себя неожиданно?",
   a:`<code>[lambda: i for i in range(3)]</code> — все вернут <b>2</b>: замыкание берёт <code>i</code> по ссылке, а не по значению.<ul>
   <li>Фикс: <code>lambda i=i: i</code> (связать на момент создания).</li></ul>`},
  {c:"Python",lvl:"Мид",q:"dataclass vs namedtuple vs pydantic vs dict?",
   a:`<ul><li><b>dict</b> — без схемы.</li><li><b>namedtuple</b> — immutable, лёгкий.</li>
   <li><b>dataclass</b> — обычный класс-контейнер, без валидации.</li>
   <li><b>pydantic</b> — валидация + парсинг типов (для границ системы/API).</li></ul>`},
  {c:"Python",lvl:"Мид",q:"Когда нужны __eq__ и __hash__ вместе?",
   a:`Чтобы класть объект в set/ключ dict, нужны оба и согласованные: равные объекты → равный хеш.<ul>
   <li>Переопределил <code>__eq__</code> — объект станет unhashable, пока не задашь <code>__hash__</code>.</li></ul>`},
  {c:"Python",lvl:"Мид",q:"itertools — что полезного?",
   a:`<ul><li><code>chain</code> — склейка итераторов; <code>islice</code> — срез без материализации;</li>
   <li><code>groupby</code> — группировка подряд идущих; <code>product/combinations</code>.</li></ul>`},
  {c:"Python",lvl:"Мид",q:"functools — lru_cache, partial, reduce?",
   a:`<ul><li><code>lru_cache</code> — мемоизация (осторожно с mutable-аргументами).</li>
   <li><code>partial</code> — фиксация части аргументов; <code>reduce</code> — свёртка.</li></ul>`},
  {c:"Python",lvl:"Мид",q:"Что такое __call__?",
   a:`Делает экземпляр вызываемым: <code>obj()</code> запускает <code>obj.__call__()</code>.<ul>
   <li>Полезно для объектов-функций с состоянием, декораторов-классов.</li></ul>`},
  {c:"Python",lvl:"Мид",q:"Генератор: что делают send() и close()?",
   a:`<ul><li><code>send(v)</code> — передать значение внутрь генератора (результат <code>yield</code>).</li>
   <li><code>close()</code> — кинуть <code>GeneratorExit</code>, остановить. Основа корутин до async.</li></ul>`},
  {c:"asyncio",lvl:"Мид",q:"Как ограничить конкурентность в asyncio?",
   a:`<code>asyncio.Semaphore(N)</code> — не больше N корутин одновременно в критической секции.<ul>
   <li>Нужно, чтобы не положить внешний API/БД тысячами параллельных запросов.</li></ul>`},
  {c:"asyncio",lvl:"Мид",q:"Таймауты и отмена в asyncio?",
   a:`<ul><li><code>asyncio.timeout()</code> / <code>wait_for</code> — ограничить время.</li>
   <li>Отмена кидает <code>CancelledError</code> — его нельзя глушить <code>except Exception</code>, нужна аккуратная очистка.</li></ul>`},
  {c:"asyncio",lvl:"Мид",q:"Почему нельзя терять ссылку на create_task?",
   a:`Loop держит на Task слабую ссылку → задача без ссылки может быть собрана GC и молча не доедет.<ul>
   <li>Храни ссылку (набор задач) и логируй исключения.</li></ul>`},
  {c:"asyncio",lvl:"Мид",q:"Async context manager и async for — зачем?",
   a:`<ul><li><code>async with</code> (<code>__aenter__/__aexit__</code>) — асинхронный захват ресурса (пул, сессия).</li>
   <li><code>async for</code> — обход асинхронного генератора/стрима без блокировки.</li></ul>`},
  {c:"FastAPI",lvl:"Мид",q:"Как правильно инициализировать ресурсы (lifespan)?",
   a:`<code>lifespan</code>-контекст (или startup/shutdown) — создать пул БД/клиентов при старте, закрыть при остановке.<ul>
   <li>Не открывать соединение на каждый запрос.</li></ul>`},
  {c:"FastAPI",lvl:"Мид",q:"Зачем response_model и from_attributes (orm_mode)?",
   a:`<ul><li><b>response_model</b> фильтрует/валидирует ответ, прячет лишние поля (пароли).</li>
   <li><code>from_attributes=True</code> — собрать Pydantic-модель прямо из ORM-объекта.</li></ul>`},
  {c:"FastAPI",lvl:"Мид",q:"Depends с yield — как сделать cleanup?",
   a:`<code>def get_db():<br>&nbsp;db = Session()<br>&nbsp;try: yield db<br>&nbsp;finally: db.close()</code><br>
   Код после yield выполнится после ответа — закрытие сессии/транзакции.`},
  {c:"SQL",lvl:"Мид",q:"SQLAlchemy Session, Unit of Work, identity map?",
   a:`<ul><li><b>Session</b> копит изменения и шлёт их на <code>commit</code> (Unit of Work).</li>
   <li><b>Identity map</b>: один объект на строку в рамках сессии — не задублируется.</li></ul>`},
  {c:"SQL",lvl:"Мид",q:"selectinload vs joinedload в SQLAlchemy?",
   a:`<ul><li><b>joinedload</b> — один запрос с JOIN (хорошо для to-one).</li>
   <li><b>selectinload</b> — отдельный <code>IN</code>-запрос (лучше для коллекций, без размножения строк).</li>
   <li>Оба решают N+1.</li></ul>`},
  {c:"SQL",lvl:"Мид",q:"Чем 2.0-style SQLAlchemy отличается от 1.x?",
   a:`<ul><li>Единый <code>select()</code> + <code>session.execute()</code> вместо <code>Query</code>.</li>
   <li>Полноценный async (<code>AsyncSession</code>), строже типизация.</li></ul>`},
  {c:"SQL",lvl:"Мид",q:"Что Alembic autogenerate НЕ ловит?",
   a:`<ul><li>Переименование таблиц/колонок (видит как drop+create), смену типа в ряде СУБД, data-миграции, CHECK/триггеры.</li>
   <li>Миграции всегда просматривать и править руками.</li></ul>`},
  {c:"SQL",lvl:"Мид",q:"Зачем connection pool?",
   a:`Открыть TCP+auth к БД дорого → пул переиспользует соединения.<ul>
   <li>Параметры <code>pool_size</code>/<code>max_overflow</code>; слишком большой пул кладёт БД.</li></ul>`},
  {c:"SQL",lvl:"Мид",q:"Составной индекс: что такое leftmost prefix?",
   a:`Индекс <code>(a, b, c)</code> работает для условий по <code>a</code>, <code>a,b</code>, <code>a,b,c</code>, но <b>не</b> по одному <code>b</code> или <code>c</code>.<ul>
   <li>Порядок колонок в индексе критичен.</li></ul>`},
  {c:"SQL",lvl:"Мид",q:"Что такое index-only / покрывающий индекс?",
   a:`Если индекс содержит все нужные колонки, СУБД отвечает из индекса, не читая таблицу (index-only scan).<ul>
   <li>Postgres: <code>INCLUDE</code>-колонки в индексе.</li></ul>`},
  {c:"SQL",lvl:"Мид",q:"Keyset пагинация vs OFFSET — что лучше на больших данных?",
   a:`<ul><li><code>OFFSET N</code> на больших N медленный (сканит и отбрасывает).</li>
   <li><b>Keyset</b>: <code>WHERE id &gt; :last ORDER BY id LIMIT n</code> — стабильно быстро.</li></ul>`},
  {c:"Redis",lvl:"Мид",q:"Что происходит при нехватке памяти (eviction)?",
   a:`Политика <code>maxmemory-policy</code>: <code>noeviction</code> (ошибки на запись), <code>allkeys-lru</code>, <code>volatile-ttl</code> и т.д.<ul>
   <li>Для кеша — обычно <code>allkeys-lru</code>.</li></ul>`},
  {c:"Очереди",lvl:"Мид",q:"RabbitMQ: типы exchange и DLQ?",
   a:`<ul><li><b>direct</b> (по routing key), <b>topic</b> (по шаблону), <b>fanout</b> (всем).</li>
   <li><b>DLQ</b> — очередь для сообщений, которые отвергли (<code>nack</code>) или протухли; разбираешь отдельно.</li></ul>`},
  {c:"Очереди",lvl:"Мид",q:"Как в Kafka сохранить порядок сообщений?",
   a:`Порядок гарантирован только внутри партиции.<ul>
   <li>Слать с одним <b>ключом</b> (напр. userId) → все его события в одну партицию → по порядку.</li></ul>`},
  {c:"Docker",lvl:"Мид",q:"ENTRYPOINT vs CMD?",
   a:`<ul><li><b>ENTRYPOINT</b> — основная команда контейнера (фиксированная).</li>
   <li><b>CMD</b> — аргументы по умолчанию, легко переопределить при <code>docker run</code>.</li></ul>`},
  {c:"Docker",lvl:"Мид",q:"volume vs bind mount, почему не писать в слой контейнера?",
   a:`<ul><li><b>volume</b> — управляемое Docker хранилище (данные переживают контейнер).</li>
   <li><b>bind mount</b> — папка хоста (dev).</li>
   <li>Слой контейнера эфемерный → данные теряются при пересоздании.</li></ul>`},
  {c:"Docker",lvl:"Мид",q:"Как уменьшить размер образа?",
   a:`<ul><li>slim/alpine база, multi-stage, <code>.dockerignore</code>.</li>
   <li>Ставить зависимости до COPY кода (кеш), чистить кеш пакетов, один слой для apt-install.</li></ul>`},
  {c:"Тесты",lvl:"Мид",q:"mock vs stub vs fake. Где патчить?",
   a:`<ul><li><b>stub</b> — заранее заданные ответы; <b>fake</b> — упрощённая рабочая реализация (in-memory БД); <b>mock</b> — ещё проверяет вызовы.</li>
   <li>Патчить там, где объект <b>используется</b>, а не где определён.</li></ul>`},
  {c:"Тесты",lvl:"Мид",q:"pytest: parametrize и conftest?",
   a:`<ul><li><code>@pytest.mark.parametrize</code> — один тест на много входов.</li>
   <li><code>conftest.py</code> — общие фикстуры/хуки для папки без импорта.</li></ul>`},
  {c:"Общее",lvl:"Мид",q:"Что такое SQL-инъекция и как защититься?",
   a:`Подстановка вредного SQL через необработанный ввод.<ul>
   <li>Защита: <b>параметризованные запросы</b>/ORM (не f-string в SQL), валидация, минимум прав у юзера БД.</li></ul>`},
  {c:"Общее",lvl:"Мид",q:"Как правильно хранить пароли?",
   a:`<ul><li>Только <b>хеш с солью</b> медленным алгоритмом: bcrypt/argon2/scrypt.</li>
   <li>Никогда в открытом виде и не MD5/SHA-1 без соли.</li></ul>`},
  {c:"Общее",lvl:"Мид",q:"Что такое CORS и когда всплывает?",
   a:`Политика браузера: запрос с одного origin на другой блокируется без нужных заголовков.<ul>
   <li>Сервер отдаёт <code>Access-Control-Allow-Origin</code> и т.д. Это защита браузера, не сервера.</li></ul>`},
  {c:"Общее",lvl:"Мид",q:"WSGI vs ASGI, что делают воркеры uvicorn/gunicorn?",
   a:`<ul><li><b>WSGI</b> — синхронный интерфейс (Django/Flask), <b>ASGI</b> — асинхронный (FastAPI).</li>
   <li>gunicorn поднимает несколько процессов-воркеров (с uvicorn-воркером для ASGI) ради использования всех ядер.</li></ul>`},
  {c:"Общее",lvl:"Мид",q:"Как правильно логировать в проде?",
   a:`<ul><li>Модуль <code>logging</code> с уровнями, а не <code>print</code>.</li>
   <li><b>Structured logging</b> (JSON), correlation/request id, без секретов в логах.</li></ul>`},
  {c:"Общее",lvl:"Мид",q:"Как хранить секреты и конфиг?",
   a:`<ul><li>Конфиг из <b>переменных окружения</b> (12-factor), не в коде/репозитории.</li>
   <li>Секреты — в Vault/Secrets Manager; <code>.env</code> в <code>.gitignore</code>.</li></ul>`},

  // ========================= СИНЬЕР (доп. 28) =========================
  {c:"Архитектура",lvl:"Синьер",q:"Что такое CAP-теорема?",
   a:`Из <b>C</b>onsistency, <b>A</b>vailability, <b>P</b>artition tolerance при сетевом разделении можно гарантировать только 2.<ul>
   <li>P в распределёнке неизбежна → выбор между CP и AP.</li></ul>`,
   img:`<svg class="dgm" viewBox="0 0 230 165" width="230" xmlns="http://www.w3.org/2000/svg"><polygon class="fl" points="115,22 28,138 202,138"/><polygon class="ac" points="115,22 28,138 202,138"/><text x="115" y="16" text-anchor="middle">Consistency</text><text x="22" y="152">Availability</text><text x="208" y="152" text-anchor="end">Partition tol.</text><text class="mut" x="115" y="98" text-anchor="middle">выбери 2</text></svg>`},
  {c:"Архитектура",lvl:"Синьер",q:"Паттерн transactional outbox — зачем?",
   a:`Проблема: нельзя атомарно и в БД записать, и в брокер отправить.<ul>
   <li>Пишем событие в таблицу outbox в той же транзакции, отдельный процесс дочитывает и публикует → надёжная доставка.</li></ul>`},
  {c:"Архитектура",lvl:"Синьер",q:"Распределённые транзакции: 2PC и саги?",
   a:`<ul><li><b>2PC</b> — блокирующий, плохо масштабируется, падение координатора = беда.</li>
   <li><b>Saga</b> — цепочка локальных транзакций с компенсациями при откате; eventual consistency.</li></ul>`},
  {c:"SQL",lvl:"Синьер",q:"Шардирование vs репликация, лаг реплик?",
   a:`<ul><li><b>Репликация</b> — копии данных (читать с реплик, писать в мастер).</li>
   <li><b>Шардирование</b> — разрезание данных по узлам (горизонтальный масштаб записи).</li>
   <li>У реплик <b>лаг</b> → «прочитал не то, что записал».</li></ul>`},
  {c:"Redis",lvl:"Синьер",q:"Cache stampede (thundering herd) — что это и как лечить?",
   a:`Популярный ключ протух → тысячи запросов разом идут в БД.<ul>
   <li>Лечение: блокировка на пересчёт (одному), early recompute, jitter к TTL, stale-while-revalidate.</li></ul>`},
  {c:"Redis",lvl:"Синьер",q:"Стратегии записи кеша: write-through / back / around?",
   a:`<ul><li><b>write-through</b> — пишем в кеш и БД сразу (консистентно, медленнее).</li>
   <li><b>write-back</b> — в кеш, в БД отложенно (быстро, риск потери).</li>
   <li><b>write-around</b> — мимо кеша в БД, кеш греется на чтении.</li></ul>`},
  {c:"SQL",lvl:"Синьер",q:"Что такое MVCC в Postgres и откуда bloat?",
   a:`MVCC: UPDATE/DELETE не меняют строку на месте, а создают новую версию → читатели не блокируют писателей.<ul>
   <li>Мёртвые версии = <b>bloat</b>, их чистит <code>VACUUM</code>/autovacuum.</li></ul>`},
  {c:"SQL",lvl:"Синьер",q:"Оптимистичная vs пессимистичная блокировка?",
   a:`<ul><li><b>Пессимистичная</b>: <code>SELECT ... FOR UPDATE</code> — заблокировать строку.</li>
   <li><b>Оптимистичная</b>: колонка <code>version</code>, при UPDATE проверяем, что не изменилась; иначе ретрай. Меньше блокировок.</li></ul>`},
  {c:"SQL",lvl:"Синьер",q:"Когда нужны partial и GIN индексы?",
   a:`<ul><li><b>Partial</b>: <code>WHERE active</code> — индекс только по части строк, меньше и быстрее.</li>
   <li><b>GIN</b> — для составных значений: jsonb, массивы, полнотекст.</li></ul>`},
  {c:"Очереди",lvl:"Синьер",q:"Что такое rebalancing в Kafka и чем он болезнен?",
   a:`При изменении состава группы партиции перераспределяются.<ul>
   <li>Во время ребаланса потребление встаёт («stop the world»); частые ребалансы = простои. Помогают sticky-assignor и правильные таймауты.</li></ul>`},
  {c:"Очереди",lvl:"Синьер",q:"Retention vs log compaction в Kafka?",
   a:`<ul><li><b>Retention</b> — удаление по времени/размеру.</li>
   <li><b>Compaction</b> — хранить последнее значение по ключу (снимок состояния), остальное чистить.</li></ul>`},
  {c:"Очереди",lvl:"Синьер",q:"Как достичь exactly-once в Kafka?",
   a:`<ul><li>Идемпотентный продюсер (<code>enable.idempotence</code>) + транзакции (atomic read-process-write).</li>
   <li>Либо at-least-once + идемпотентный консьюмер (чаще дешевле и надёжнее).</li></ul>`},
  {c:"Архитектура",lvl:"Синьер",q:"Что такое backpressure и как его обрабатывать?",
   a:`Потребитель медленнее производителя → нельзя бесконечно копить.<ul>
   <li>Ограниченные очереди, <code>Semaphore</code>, pull-модель, сброс/замедление источника, DLQ.</li></ul>`},
  {c:"Архитектура",lvl:"Синьер",q:"Rate limiting: token bucket vs leaky bucket vs sliding window?",
   a:`<ul><li><b>Token bucket</b> — допускает всплески до размера ведра.</li>
   <li><b>Leaky bucket</b> — ровный выходной поток.</li>
   <li><b>Sliding window</b> — точный учёт по скользящему окну.</li></ul>`},
  {c:"Архитектура",lvl:"Синьер",q:"Как сделать идемпотентный API-эндпоинт?",
   a:`Клиент шлёт <b>Idempotency-Key</b>; сервер хранит ключ→результат.<ul>
   <li>Повтор с тем же ключом возвращает сохранённый ответ, не выполняя повторно (важно для платежей).</li></ul>`},
  {c:"Архитектура",lvl:"Синьер",q:"Что такое graceful shutdown воркера/сервиса?",
   a:`По SIGTERM: перестать брать новое, <b>дообработать</b> текущее, закрыть соединения, затем выйти.<ul>
   <li>Иначе рвём запросы/сообщения на деплое. K8s даёт grace period.</li></ul>`},
  {c:"Архитектура",lvl:"Синьер",q:"Observability: logs, metrics, traces?",
   a:`<ul><li><b>Logs</b> — что случилось; <b>metrics</b> — агрегаты (RPS, p95, ошибки); <b>traces</b> — путь запроса между сервисами.</li>
   <li>Correlation id сшивает всё; смотреть p95/p99, не среднее.</li></ul>`},
  {c:"Архитектура",lvl:"Синьер",q:"Circuit breaker и retry — как не усугубить?",
   a:`<ul><li><b>Circuit breaker</b> размыкает вызовы к упавшему сервису, давая восстановиться.</li>
   <li>Retry — с <b>экспоненциальным backoff + jitter</b>, иначе ретраи добьют сервис.</li></ul>`},
  {c:"Архитектура",lvl:"Синьер",q:"Strong vs eventual consistency?",
   a:`<ul><li><b>Strong</b> — после записи все читают новое (дороже, меньше доступность).</li>
   <li><b>Eventual</b> — реплики сойдутся через время; подходит лентам/кешам/счётчикам.</li></ul>`},
  {c:"SQL",lvl:"Синьер",q:"Как катить миграцию БД без даунтайма (expand/contract)?",
   a:`<ul><li><b>Expand</b>: добавить новое (nullable колонка/таблица), писать в оба.</li>
   <li>Выкатить код, забэкфиллить, затем <b>contract</b>: убрать старое. Никогда не ломать совместимость в один шаг.</li></ul>`},
  {c:"SQL",lvl:"Синьер",q:"Чем опасен обычный CREATE INDEX на большой таблице?",
   a:`Берёт блокировку на запись → простой.<ul>
   <li>В Postgres — <code>CREATE INDEX CONCURRENTLY</code> (без блокировки, медленнее, вне транзакции).</li></ul>`},
  {c:"Python",lvl:"Синьер",q:"Как искать утечку памяти в Python?",
   a:`<ul><li><code>tracemalloc</code> — снимки и дифф аллокаций; <code>gc</code>/<code>objgraph</code> — кто держит ссылки.</li>
   <li>Частые причины: глобальные кеши без лимита, незакрытые ресурсы, циклы со <code>__del__</code>.</li></ul>`},
  {c:"Python",lvl:"Синьер",q:"Как реально обойти GIL для CPU-нагрузки?",
   a:`<ul><li><code>multiprocessing</code>/ProcessPool, C/Rust-расширения, numpy (отпускает GIL).</li>
   <li>Python 3.13+ — экспериментальный no-GIL билд.</li></ul>`},
  {c:"Архитектура",lvl:"Синьер",q:"Что такое 12-factor app (ключевое)?",
   a:`Набор правил для облачных сервисов: конфиг в env, stateless-процессы, явные зависимости, логи в stdout, dev/prod паритет, одноразовые процессы.`},
  {c:"Архитектура",lvl:"Синьер",q:"Blue-green vs canary деплой?",
   a:`<ul><li><b>Blue-green</b> — две среды, мгновенное переключение трафика и откат.</li>
   <li><b>Canary</b> — катим на малый % юзеров, следим за метриками, потом расширяем.</li></ul>`},
  {c:"Очереди",lvl:"Синьер",q:"Как сделать консьюмера идемпотентным при at-least-once?",
   a:`<ul><li>Dedup по <b>ключу сообщения</b>: таблица обработанных / <code>INSERT ... ON CONFLICT DO NOTHING</code> / UPSERT.</li>
   <li>Сам эффект должен быть повторяемым без побочек.</li></ul>`},
  {c:"SQL",lvl:"Синьер",q:"Что такое connection pool exhaustion под нагрузкой?",
   a:`Запросов больше, чем соединений в пуле → ждут/таймаутят.<ul>
   <li>Причины: долгие транзакции, N+1, утечки соединений. Лечить — тюнинг пула + оптимизация запросов, а не бесконечное раздувание пула.</li></ul>`},
  {c:"Архитектура",lvl:"Синьер",q:"Как подойти к System Design вопросу?",
   a:`<ol><li>Уточнить требования и масштаб (RPS, объём, latency).</li>
   <li>Прикинуть нагрузку/данные.</li><li>High-level: API, хранилища, кеш, очереди.</li>
   <li>Углубить узкие места: шардирование, репликация, отказоустойчивость, consistency.</li></ol>`},

  // ========================= ЛИД (доп. 12) =========================
  {c:"Архитектура",lvl:"Лид",q:"Монолит vs микросервисы — как выбирать?",
   a:`<ul><li>Монолит — проще на старте/малой команде, одна БД, легче транзакции.</li>
   <li>Микросервисы — независимый деплой/масштаб/команды, но распределённая сложность.</li>
   <li>Начинать обычно с модульного монолита, резать по реальной боли.</li></ul>`},
  {c:"Архитектура",lvl:"Лид",q:"Как определять границы сервисов?",
   a:`По <b>bounded context</b> из DDD: вокруг бизнес-возможности с собственными данными.<ul>
   <li>Высокая связность внутри, слабая — наружу; минимум синхронных зависимостей.</li></ul>`},
  {c:"Архитектура",lvl:"Лид",q:"Стратегия версионирования API?",
   a:`<ul><li>Версия в пути/заголовке, не ломать существующих клиентов.</li>
   <li>Аддитивные изменения, депрекация с окном, контракт-тесты между командами.</li></ul>`},
  {c:"Команда",lvl:"Лид",q:"Как управлять техническим долгом?",
   a:`<ul><li>Фиксировать видимо (бэклог/метки), оценивать влияние vs стоимость.</li>
   <li>Выделять постоянную долю спринта, латать там, где долг реально тормозит доставку, а не везде.</li></ul>`},
  {c:"Команда",lvl:"Лид",q:"На что смотреть в code review и как давать фидбек?",
   a:`<ul><li>Корректность, крайние случаи, безопасность, читаемость, тесты — не стиль (его автоформат).</li>
   <li>Фидбек по коду, не по человеку; объяснять «почему»; разделять must/nice-to-have.</li></ul>`},
  {c:"Команда",lvl:"Лид",q:"Как онбордить и менторить джунов?",
   a:`<ul><li>Малые задачи с ростом сложности, парное программирование, понятные критерии «готово».</li>
   <li>Давать контекст и дорожную карту, разбирать ошибки без наказания.</li></ul>`},
  {c:"Команда",lvl:"Лид",q:"Как оценивать и декомпозировать задачи?",
   a:`<ul><li>Резать на куски &lt;1–2 дней, оценивать относительно (стори-поинты), закладывать неопределённость.</li>
   <li>Сначала рискованное/неясное; оценка — это вероятность, а не обещание.</li></ul>`},
  {c:"Команда",lvl:"Лид",q:"Как выбирать технологию в проект?",
   a:`<ul><li>Критерии: зрелость, экспертиза команды, поддержка/сообщество, стоимость эксплуатации, lock-in.</li>
   <li>Скучная проверенная технология часто лучше модной.</li></ul>`},
  {c:"Команда",lvl:"Лид",q:"Что такое blameless postmortem?",
   a:`Разбор инцидента без поиска виноватых: фокус на системных причинах и процессах.<ul>
   <li>Таймлайн, корневые причины, конкретные action items. Люди честнее → система надёжнее.</li></ul>`},
  {c:"Архитектура",lvl:"Лид",q:"SLA / SLO / SLI и error budget?",
   a:`<ul><li><b>SLI</b> — метрика (доступность, latency); <b>SLO</b> — цель по ней; <b>SLA</b> — договор с санкциями.</li>
   <li><b>Error budget</b> = 1 − SLO: пока есть бюджет ошибок — катим фичи, кончился — чиним надёжность.</li></ul>`},
  {c:"Команда",lvl:"Лид",q:"Что такое ADR (architecture decision record)?",
   a:`Короткий документ на каждое значимое решение: контекст, варианты, выбор, последствия.<ul>
   <li>Сохраняет «почему так» для будущих — экономит споры и археологию.</li></ul>`},
  {c:"Команда",lvl:"Лид",q:"Как обосновать бизнесу рефакторинг/надёжность?",
   a:`На языке бизнеса: скорость доставки, инциденты/простои, стоимость поддержки, риск.<ul>
   <li>Привязать к метрикам и деньгам, предложить поэтапно, а не «большой стоп на переписывание».</li></ul>`},

  // ========================= ДОП. БАНК (yakimka + классика) =========================
  {c:"Python",lvl:"Джун",q:"Как понять, хешируемый ли объект?",
   a:`<ul><li>У объекта есть <code>__hash__</code> (не None) и он неизменяем по идентичности.</li>
   <li>Практически: <code>hash(x)</code> не кидает TypeError; объект можно положить в set/ключ dict.</li>
   <li>Неизменяемые (int, str, tuple из хешируемого) — хешируемы; list/dict/set — нет.</li></ul>`},
  {c:"Python",lvl:"Мид",q:"Что такое коллизия в хеш-таблице и как dict её разрешает?",
   a:`Коллизия — разные ключи дали одинаковый индекс корзины.<ul>
   <li>CPython использует открытую адресацию (пробирование) + хранит полный хеш для быстрого сравнения.</li>
   <li>Много коллизий → деградация к O(n); потому важен хороший <code>__hash__</code>.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"Где поиск быстрее: list vs set/dict и почему?",
   a:`<ul><li><code>x in list</code> — O(n), линейный перебор.</li>
   <li><code>x in set/dict</code> — в среднем O(1) через хеш.</li>
   <li>Для частых проверок вхождения — set/dict, не list.</li></ul>`},
  {c:"Python",lvl:"Мид",q:"Что такое замыкание (closure)?",
   a:`Вложенная функция, которая запоминает переменные внешней области, даже когда та уже завершилась.<ul>
   <li>Основа декораторов и фабрик функций.</li>
   <li>Изменять внешнюю переменную — через <code>nonlocal</code>.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"Что такое утиная типизация (duck typing)?",
   a:`«Если крякает как утка — это утка»: важен не тип объекта, а наличие нужных методов/поведения.<ul>
   <li>Поэтому часто вместо проверки типа просто вызывают метод и ловят исключение (EAFP).</li></ul>`},
  {c:"Python",lvl:"Мид",q:"Что такое миксины (mixins)?",
   a:`Классы с узким набором методов, которые «подмешивают» поведение через множественное наследование.<ul>
   <li>Не предназначены для самостоятельного использования; добавляют фичу (напр. сериализацию) к разным классам.</li></ul>`},
  {c:"Python",lvl:"Синьер",q:"Что такое метаклассы и когда они нужны?",
   a:`Класс класса: метакласс создаёт классы так же, как класс создаёт объекты (<code>type</code> — базовый метакласс).<ul>
   <li>Нужны редко: авторегистрация подклассов, валидация описания класса, ORM-фреймворки.</li>
   <li>Правило: «если сомневаешься, нужен ли метакласс — не нужен»; чаще хватает декоратора класса или <code>__init_subclass__</code>.</li></ul>`},
  {c:"Python",lvl:"Мид",q:"pickle vs json — различия и чем опасен pickle?",
   a:`<ul><li><b>json</b> — текст, кросс-языковой, только простые типы.</li>
   <li><b>pickle</b> — бинарный, Python-специфичный, сериализует почти любые объекты.</li>
   <li><b>Опасность:</b> <code>pickle.loads</code> недоверенных данных = выполнение произвольного кода. Снаружи — никогда.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"Что значат _x, __x и __x__ в именах?",
   a:`<ul><li><code>_x</code> — соглашение «внутреннее», не трогать (не форсится языком).</li>
   <li><code>__x</code> — name mangling: внутри класса станет <code>_Class__x</code> (защита от коллизий при наследовании).</li>
   <li><code>__x__</code> — dunder/магические методы, зарезервированы языком.</li></ul>`},
  {c:"Python",lvl:"Мид",q:"Что такое интроспекция и рефлексия?",
   a:`<ul><li><b>Интроспекция</b> — узнать о объекте в рантайме: <code>type()</code>, <code>dir()</code>, <code>hasattr</code>, <code>isinstance</code>.</li>
   <li><b>Рефлексия</b> — ещё и менять/вызывать по имени: <code>getattr</code>/<code>setattr</code>, <code>getattr(obj, name)()</code>.</li></ul>`},
  {c:"Python",lvl:"Мид",q:"Как реализовать Singleton в Python?",
   a:`<ul><li>Через <code>__new__</code> (хранить единственный экземпляр), метакласс, или декоратор.</li>
   <li>Самое питоничное — просто <b>модуль</b>: он импортируется один раз и уже синглтон.</li></ul>`},
  {c:"Python",lvl:"Синьер",q:"Что такое гринлеты (greenlets)?",
   a:`Лёгкие «зелёные потоки» — кооперативная многозадачность в пространстве пользователя (gevent/eventlet).<ul>
   <li>Переключение вручную/по I/O, без накладных ОС-потоков. Идейный предшественник asyncio.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"Особенности lambda?",
   a:`<ul><li>Анонимная функция из одного выражения (без <code>return</code>, без операторов).</li>
   <li>Удобна как короткий <code>key=</code> в sorted/map/filter.</li>
   <li>Сложную логику — в обычную <code>def</code> (читаемость, имя в трейсбеке).</li></ul>`},
  {c:"Python",lvl:"Мид",q:"Есть ли в Python хвостовая оптимизация рекурсии? Какой лимит?",
   a:`<ul><li>TCO <b>нет</b> — глубокая рекурсия даёт <code>RecursionError</code> (лимит ~1000, <code>sys.setrecursionlimit</code>).</li>
   <li>Глубокие случаи переписывают в цикл или через явный стек.</li></ul>`},
  {c:"Python",lvl:"Мид",q:"Что такое monkey patching?",
   a:`Подмена атрибутов/методов объекта или модуля в рантайме.<ul>
   <li>Полезно в тестах (патчить зависимость) и для хотфиксов сторонних либ.</li>
   <li>В проде — осторожно: неявно, легко сломать.</li></ul>`},
  {c:"Python",lvl:"Джун",q:"Как работают срезы и отрицательные индексы?",
   a:`<ul><li><code>s[start:stop:step]</code> — stop не включается; возвращает новый объект.</li>
   <li><code>s[-1]</code> — последний, <code>s[::-1]</code> — разворот.</li></ul>`},

  {c:"Django/DRF",lvl:"Мид",q:"Что такое сигналы в Django?",
   a:`Механизм «событие → обработчик» (напр. <code>post_save</code>, <code>pre_delete</code>).<ul>
   <li>Развязывают код, но усложняют трассировку. Для явной логики часто лучше прямой вызов/сервис.</li></ul>`},
  {c:"Django/DRF",lvl:"Джун",q:"Что делает класс Meta в моделях и сериализаторах?",
   a:`Контейнер метаданных, не полей.<ul>
   <li>В модели: <code>db_table</code>, <code>ordering</code>, индексы, <code>unique_together</code>.</li>
   <li>В сериализаторе DRF: какая <code>model</code> и какие <code>fields</code>.</li></ul>`},
  {c:"Django/DRF",lvl:"Мид",q:"Как работает CSRF-защита в Django?",
   a:`На небезопасные методы (POST и т.п.) сервер требует CSRF-токен, привязанный к сессии.<ul>
   <li>Защита от того, что чужой сайт отправит запрос от имени залогиненного юзера.</li>
   <li>Для stateless API на токенах CSRF обычно не нужен.</li></ul>`},

  {c:"Общее",lvl:"Мид",q:"Что такое XSS и как защититься?",
   a:`Внедрение чужого JS в страницу (через непроэкранированный ввод).<ul>
   <li>Защита: экранировать вывод (шаблонизаторы по умолчанию), Content-Security-Policy, httpOnly-cookie, валидация ввода.</li></ul>`},
  {c:"Общее",lvl:"Джун",q:"Чем отличаются HTTP и HTTPS?",
   a:`HTTPS = HTTP поверх TLS: трафик шифруется и сервер аутентифицируется сертификатом.<ul>
   <li>Защита от прослушки и подмены (MITM). Сегодня — обязательный дефолт.</li></ul>`},
  {c:"Общее",lvl:"Мид",q:"Как управлять кешированием в HTTP?",
   a:`<ul><li><code>Cache-Control</code> (max-age, no-store, private/public) — главный заголовок.</li>
   <li><b>ETag</b>/<code>If-None-Match</code> и <code>Last-Modified</code> — условные запросы, ответ <code>304 Not Modified</code> без тела.</li></ul>`},
  {c:"Общее",lvl:"Синьер",q:"Что такое принципы SOLID?",
   a:`<ul><li><b>S</b> — single responsibility; <b>O</b> — open/closed;</li>
   <li><b>L</b> — Liskov substitution; <b>I</b> — interface segregation; <b>D</b> — dependency inversion.</li>
   <li>Цель — слабая связанность и расширяемость без переписывания.</li></ul>`},
  {c:"Общее",lvl:"Джун",q:"KISS, DRY, YAGNI — что это?",
   a:`<ul><li><b>KISS</b> — проще = лучше.</li><li><b>DRY</b> — не дублируй знание.</li>
   <li><b>YAGNI</b> — не делай про запас то, что не нужно сейчас.</li></ul>`},
  {c:"Общее",lvl:"Мид",q:"REST vs gRPC — когда что?",
   a:`<ul><li><b>REST/JSON</b> — универсально, человекочитаемо, публичные API.</li>
   <li><b>gRPC</b> (HTTP/2 + protobuf) — быстрее, строгий контракт, стриминг; хорош для внутренней связи микросервисов.</li></ul>`},
  {c:"Общее",lvl:"Джун",q:"CI vs CD?",
   a:`<ul><li><b>CI</b> — непрерывная интеграция: автосборка и тесты на каждый коммит.</li>
   <li><b>CD</b> — доставка/деплой: автоматический выкат в staging/prod после прохождения пайплайна.</li></ul>`},
  {c:"Общее",lvl:"Джун",q:"git merge vs rebase?",
   a:`<ul><li><b>merge</b> — объединяет ветки, создаёт merge-commit, сохраняет историю как было.</li>
   <li><b>rebase</b> — переносит коммиты поверх другой ветки, история линейная. Не ребейзить уже запушенное общее.</li></ul>`},
  {c:"Общее",lvl:"Мид",q:"Назови ключевые паттерны проектирования.",
   a:`<ul><li><b>Factory</b> — инкапсулирует создание объектов.</li>
   <li><b>Strategy</b> — взаимозаменяемые алгоритмы за общим интерфейсом.</li>
   <li><b>Observer</b> — подписка на события. <b>Singleton</b> — единственный экземпляр.</li></ul>`},

  {c:"SQL",lvl:"Мид",q:"Что такое курсор в БД?",
   a:`Объект для построчного обхода результата запроса, не загружая всё в память сразу.<ul>
   <li>Полезен для больших выборок (server-side cursor) и потоковой обработки.</li></ul>`},
  {c:"SQL",lvl:"Мид",q:"PostgreSQL vs MySQL — ключевые отличия?",
   a:`<ul><li><b>Postgres</b> — богаче по фичам: jsonb, массивы, оконные функции, строгий SQL, расширения.</li>
   <li><b>MySQL</b> — проще, исторически сильна на простом чтении; InnoDB дал транзакции.</li>
   <li>Для сложной логики чаще берут Postgres.</li></ul>`},
  {c:"SQL",lvl:"Мид",q:"EXPLAIN vs EXPLAIN ANALYZE?",
   a:`<ul><li><b>EXPLAIN</b> — показывает <i>план</i> (оценка планировщика), запрос не выполняется.</li>
   <li><b>EXPLAIN ANALYZE</b> — реально выполняет и показывает фактическое время и строки.</li></ul>`},

  {c:"Алгоритмы",lvl:"Джун",q:"Что такое O-большое (Big-O)?",
   a:`Оценка роста времени/памяти от размера входа в худшем случае.<ul>
   <li>O(1) конст., O(log n) бинпоиск, O(n) перебор, O(n log n) сортировка, O(n²) вложенные циклы.</li></ul>`},
  {c:"Алгоритмы",lvl:"Джун",q:"Бинарный поиск — как работает и сложность?",
   a:`На <b>отсортированном</b> массиве: сравниваем с серединой, отбрасываем половину.<ul>
   <li>Сложность O(log n). На неотсортированных не работает.</li></ul>`},
  {c:"Алгоритмы",lvl:"Мид",q:"Стек vs очередь?",
   a:`<ul><li><b>Стек</b> — LIFO (последним пришёл — первым вышел), напр. вызовы функций, отмена.</li>
   <li><b>Очередь</b> — FIFO, напр. задачи на обработку. В Python — <code>collections.deque</code>.</li></ul>`},
  {c:"Алгоритмы",lvl:"Синьер",q:"BFS vs DFS — различия и когда?",
   a:`<ul><li><b>BFS</b> (в ширину, очередь) — кратчайший путь в невзвешенном графе, по уровням.</li>
   <li><b>DFS</b> (в глубину, стек/рекурсия) — обход, топосортировка, поиск циклов.</li></ul>`},
];
