import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { motion } from 'framer-motion';
import { CheckCircle2, Cpu, Hammer, MessageSquare, Search, Store, Wrench } from 'lucide-react';
import './styles.css';

const shops = [
  { name: 'DNS', rating: 4.7 },
  { name: 'Ситилинк', rating: 4.6 },
  { name: 'Regard', rating: 4.5 },
  { name: 'Ozon', rating: 4.4 },
];

const catalogs = {
  cpu: [
    { id: 'cpu-am4-5600', name: 'Ryzen 5 5600', price: 10500, socket: 'AM4', tdp: 65, score: 83, shop: 'DNS' },
    { id: 'cpu-am5-7500f', name: 'Ryzen 5 7500F', price: 14500, socket: 'AM5', tdp: 65, score: 89, shop: 'Ситилинк' },
    { id: 'cpu-am5-7700', name: 'Ryzen 7 7700', price: 21900, socket: 'AM5', tdp: 65, score: 93, shop: 'DNS' },
    { id: 'cpu-am5-7800x3d', name: 'Ryzen 7 7800X3D', price: 34900, socket: 'AM5', tdp: 120, score: 98, shop: 'Regard' },
    { id: 'cpu-am5-7900', name: 'Ryzen 9 7900', price: 39900, socket: 'AM5', tdp: 65, score: 97, shop: 'Ozon' },
    { id: 'cpu-lga1700-12400f', name: 'Intel i5-12400F', price: 13200, socket: 'LGA1700', tdp: 65, score: 85, shop: 'Ситилинк' },
    { id: 'cpu-lga1700-13400f', name: 'Intel i5-13400F', price: 17900, socket: 'LGA1700', tdp: 65, score: 90, shop: 'DNS' },
    { id: 'cpu-lga1700-13600kf', name: 'Intel i5-13600KF', price: 25500, socket: 'LGA1700', tdp: 125, score: 94, shop: 'Regard' },
    { id: 'cpu-lga1700-13700', name: 'Intel i7-13700', price: 34900, socket: 'LGA1700', tdp: 65, score: 96, shop: 'Ситилинк' },
  ],
  motherboard: [
    { id: 'mb-am4-b550m', name: 'B550M', price: 9800, socket: 'AM4', ramType: 'DDR4', score: 82, shop: 'DNS' },
    { id: 'mb-am5-b650m', name: 'B650M', price: 13900, socket: 'AM5', ramType: 'DDR5', score: 90, shop: 'Ситилинк' },
    { id: 'mb-am5-x670', name: 'X670', price: 24900, socket: 'AM5', ramType: 'DDR5', score: 96, shop: 'Regard' },
    { id: 'mb-lga1700-b760m', name: 'B760M', price: 12400, socket: 'LGA1700', ramType: 'DDR4', score: 87, shop: 'DNS' },
    { id: 'mb-lga1700-z790', name: 'Z790', price: 21900, socket: 'LGA1700', ramType: 'DDR5', score: 95, shop: 'Ситилинк' },
  ],
  ram: [
    { id: 'ram-16-ddr4', name: '16GB DDR4 3200', price: 4200, ramType: 'DDR4', score: 76, shop: 'DNS' },
    { id: 'ram-32-ddr4', name: '32GB DDR4 3600', price: 7600, ramType: 'DDR4', score: 85, shop: 'Regard' },
    { id: 'ram-32-ddr5', name: '32GB DDR5 6000', price: 11800, ramType: 'DDR5', score: 92, shop: 'Ситилинк' },
    { id: 'ram-64-ddr5', name: '64GB DDR5 6000', price: 22900, ramType: 'DDR5', score: 96, shop: 'DNS' },
  ],
  gpu: [
    { id: 'gpu-rx6600', name: 'Radeon RX 6600', price: 21000, powerDraw: 132, score: 80, shop: 'Ситилинк' },
    { id: 'gpu-rtx4060', name: 'RTX 4060', price: 32900, powerDraw: 115, score: 89, shop: 'DNS' },
    { id: 'gpu-rtx4060ti', name: 'RTX 4060 Ti', price: 43900, powerDraw: 160, score: 92, shop: 'Regard' },
    { id: 'gpu-rx7800xt', name: 'Radeon RX 7800 XT', price: 54900, powerDraw: 263, score: 95, shop: 'DNS' },
    { id: 'gpu-rtx4070s', name: 'RTX 4070 Super', price: 66900, powerDraw: 220, score: 97, shop: 'Ситилинк' },
  ],
  ssd: [
    { id: 'ssd-1tb-g3', name: '1TB NVMe Gen3', price: 5600, score: 78, shop: 'Ozon' },
    { id: 'ssd-1tb-g4', name: '1TB NVMe Gen4', price: 7600, score: 87, shop: 'Ситилинк' },
    { id: 'ssd-2tb-g4', name: '2TB NVMe Gen4', price: 12900, score: 92, shop: 'Regard' },
  ],
  psu: [
    { id: 'psu-550', name: '550W Bronze', price: 4800, watt: 550, score: 74, shop: 'DNS' },
    { id: 'psu-650', name: '650W Bronze', price: 6500, watt: 650, score: 84, shop: 'Ситилинк' },
    { id: 'psu-750', name: '750W Gold', price: 9400, watt: 750, score: 91, shop: 'Regard' },
    { id: 'psu-850', name: '850W Gold', price: 11900, watt: 850, score: 95, shop: 'DNS' },
  ],
  cooler: [
    { id: 'cooler-120', name: 'Tower Cooler 120mm', price: 2800, score: 76, shop: 'Ситилинк' },
    { id: 'cooler-dual', name: 'Dual Tower Cooler', price: 5200, score: 89, shop: 'DNS' },
    { id: 'cooler-aio', name: 'AIO 240mm', price: 8300, score: 92, shop: 'Regard' },
  ],
  case: [
    { id: 'case-mesh', name: 'ATX Mesh Case', price: 5200, score: 82, shop: 'DNS' },
    { id: 'case-compact', name: 'mATX Compact Case', price: 4300, score: 74, shop: 'Ситилинк' },
    { id: 'case-premium', name: 'Premium Airflow Case', price: 9800, score: 93, shop: 'Regard' },
  ],
};

