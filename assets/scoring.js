import { DOMAINS } from './questions.js';
export function score(answers) {
  if (!Array.isArray(answers) || answers.length !== 20 || answers.some(v => v !== null && (!Number.isInteger(v) || v < 0 || v > 4))) throw new TypeError('Expected 20 values: null or integers 0–4');
  const domains = DOMAINS.map(d => {
    const values = answers.slice(d.start, d.end).filter(v => v !== null);
    return values.length ? values.reduce((sum,v) => sum + v, 0) / values.length * 25 : null;
  });
  return { domains, total: domains.every(v => v !== null) ? domains.reduce((sum,v) => sum+v,0) : null };
}
export function complete(answers, step) {
  const d = DOMAINS[step];
  return Boolean(d) && answers.slice(d.start,d.end).length === d.end-d.start && answers.slice(d.start,d.end).every(v => Number.isInteger(v) && v >= 0 && v <= 4);
}
export function nextStep(answers, step) {
  return complete(answers,step) ? (step === 2 ? 'result' : step+1) : step;
}
export function resolveRoute(route, previewRole) {
  const routes = ['home','survey','result','admin','dashboard','awareness'];
  if (!routes.includes(route)) return 'home';
  return route === 'dashboard' && !['viewer','analyst'].includes(previewRole) ? 'admin' : route;
}
