'use strict';

// Teste leve, sem dependências, para validar a geração matemática no Node.
const assert = require('node:assert/strict');

const handlers = {};
const app = {
  innerHTML: '',
  classList: { add() {}, remove() {}, toggle() {} },
  addEventListener(type, callback) { handlers[type] = callback; },
  contains() { return true; },
  querySelector(selector) {
    if (selector === '#first-name') return { value: 'Ana' };
    if (selector === '#cat-name') return { value: 'Nino' };
    return null;
  },
  append() {}
};
const announcements = { textContent: '' };

global.document = {
  createElement() { return { className: '', textContent: '', setAttribute() {}, remove() {} }; },
  querySelector(selector) {
    if (selector === '#app') return app;
    if (selector === '#announcements') return announcements;
    return null;
  },
  querySelectorAll() { return []; },
  body: { appendChild() {} }
};
global.window = { addEventListener() {}, scrollTo() {} };
global.localStorage = { getItem() { return null; }, setItem() {} };

require('./script.js');

const game = global.window.MiaumaticaTest;
assert.ok(game, 'A superfície de testes deve estar disponível.');
assert.equal(game.MAX_LEVEL, 12);
assert.ok(game.colors.length >= 20, 'A loja deve oferecer pelo menos 20 cores.');
assert.ok(game.accessories.length >= 19, 'A loja deve oferecer pelo menos 19 acessórios.');
assert.equal(game.furniture.length, 15, 'A loja deve oferecer 15 móveis para os cenários.');
assert.equal(game.furnitureEnabled, false, 'Os móveis devem ficar ocultos na primeira publicação.');
const migrated = game.normalizeSave({ version: 1, name: 'Bia', xp: 800 });
assert.equal(migrated.version, 2);
assert.equal(migrated.onboardingComplete, true);
assert.equal(migrated.careHearts, 12, 'O estágio de salvamentos antigos deve ser preservado.');
assert.equal(game.stageFor(migrated.xp, migrated.careHearts), 4);
const sadSave = game.normalizeSave({ version: 2, name: 'Ana', onboardingComplete: true, catMood: 'sad', mistakePressure: 4 });
assert.equal(sadSave.catMood, 'sad');
assert.equal(sadSave.mistakePressure, 4);
for (const name of ['Vitória', 'Vitoria', 'Victoria', 'Victória Maria', 'Vivi', 'Vicky']) assert.equal(game.nicknameFor(name), 'Caçambita');
assert.equal(game.nicknameFor('Ana'), 'Ana');
assert.equal(game.isPerfectScore(10, 10), true);
assert.equal(game.isPerfectScore(20, 20), true);
assert.equal(game.isPerfectScore(9, 10), false, 'Um acerto isolado ou 9/10 não deve animar o gato triste.');
assert.match(app.innerHTML, /Nome da criança/, 'A primeira abertura deve pedir o nome.');

const click = (action, dataset = {}) => handlers.click({
  target: { closest: () => ({ disabled: false, dataset: { action, ...dataset } }) }
});
click('finish-onboarding');
assert.equal(game.getState().name, 'Ana');
assert.equal(game.getState().catName, 'Nino');
assert.equal(game.getState().onboardingComplete, true);
click('navigate', { view: 'choose' });
assert.match(app.innerHTML, /Floresta da Adição/, 'O mapa deve mostrar as regiões da aventura.');
click('select-op', { op: 'add' });
assert.match(app.innerHTML, /CHEFE/, 'A trilha deve identificar os desafios-chefe.');
assert.match(app.innerHTML, /Tutorial visual/);
click('navigate', { view: 'cat' });
assert.match(app.innerHTML, /Hora do lanchinho/);
click('feed-cat');
assert.equal(game.getState().careHearts, 1);
assert.equal(game.getState().food, 1);
assert.match(app.innerHTML, /fullness-1/, 'A forma do gato deve mudar depois do lanche.');
click('feed-cat');
assert.equal(game.getState().careHearts, 2);
assert.match(app.innerHTML, /fullness-2/, 'O segundo lanche deve deixar a barriguinha mais redonda.');
click('navigate', { view: 'shop' });
assert.doesNotMatch(app.innerHTML, /🛋️ Móveis/, 'A publicação inicial não deve mostrar a aba de móveis.');
for (const item of game.colors) click('preview', { kind: 'color', item: item.id });
for (const item of game.accessories) click('preview', { kind: 'accessory', item: item.id });

for (const op of ['add', 'sub', 'mul', 'div']) {
  assert.equal(game.levelGuide[op].length, game.MAX_LEVEL, `${op} deve ter 12 níveis.`);
  for (let level = 1; level <= game.MAX_LEVEL; level += 1) {
    const questions = game.sample(op, level, 500);
    for (const q of questions) {
      assert.ok(Number.isSafeInteger(q.answer) && q.answer >= 0, `${op} nível ${level}: resposta inválida.`);
      assert.equal(game.correctAnswer(q.op, q.a, q.b), q.answer, `${op} nível ${level}: conta incorreta.`);
      if (op === 'sub') assert.ok(q.a >= q.b, `Subtração negativa no nível ${level}.`);
      if (op === 'div') assert.equal(q.a % q.b, 0, `Divisão não exata no nível ${level}.`);
    }
  }
}

const formatted = game.formattedSample('mul', 8, 500);
assert.ok(formatted.some(q => q.format === 'choice'), 'Deve haver questões de múltipla escolha.');
assert.ok(formatted.some(q => q.format === 'truefalse'), 'Deve haver desafios de verdadeiro ou falso.');
for (const q of formatted) {
  if (q.format === 'choice') {
    assert.ok(q.choices.includes(q.answer));
    assert.equal(new Set(q.choices).size, q.choices.length);
  }
  if (q.format === 'truefalse') assert.ok(Number.isSafeInteger(q.shownAnswer));
}

console.log('OK: 24.000 questões validadas em 48 níveis.');