const categoryOrder = ['cpu', 'motherboard', 'ram', 'gpu', 'ssd', 'psu', 'cooler', 'case'];
const categoryLabel = {
  cpu: 'Процессор', motherboard: 'Материнская плата', ram: 'Оперативная память', gpu: 'Видеокарта',
  ssd: 'SSD', psu: 'Блок питания', cooler: 'Охлаждение CPU', case: 'Корпус',
};

const aliases = {
  r5: 'ryzen 5', r7: 'ryzen 7', r9: 'ryzen 9',
  i5: 'intel i5', i7: 'intel i7', i9: 'intel i9',
  '4060ti': '4060 ti',
  ddr4: 'ddr4', ddr5: 'ddr5',
  ддр4: 'ddr4', ддр5: 'ddr5',
  озу: 'ram',
};

const formatRub = (value) => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;

function normalizeText(text) {
  let result = text
    .toLowerCase()
    .replace(/[ё]/g, 'е')
    .replace(/[×x]/g, 'x')
    .replace(/[^a-zа-я0-9+\s.-]/gi, ' ');

  result = result
    .replace(/d\s*d\s*r\s*([45])/g, 'ddr$1')
    .replace(/д\s*д\s*р\s*([45])/g, 'ddr$1')
    .replace(/r\s*y\s*z\s*e\s*n/g, 'ryzen')
    .replace(/i\s*n\s*t\s*e\s*l/g, 'intel')
    .replace(/n\s*v\s*m\s*e/g, 'nvme');

  Object.entries(aliases).forEach(([a, b]) => { result = result.replaceAll(a, b); });
  return result.replace(/\s+/g, ' ').trim();
}

