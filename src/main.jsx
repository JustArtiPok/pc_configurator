import React from 'react';
import ReactDOM from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck, Cpu, Flame, Gauge, MemoryStick, Monitor, Wallet } from 'lucide-react';
import './styles.css';

const mockBuilds = [
  {
    title: 'Игровой баланс 100 000 ₽',
    score: 94,
    price: '99 480 ₽',
    shop: 'Сводная цена из DNS, Ситилинк, Regard',
    parts: [
      'CPU: Ryzen 5 7500F',
      'GPU: RTX 4060 8GB',
      'MB: B650M',
      'RAM: 32GB DDR5 6000',
      'SSD: 1TB NVMe Gen4',
      'PSU: 650W 80+ Bronze'
    ]
  },
  {
    title: 'Универсальный офис + учеба',
    score: 90,
    price: '63 210 ₽',
    shop: 'Лучшая цена + рейтинг магазинов',
    parts: ['CPU: Intel i5-12400', 'GPU: встроенная UHD', 'RAM: 16GB DDR4', 'SSD: 1TB NVMe', 'PSU: 500W'],
  },
  {
    title: 'Графика / монтаж старт',
    score: 88,
    price: '119 870 ₽',
    shop: 'С учетом отзывов о шуме и нагреве',
    parts: ['CPU: Ryzen 7 7700', 'GPU: RTX 4060 Ti', 'RAM: 32GB DDR5', 'SSD: 2TB', 'PSU: 750W Gold'],
  }
];

function App() {
  return (
    <div className="page">
      <header className="hero">
        <motion.div
          className="glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="chip">AI • React • Vercel Ready</span>
          <h1>Умный конфигуратор ПК для новичков</h1>
          <p>
            Введите бюджет и задачу — сервис предложит оптимальную сборку по цене,
            рейтингу магазинов и отзывам покупателей.
          </p>
          <div className="prompt">
            <Flame size={18} />
            <input value="Нужен ПК для игр, бюджет 100000 рублей" readOnly />
            <button>Подобрать сборку</button>
          </div>
        </motion.div>
      </header>

      <section className="features">
        {[
          [Wallet, 'Учет бюджета', 'Алгоритм держит цену в заданных рамках и предлагает лучшие альтернативы.'],
          [BadgeCheck, 'Проверка совместимости', 'Автоматическая валидация сокета, памяти, БП и габаритов корпуса.'],
          [Gauge, 'Рейтинг магазинов', 'Сравнение цен и продавцов с учетом надежности и сроков доставки.'],
          [MemoryStick, 'Анализ отзывов', 'Отмечаем риски: шум, перегрев, процент брака и качество охлаждения.']
        ].map(([Icon, title, text]) => (
          <motion.article whileHover={{ y: -6 }} key={title} className="card">
            <Icon size={22} />
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </section>

      <section className="builds">
        <h2>Готовые варианты сборок</h2>
        <AnimatePresence>
          <div className="grid">
            {mockBuilds.map((build, i) => (
              <motion.div
                className="build-card"
                key={build.title}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="head">
                  <h3>{build.title}</h3>
                  <span>{build.score}% match</span>
                </div>
                <p className="price">{build.price}</p>
                <p className="shop">{build.shop}</p>
                <ul>{build.parts.map((part) => <li key={part}>{part}</li>)}</ul>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </section>

      <footer>
        <Cpu size={16} /> <Monitor size={16} /> Готово к деплою на Vercel • фронтенд на React
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
