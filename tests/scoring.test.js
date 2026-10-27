import test from 'node:test';
import assert from 'node:assert/strict';
import {score,nextStep,resolveRoute} from '../assets/scoring.js';
import {QUESTIONS,DOMAINS} from '../assets/questions.js';
import {aggregate,aggregateCsv} from '../assets/demo-data.js';
test('20 stable questions, original domain boundaries',()=>{
  assert.deepEqual(QUESTIONS.map(q=>q.id),Array.from({length:20},(_,i)=>i+1));
  for(const d of DOMAINS)assert.ok(QUESTIONS.slice(d.start,d.end).every(q=>q.domain===d.key));
});
test('absent symptoms yield zero; maximum bother yields 300',()=>{
  assert.deepEqual(score(Array(20).fill(0)),{domains:[0,0,0],total:0});
  assert.deepEqual(score(Array(20).fill(4)),{domains:[100,100,100],total:300});
});
test('unequal domains use separate denominators and unrounded totals',()=>{
  const a=Array(20).fill(0);a[0]=1;a[6]=2;a[14]=3;
  const r=score(a);assert.ok(Math.abs(r.domains[0]-25/6)<1e-10);assert.equal(r.domains[1],6.25);assert.equal(r.domains[2],12.5);assert.ok(Math.abs(r.total-(25/6+6.25+12.5))<1e-10);
});
test('missing answers are excluded; wholly missing domain has no score',()=>{
  const a=Array(20).fill(null);a[0]=2;assert.deepEqual(score(a),{domains:[50,null,null],total:null});
});
test('invalid values and wrong length fail explicitly',()=>{
  for(const a of [[],Array(20).fill(5),Array(20).fill(-1),Array(20).fill('0'),Array(20).fill(NaN)])assert.throws(()=>score(a),TypeError);
});
test('navigation blocks incomplete sections and finishes only after completion',()=>{
  const a=Array(20).fill(null);assert.equal(nextStep(a,0),0);a.fill(0,0,6);assert.equal(nextStep(a,0),1);assert.equal(nextStep(a,1),1);a.fill(1,6,14);assert.equal(nextStep(a,1),2);a.fill(4,14);assert.equal(nextStep(a,2),'result');
});
test('preview route gate rejects missing or unrecognized role',()=>{
  assert.equal(resolveRoute('dashboard',null),'admin');assert.equal(resolveRoute('dashboard','unknown'),'admin');assert.equal(resolveRoute('dashboard','viewer'),'dashboard');assert.equal(resolveRoute('dashboard','analyst'),'dashboard');assert.equal(resolveRoute('missing','viewer'),'home');
});
test('fixed aggregates and filters use weighted means',()=>{
  const m=aggregate();assert.equal(m.count,124);assert.equal(m.participation,62);assert.equal(m.requests,52);assert.equal(aggregate('2026-10','2026-10').count,46);assert.equal(aggregate('2027-01','2027-02').total,null);
  assert.equal(m.pop,(36*15.3+42*17.1+46*14.8)/124);
});
test('questionnaire interactions cannot change fixed dashboard data',()=>{
  const before=JSON.stringify(aggregate());score(Array(20).fill(4));assert.equal(JSON.stringify(aggregate()),before);
});
test('export contains aggregate metrics and synthetic label only',()=>{
  const csv=aggregateCsv(aggregate(),'2026-08','2026-10');assert.match(csv,/SYNTHETIC DEMO ONLY/);assert.match(csv,/count,124/);assert.doesNotMatch(csv,/employee|email|answers|q1,/i);
});