function findByQuery(category, query) {
  if (!query) return null;
  const q = normalizeText(query);
  const tokens = q.split(' ').filter(Boolean);
  let best = null;
  let bestScore = 0;

  catalogs[category].forEach((item) => {
    const name = normalizeText(item.name);
    const score = tokens.reduce((acc, t) => acc + (name.includes(t) ? 1 : 0), 0);
    if (score > bestScore) { best = item; bestScore = score; }
  });

  return bestScore > 0 ? best : null;
}


function extractClauses(text) {
  return normalizeText(text)
    .split(/[,;\n]+|\sи\s|\sand\s/)
    .map((v) => v.trim())
    .filter(Boolean);
}

function parseUserRequest(text) {
  const normalized = normalizeText(text);
  const budgetMatch = normalized.match(/(\d{2,3})\s?(к|k)/i) || normalized.match(/(\d{5,7})/);
  const budget = budgetMatch ? (budgetMatch[2] ? Number(budgetMatch[1]) * 1000 : Number(budgetMatch[1])) : 120000;

  const wishes = { cpu: null, motherboard: null, ram: null, gpu: null, ssd: null, psu: null, cooler: null, case: null };
  const clauses = extractClauses(normalized);

  clauses.forEach((token) => {
    if (/(ryzen|intel|i3|i5|i7|i9|r5|r7|r9|\b12400|\b13400|\b13600|\b13700|7800x3d|7500f)/.test(token)) wishes.cpu = token;
    if (/(b650|b550|b760|z790|x670|материн|motherboard|am4|am5|lga1700)/.test(token)) wishes.motherboard = token;
    if (/(ddr\s*[45]|ddr4|ddr5|ram|ozu|озу|16\s*gb|32\s*gb|64\s*gb)/.test(token)) wishes.ram = token;
    if (/(rtx|radeon|rx\s?\d|4060|4070|7800|видеокарт|gpu)/.test(token)) wishes.gpu = token;
    if (/(ssd|nvme|gen\s*[34]|gen3|gen4|1\s*tb|2\s*tb|накопител)/.test(token)) wishes.ssd = token;
    if (/(\d{3,4}\s*w|bronze|gold|бп|блок питания|psu|power supply)/.test(token)) wishes.psu = token;
    if (/(cooler|aio|охлажд|кулер|водян|tower)/.test(token)) wishes.cooler = token;
    if (/(case|корпус|mesh|airflow|atx|matx)/.test(token)) wishes.case = token;
  });

  return { budget: Math.max(50000, budget), wishes };
}

function estimateRequiredPower(parts) {
  const cpuTdp = parts.cpu?.tdp || 65;
  const gpuPower = parts.gpu?.powerDraw || 120;
  return Math.round((cpuTdp + gpuPower + 120) * 1.25);
}

function compatibilityCheck(parts) {
  const checks = [];

  const socketOk = !parts.cpu || !parts.motherboard || parts.cpu.socket === parts.motherboard.socket;
  checks.push({ label: 'Сокет CPU ↔ Материнская плата', ok: socketOk, severity: socketOk ? 'pass' : 'critical', detail: socketOk ? 'Совместимо' : `${parts.cpu.socket} ≠ ${parts.motherboard.socket}` });

  const ramOk = !parts.ram || !parts.motherboard || parts.ram.ramType === parts.motherboard.ramType;
  checks.push({ label: 'Тип RAM ↔ Материнская плата', ok: ramOk, severity: ramOk ? 'pass' : 'critical', detail: ramOk ? 'Совместимо' : `${parts.ram.ramType} ≠ ${parts.motherboard.ramType}` });

  const required = estimateRequiredPower(parts);
  const psuOk = !parts.psu || parts.psu.watt >= required;
  checks.push({ label: 'Мощность блока питания', ok: psuOk, severity: psuOk ? 'pass' : 'critical', detail: psuOk ? `${parts.psu.watt}W хватает` : `${parts.psu.watt}W < ${required}W` });

  const highTdpCpu = (parts.cpu?.tdp || 0) >= 120;
  const coolerStrong = ['cooler-dual', 'cooler-aio'].includes(parts.cooler?.id);
  const coolingOk = !highTdpCpu || coolerStrong;
  checks.push({
    label: 'Охлаждение под тепловыделение CPU',
    ok: coolingOk,
    severity: coolingOk ? 'pass' : 'warning',
    detail: coolingOk ? 'Запас охлаждения достаточен' : 'Для CPU с высоким TDP лучше Dual Tower или AIO 240mm',
  });

  const performanceGap = (parts.cpu?.score || 0) - (parts.gpu?.score || 0);
  const balanceOk = Math.abs(performanceGap) <= 18;
  checks.push({
    label: 'Баланс CPU ↔ GPU',
    ok: balanceOk,
    severity: balanceOk ? 'pass' : 'warning',
    detail: balanceOk ? 'Баланс нормальный' : performanceGap > 0 ? 'CPU заметно сильнее GPU — возможен недобор FPS' : 'GPU заметно сильнее CPU — возможен bottleneck в CPU-зависимых задачах',
  });

  const criticalErrors = checks.filter((c) => !c.ok && c.severity === 'critical').length;
  const warnings = checks.filter((c) => !c.ok && c.severity === 'warning').length;

  return {
    ok: criticalErrors === 0,
    checks,
    summary: criticalErrors > 0 ? `Есть ${criticalErrors} критических проблем совместимости` : warnings > 0 ? `Критичных проблем нет, но есть ${warnings} предупреждений` : 'Полная совместимость подтверждена',
  };
}

