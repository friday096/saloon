import puppeteer from 'puppeteer';
import fs from 'fs';

const URL = 'http://localhost:8788/index.html';
const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 950 });

const bad = [];
p.on('pageerror', (e) => bad.push('JS: ' + e.message));
p.on('console', (m) => { if (m.type() === 'error') bad.push('console: ' + m.text()); });
/* виджет карты — чужой код, его тайлы иногда отдают 404; следим только за своим */
const mine = (u) => u.startsWith('http://localhost:8788') || u.includes('fonts.g');
p.on('response', (r) => {
  if (r.status() >= 400 && mine(r.url())) bad.push('HTTP ' + r.status() + ': ' + r.url());
});

await p.goto(URL, { waitUntil: 'networkidle2', timeout: 90000 });
await new Promise((r) => setTimeout(r, 2500));

const T = [];
const t = (name, got, want) => T.push({ name, got: String(got), want: String(want), ok: String(got) === String(want) });
const txt = (s) => p.$eval(s, (n) => n.textContent.replace(/\u00A0/g, ' ').trim());
const set = async (sel, v) => {
  await p.$eval(sel, (n, v) => {
    n.value = v;
    n.dispatchEvent(new Event('input', { bubbles: true }));
  }, v);
  await new Promise((r) => setTimeout(r, 220));
};

/* ── 1. значения по умолчанию ───────────────────────────── */
t('лента: 50 см', await txt('#tapeVal'), '50 см');
t('материал: ставка', await txt('#matRate'), '28 000 ₽ за 100 г');
t('материал: 150 г', await txt('#matSum'), '42 000 ₽');
t('работа: 65 ₽/прядь', await txt('#workRate'), '65 ₽ за прядь');
t('работа: 120 × 65', await txt('#workSum'), '7 800 ₽');
t('итого', await txt('#totalSum'), '49 800 ₽');
t('время в 4 руки', await txt('#totalTime'), 'В четыре руки — 36–48 мин');

/* ── 2. лента: 75 см ────────────────────────────────────── */
await set('#tapeRange', 75);
t('75 см: ставка', await txt('#matRate'), '36 000 ₽ за 100 г');
t('75 см: материал', await txt('#matSum'), '54 000 ₽');
t('75 см: итого', await txt('#totalSum'), '61 800 ₽');
const markL = await p.$eval('#tapeMark', (n) => n.style.left);
t('маркер справа', markL, '100%');

/* ── 3. граммы и пряди по краям ─────────────────────────── */
await set('#tapeRange', 40);
await set('#grams', 250);
t('40 см, 250 г', await txt('#matSum'), '62 500 ₽');
await set('#strands', 200);
t('200 прядей × 65', await txt('#workSum'), '13 000 ₽');
t('время 200 прядей', await txt('#totalTime'), 'В четыре руки — 60–80 мин');

/* ── 4. топ-мастер ──────────────────────────────────────── */
await p.click('#pickTier .pick__b[data-tier="top"]');
await new Promise((r) => setTimeout(r, 220));
t('топ: 85 ₽/прядь', await txt('#workRate'), '85 ₽ за прядь');
t('топ: 200 × 85', await txt('#workSum'), '17 000 ₽');
t('топ: итого', await txt('#totalSum'), '79 500 ₽');

/* ── 5. голливудское ────────────────────────────────────── */
await p.click('.seg__b[data-mode="hollywood"]');
await new Promise((r) => setTimeout(r, 250));
t('голливуд: 1 тресс топ', await txt('#workSum'), '8 000 ₽');
t('пряди скрыты', await p.$eval('#capsuleCtl', (n) => n.hidden), 'true');
t('время скрыто', await p.$eval('#totalTime', (n) => n.hidden), 'true');
await p.click('#pickTress .pick__b[data-tress="3"]');
await new Promise((r) => setTimeout(r, 220));
t('голливуд: 3 тресса топ', await txt('#workSum'), '14 000 ₽');
t('голливуд: итого', await txt('#totalSum'), '76 500 ₽');
await p.click('#pickTier .pick__b[data-tier="master"]');
await new Promise((r) => setTimeout(r, 220));
t('голливуд: 3 тресса мастер', await txt('#workSum'), '12 000 ₽');

