import puppeteer from 'puppeteer';

const URL = 'http://localhost:8788/index.html';
const OUT = 'c:/autosait/atelier-volos';
const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

const errs = [];
async function shots(name, vp, cuts) {
  const p = await b.newPage();
  p.on('console', (m) => { if (m.type() === 'error') errs.push(name + ': ' + m.text()); });
  p.on('pageerror', (e) => errs.push(name + ' JS: ' + e.message));
  p.on('requestfailed', (r) => errs.push(name + ' 404: ' + r.url().split('/').pop()));
  await p.setViewport(vp);
  await p.goto(URL, { waitUntil: 'networkidle2', timeout: 90000 });
  await new Promise((r) => setTimeout(r, 2600));
  for (const [tag, sel] of cuts) {
    if (sel) {
      await p.evaluate((s) => {
        const n = document.querySelector(s);
        if (n) n.scrollIntoView({ block: 'start', behavior: 'instant' });
      }, sel);
      await new Promise((r) => setTimeout(r, 1500));
    }
    await p.screenshot({ path: `${OUT}/s_${name}_${tag}.png` });
  }
  await p.close();
}

await shots('m', { width: 390, height: 800, isMobile: true, deviceScaleFactor: 2 },
  [['1', null], ['2', '#merka'], ['3', '#methods'], ['4', '#works'], ['5', '#price'], ['6', '#reviews'], ['7', '#studio'], ['8', '#where'], ['9', '#book']]);
await shots('d', { width: 1440, height: 900 },
  [['1', null], ['2', '#merka'], ['3', '#methods'], ['4', '#works'], ['5', '#price'], ['6', '#reviews'], ['7', '#studio'], ['8', '#where'], ['9', '#book']]);

console.log(errs.length ? 'ПРОБЛЕМЫ:\n' + [...new Set(errs)].join('\n') : 'ошибок нет');
await b.close();