function selectDefault(category, budgetCap) {
  const candidates = catalogs[category].filter((c) => c.price <= budgetCap);
  if (candidates.length) return [...candidates].sort((a, b) => (a.score || 0) - (b.score || 0)).at(-1);
  return [...catalogs[category]].sort((a, b) => a.price - b.price)[0];
}

function shopRatingByName(name) {
  return shops.find((s) => s.name === name)?.rating || 4.5;
}


function getById(category, id) {
  return catalogs[category].find((i) => i.id === id) || null;
}

function bestByScore(items) {
  return [...items].sort((a, b) => (b.score || 0) - (a.score || 0))[0] || null;
}

function alignForCompatibility(parts, locked = {}) {
  const result = { ...parts };

  if (!locked.cpu && locked.motherboard && result.motherboard) {
    const cpuCandidates = catalogs.cpu.filter((c) => c.socket === result.motherboard.socket);
    if (cpuCandidates.length) result.cpu = bestByScore(cpuCandidates);
  }

  if (!locked.motherboard && result.cpu && result.motherboard && result.cpu.socket !== result.motherboard.socket) {
    const mbCandidates = catalogs.motherboard.filter((m) => m.socket === result.cpu.socket);
    if (mbCandidates.length) {
      const preferredRam = result.ram?.ramType;
      const filtered = preferredRam ? mbCandidates.filter((m) => m.ramType === preferredRam) : mbCandidates;
      result.motherboard = bestByScore(filtered.length ? filtered : mbCandidates);
    }
  }

  if (!locked.ram && result.motherboard && result.ram && result.motherboard.ramType !== result.ram.ramType) {
    const ramCandidates = catalogs.ram.filter((r) => r.ramType === result.motherboard.ramType);
    if (ramCandidates.length) result.ram = bestByScore(ramCandidates);
  }

  const required = estimateRequiredPower(result);
  if (!locked.psu && result.psu && result.psu.watt < required) {
    const psuCandidates = catalogs.psu.filter((p) => p.watt >= required);
    if (psuCandidates.length) result.psu = psuCandidates.sort((a, b) => a.price - b.price)[0];
  }

  if (!locked.cooler && (result.cpu?.tdp || 0) >= 120 && !['cooler-dual', 'cooler-aio'].includes(result.cooler?.id)) {
    result.cooler = getById('cooler', 'cooler-dual') || result.cooler;
  }

  return result;
}


function scoreBuild(parts) {
  return categoryOrder.reduce((sum, cat) => sum + (parts[cat]?.score || 0), 0);
}