/* ── 6. ссылка в WhatsApp ───────────────────────────────── */
const wa = await p.$eval('#sendWa', (n) => n.href);
const msg = decodeURIComponent(wa.split('?text=')[1] || '');
t('WhatsApp — номер студии', wa.startsWith('https://wa.me/79282349838'), 'true');
t('WhatsApp — есть сумма', msg.includes('74 500'), 'true');
t('WhatsApp — есть длина', msg.includes('40 см'), 'true');

/* ── 7. галерея ─────────────────────────────────────────── */
const chips = await p.$$eval('#filters button', (bs) => bs.map((b) => b.textContent.trim()));
t('фильтров', chips.length, 6);
t('первый чип', chips[0].replace(/\s+/g, ' ').trim(), 'Все 120');
const first = await p.$$eval('#grid button', (b) => b.length);
t('в сетке сразу', first, 16);
await p.click('#moreBtn');
await new Promise((r) => setTimeout(r, 400));
t('после «ещё»', await p.$$eval('#grid button', (b) => b.length), 32);
await p.click('#filters button[data-k="hair"]');
await new Promise((r) => setTimeout(r, 400));
t('фильтр «Волосы»', await p.$$eval('#grid button', (b) => b.length), 14);

/* ── 8. лайтбокс ────────────────────────────────────────── */
await p.click('#grid button');
await new Promise((r) => setTimeout(r, 500));
t('лайтбокс открыт', await p.$eval('#lb', (n) => !n.hidden), 'true');
t('подпись', (await txt('#lbCap')).includes('Волосы · 1 из 14'), 'true');
await p.click('#lbN');
await new Promise((r) => setTimeout(r, 300));
t('следующее фото', (await txt('#lbCap')).includes('2 из 14'), 'true');
await p.keyboard.press('Escape');
await new Promise((r) => setTimeout(r, 300));
t('лайтбокс закрыт', await p.$eval('#lb', (n) => n.hidden), 'true');

/* ── 9. форма ───────────────────────────────────────────── */
await p.$eval('#fName', (n) => (n.value = 'Аня'));
await p.$eval('#fWhen', (n) => (n.value = 'в субботу после 15:00'));
const formMsg = await p.evaluate(() => {
  const f = document.getElementById('form');
  let href = '';
  const orig = window.open;
  window.open = (u) => { href = u; return null; };
  f.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  window.open = orig;
  return href;
});
const fm = decodeURIComponent((formMsg || '').split('?text=')[1] || '');
t('форма: имя', fm.includes('Меня зовут Аня'), 'true');
t('форма: время', fm.includes('в субботу после 15:00'), 'true');
t('форма: расчёт', fm.includes('40 см'), 'true');

/* ── 10. все фото на месте ──────────────────────────────── */
const D = [...new Set(
  fs.readdirSync('c:/autosait/atelier-volos/assets/photo').map((f) => f.split('-')[0])
)];
const src = fs.readFileSync('c:/autosait/atelier-volos/assets/js/data.js', 'utf8');
const used = new Set();
const gal = src.match(/gallery:\s*\{[\s\S]*?\n  \}/)[0];
gal.match(/\d+/g).forEach((n) => used.add(+n));
[113, 123, 120, 125, 75, 106, 95, 6, 73, 76, 29, 83, 34, 12, 43].forEach((n) => used.add(n));
const missing = [...used].filter((n) => !D.includes('p' + String(n).padStart(3, '0')));
t('нет битых ссылок на фото', missing.length, 0);

/* ── 11. доступность по мелочи ──────────────────────────── */
const noAlt = await p.$$eval('img', (is) => is.filter((i) => !i.alt).length);
t('все img с alt', noAlt, 0);
const h1 = await p.$$eval('h1', (n) => n.length);
t('ровно один h1', h1, 1);

/* ── вывод ──────────────────────────────────────────────── */
const fail = T.filter((x) => !x.ok);
T.forEach((x) => console.log((x.ok ? '  ok  ' : '  ✗   ') + x.name + (x.ok ? '' : `  → «${x.got}», ждали «${x.want}»`)));
console.log('\n' + (T.length - fail.length) + ' / ' + T.length + ' проверок пройдено');
if (bad.length) console.log('\nОШИБКИ СТРАНИЦЫ:\n' + [...new Set(bad)].join('\n'));
else console.log('ошибок и битых запросов нет');
await b.close();
process.exit(fail.length || bad.length ? 1 : 0);
