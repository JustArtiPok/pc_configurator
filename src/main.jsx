import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { motion } from 'framer-motion';
import { Cpu, Wallet, Gamepad2, Briefcase, Palette, Sparkles, MessageSquare } from 'lucide-react';
import './styles.css';

const presets = {
  gaming: { label: 'Игры', icon: Gamepad2, keywords: ['игр', 'gaming', 'fps'], weights: { gpu: 0.42, cpu: 0.23, ram: 0.12, ssd: 0.1, mb: 0.07, psu: 0.06 } },
  office: { label: 'Офис / учеба', icon: Briefcase, keywords: ['офис', 'учеб', 'работ'], weights: { gpu: 0.08, cpu: 0.3, ram: 0.22, ssd: 0.2, mb: 0.12, psu: 0.08 } },
  creator: { label: 'Графика / монтаж', icon: Palette, keywords: ['монтаж', 'график', 'дизайн', '3d'], weights: { gpu: 0.28, cpu: 0.3, ram: 0.2, ssd: 0.12, mb: 0.06, psu: 0.04 } },
};

const catalog = {
  cpu: [
    { name: 'Ryzen 5 5600', price: 10500, score: 82, shopRating: 4.7, review: 4.6 },
    { name: 'Ryzen 5 7500F', price: 14500, score: 90, shopRating: 4.8, review: 4.7 },
    { name: 'Intel i5-12400F', price: 13200, score: 86, shopRating: 4.7, review: 4.5 },
  ],
  gpu: [
    { name: 'Radeon RX 6600', price: 21000, score: 80, shopRating: 4.6, review: 4.5 },
    { name: 'RTX 4060', price: 32900, score: 92, shopRating: 4.8, review: 4.6 },
    { name: 'RTX 4060 Ti', price: 43900, score: 95, shopRating: 4.7, review: 4.4 },
  ],
  ram: [
    { name: '16GB DDR4 3200', price: 4200, score: 70, shopRating: 4.8, review: 4.7 },
    { name: '32GB DDR4 3600', price: 7600, score: 85, shopRating: 4.8, review: 4.8 },
    { name: '32GB DDR5 6000', price: 11800, score: 92, shopRating: 4.7, review: 4.7 },
  ],
  ssd: [
    { name: '1TB NVMe Gen3', price: 5600, score: 78, shopRating: 4.8, review: 4.6 },
    { name: '1TB NVMe Gen4', price: 7600, score: 88, shopRating: 4.7, review: 4.7 },
    { name: '2TB NVMe Gen4', price: 12900, score: 93, shopRating: 4.6, review: 4.6 },
  ],
  mb: [
    { name: 'B550M', price: 9800, score: 78, shopRating: 4.6, review: 4.5 },
    { name: 'B650M', price: 13900, score: 89, shopRating: 4.8, review: 4.6 },
    { name: 'B760M', price: 12400, score: 86, shopRating: 4.7, review: 4.6 },
  ],
  psu: [
    { name: '550W Bronze', price: 4800, score: 74, shopRating: 4.7, review: 4.6 },
    { name: '650W Bronze', price: 6500, score: 84, shopRating: 4.8, review: 4.7 },
    { name: '750W Gold', price: 9400, score: 92, shopRating: 4.7, review: 4.6 },
  ],
};

const formatRub = (v) => `${new Intl.NumberFormat('ru-RU').format(v)} ₽`;
const minBudget = 35000;

function parseRequest(text) {
  const normalized = text.toLowerCase();
  const money = normalized.match(/(\d{2,3})\s?(к|k)/i) || normalized.match(/(\d{5,7})/);
  const budget = money ? (money[2] ? Number(money[1]) * 1000 : Number(money[1])) : 100000;

  const scenario = Object.entries(presets).find(([, cfg]) => cfg.keywords.some((kw) => normalized.includes(kw)))?.[0] || 'gaming';
  return { budget: Math.max(minBudget, budget), scenario };
}

function scorePart(part) {
  return part.score * 0.6 + part.shopRating * 10 * 0.2 + part.review * 10 * 0.2;
}

function pickPart(parts, budgetPart) {
  const affordable = parts.filter((p) => p.price <= budgetPart);
  const candidates = affordable.length ? affordable : parts;
  return [...candidates].sort((a, b) => scorePart(b) - scorePart(a))[0];
}

function generateBuild(budget, scenario) {
  const weights = presets[scenario].weights;
  const selected = Object.entries(catalog).map(([key, parts]) => {
    const budgetPart = Math.round(budget * (weights[key] || 0.1));
    const choice = pickPart(parts, budgetPart);
    return { key, ...choice };
  });

  const total = selected.reduce((sum, p) => sum + p.price, 0);
  const quality = Math.round(selected.reduce((sum, p) => sum + scorePart(p), 0) / selected.length);
  return { selected, total, quality };
}

function App() {
  const [budget, setBudget] = useState(100000);
  const [scenario, setScenario] = useState('gaming');
  const [prompt, setPrompt] = useState('Нужен ПК для игр, бюджет 100000 рублей');
  const [requested, setRequested] = useState(false);

  const result = useMemo(() => generateBuild(Math.max(minBudget, Number(budget) || 0), scenario), [budget, scenario]);

  const handleAiSelect = () => {
    const parsed = parseRequest(prompt);
    setBudget(parsed.budget);
    setScenario(parsed.scenario);
    setRequested(true);
  };

  return (
    <div className="page">
      <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hero glass">
        <h1>Умный конфигуратор ПК</h1>
        <p>Введи задачу текстом или выбери параметры вручную — сервис соберет оптимальный ПК по цене, рейтингу магазинов и отзывам.</p>
      </motion.header>

      <section className="panel glass">
        <div className="row">
          <label><MessageSquare size={16} /> AI-запрос</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3} />
          <button className="cta" onClick={handleAiSelect}><Sparkles size={16} /> Подобрать по тексту</button>
        </div>

        <div className="row">
          <label><Wallet size={16} /> Бюджет</label>
          <input type="number" min={minBudget} value={budget} onChange={(e) => setBudget(e.target.value)} />
        </div>

        <div className="scenario-grid">
          {Object.entries(presets).map(([key, item]) => {
            const Icon = item.icon;
            return (
              <button key={key} className={scenario === key ? 'scenario active' : 'scenario'} onClick={() => setScenario(key)}>
                <Icon size={16} /> {item.label}
              </button>
            );
          })}
        </div>
        <button className="secondary" onClick={() => setRequested(true)}><Cpu size={16} /> Подобрать вручную</button>
      </section>

      {requested && (
        <motion.section className="result glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="result-head">
            <h2><Cpu size={20} /> Рекомендованная сборка</h2>
            <span>{presets[scenario].label}</span>
          </div>
          <p className="meta">Итоговая цена: <b>{formatRub(result.total)}</b> • Качество: <b>{result.quality}/100</b></p>
          <ul>
            {result.selected.map((part) => (
              <li key={part.key}>
                <div>
                  <strong>{part.key.toUpperCase()}</strong>: {part.name}
                </div>
                <div>{formatRub(part.price)} • отзыв {part.review}</div>
              </li>
            ))}
          </ul>
        </motion.section>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