function optimizeToBudget(initialParts, budget, locked = {}) {
  const cpuPool = locked.cpu ? [initialParts.cpu] : catalogs.cpu;
  const mbPool = locked.motherboard ? [initialParts.motherboard] : catalogs.motherboard;
  const ramPool = locked.ram ? [initialParts.ram] : catalogs.ram;
  const gpuPool = locked.gpu ? [initialParts.gpu] : catalogs.gpu;
  const psuPool = locked.psu ? [initialParts.psu] : catalogs.psu;
  const ssdPool = locked.ssd ? [initialParts.ssd] : catalogs.ssd;
  const coolerPool = locked.cooler ? [initialParts.cooler] : catalogs.cooler;
  const casePool = locked.case ? [initialParts.case] : catalogs.case;

  let bestUnder = null;
  let bestOver = null;

  for (const cpu of cpuPool) {
    for (const mb of mbPool) {
      for (const ram of ramPool) {
        for (const gpu of gpuPool) {
          for (const psu of psuPool) {
            for (const ssd of ssdPool) {
              for (const cooler of coolerPool) {
                for (const pcCase of casePool) {
                  const parts = { cpu, motherboard: mb, ram, gpu, psu, ssd, cooler, case: pcCase };
                  const aligned = alignForCompatibility(parts, locked);
                  const comp = compatibilityCheck(aligned);
                  if (!comp.ok) continue;

                  const total = categoryOrder.reduce((sum, cat) => sum + (aligned[cat]?.price || 0), 0);
                  const distance = Math.abs(budget - total);
                  const candidate = { parts: aligned, total, distance, score: scoreBuild(aligned) };

                  if (total <= budget) {
                    if (!bestUnder || candidate.distance < bestUnder.distance || (candidate.distance === bestUnder.distance && candidate.score > bestUnder.score)) bestUnder = candidate;
                  } else {
                    if (!bestOver || candidate.distance < bestOver.distance || (candidate.distance === bestOver.distance && candidate.score > bestOver.score)) bestOver = candidate;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  if (bestUnder) return bestUnder;
  return bestOver;
}

function buildFromRequest(text) {
  const { budget, wishes } = parseUserRequest(text);
  const share = { cpu: 0.2, motherboard: 0.12, ram: 0.1, gpu: 0.32, ssd: 0.08, psu: 0.07, cooler: 0.05, case: 0.06 };

  const parts = {};
  const locked = {};

  categoryOrder.forEach((category) => {
    const byWish = findByQuery(category, wishes[category]);
    locked[category] = Boolean(byWish);
    parts[category] = byWish || selectDefault(category, Math.round(budget * share[category]));
  });

    const optimized = alignForCompatibility(parts, locked);
  const optimizedToBudget = optimizeToBudget(optimized, budget, locked);
  const finalParts = optimizedToBudget?.parts || optimized;
  const total = optimizedToBudget?.total || categoryOrder.reduce((sum, cat) => sum + (finalParts[cat]?.price || 0), 0);
  const compatibility = compatibilityCheck(finalParts);
  return { budget, parts: finalParts, total, compatibility };
}


function partLine(cat, part) {
  return `${categoryLabel[cat]}: ${part.name} — ${formatRub(part.price)} · ${part.shop} (${shopRatingByName(part.shop)}) · оценка ${part.score}/100`;
}

function App() {
  const [page, setPage] = useState('ai');
  const [query, setQuery] = useState('');
  const [aiResult, setAiResult] = useState(null);
  const [manual, setManual] = useState(Object.fromEntries(categoryOrder.map((cat) => [cat, catalogs[cat][0].id])));
  const [manualBudget, setManualBudget] = useState(120000);

  const manualParts = useMemo(() => Object.fromEntries(categoryOrder.map((cat) => [cat, catalogs[cat].find((i) => i.id === manual[cat]) || catalogs[cat][0]])), [manual]);
  const manualTotal = useMemo(() => categoryOrder.reduce((sum, cat) => sum + manualParts[cat].price, 0), [manualParts]);
  const manualCompatibility = useMemo(() => compatibilityCheck(manualParts), [manualParts]);

  return (
    <div className="page">
      <header className="hero glass">
        <h1>Онлайн конфигуратор ПК</h1>
        <p>Авто-подбор по тексту и отдельная ручная сборка с аккуратной проверкой совместимости и ценой.</p>
      </header>

      <div className="switcher">
        <button className={page === 'ai' ? 'tab active' : 'tab'} onClick={() => setPage('ai')}><MessageSquare size={16} /> Запрос</button>
        <button className={page === 'manual' ? 'tab active' : 'tab'} onClick={() => setPage('manual')}><Wrench size={16} /> Ручная сборка</button>
      </div>

      {page === 'ai' && (
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass panel">
          <label>Опиши бюджет и желаемые комплектующие:</label>
          <textarea
            rows={4}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Пример: ПК до 130000, Ryzen 7 7700, RTX 4070 Super, DDR5 32GB, 2TB NVMe, БП 750W Gold"
          />
          <small className="hint">Если поле пустое, сборка не формируется.</small>
          <button
            className="primary"
            onClick={() => {
              const clean = query.trim();
              if (!clean) {
                setAiResult(null);
                return;
              }
              setAiResult(buildFromRequest(clean));
            }}
          ><Search size={16} /> Собрать по запросу</button>

          {aiResult && (<section className="result">
            <div className="result-head">
              <h2><Cpu size={18} /> Результат по запросу</h2>
              <span>Цена: {formatRub(aiResult.total)}</span>
            </div>
            <ul>
              {categoryOrder.map((cat) => <li key={cat}>{partLine(cat, aiResult.parts[cat])}</li>)}
            </ul>
            <div className="compat-block">
              <h3>Совместимость</h3>
              <p className={aiResult.compatibility.ok ? 'oktxt' : 'badtxt'}>{aiResult.compatibility.summary}</p>
              <ul className="checks">
                {aiResult.compatibility.checks.map((check) => (
                  <li key={check.label} className={check.ok ? 'check ok' : 'check bad'}>
                    {check.ok ? <CheckCircle2 size={15} /> : <Hammer size={15} />} <b>{check.label}:</b> {check.detail}
                  </li>
                ))}
              </ul>
            </div>
          </section>)}
        </motion.section>
      )}

      {page === 'manual' && (
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass panel">
          <div className="manual-head">
            <h2>Ручная сборка</h2>
            <label>Бюджет
              <input type="number" min={50000} value={manualBudget} onChange={(e) => setManualBudget(Number(e.target.value) || 50000)} />
            </label>
          </div>

          <div className="selectors">
            {categoryOrder.map((cat) => (
              <label key={cat}>
                {categoryLabel[cat]}
                <select value={manual[cat]} onChange={(e) => setManual((prev) => ({ ...prev, [cat]: e.target.value }))}>
                  {catalogs[cat].map((item) => <option key={item.id} value={item.id}>{item.name} — {formatRub(item.price)} · {item.shop} · {item.score}/100</option>)}
                </select>
              </label>
            ))}
          </div>

          <div className="summary-row">
            <p>Итоговая цена: <b>{formatRub(manualTotal)}</b></p>
            <p className={manualTotal <= manualBudget ? 'oktxt' : 'badtxt'}>{manualTotal <= manualBudget ? 'В бюджете' : 'Выше бюджета'}</p>
          </div>

          <div className="compat-block">
            <h3>Совместимость</h3>
            <p className={manualCompatibility.ok ? 'oktxt' : 'badtxt'}>{manualCompatibility.summary}</p>
            <ul className="checks">
              {manualCompatibility.checks.map((check) => (
                <li key={check.label} className={check.ok ? 'check ok' : 'check bad'}>
                  {check.ok ? <CheckCircle2 size={15} /> : <Hammer size={15} />} <b>{check.label}:</b> {check.detail}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>
      )}

      <section className="shops glass">
        <h3><Store size={16} /> Магазины в подборе</h3>
        <ul>
          {shops.map((shop) => <li key={shop.name}>{shop.name} — рейтинг {shop.rating}</li>)}
        </ul>
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);