import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm,readdir,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {selectPresence,canContinue,nextQuestion} from '../assets/patient-state.js';
import {score} from '../assets/scoring.js';
import {buildPublic} from '../scripts/build-public.js';
test('absence is zero, presence requires a separate bother answer',()=>{
  const a=Array(20).fill(null),p=Array(20).fill(null);
  assert.equal(nextQuestion(a,0),0);
  selectPresence(a,p,0,true);assert.equal(p[0],true);assert.equal(canContinue(a,0),false);
  a[0]=3;assert.equal(nextQuestion(a,0),1);
  selectPresence(a,p,0,false);assert.equal(a[0],0);assert.equal(nextQuestion(a,0),1);
  selectPresence(a,p,0,true);assert.equal(a[0],null);assert.equal(canContinue(a,0),false);
});
test('20 one-question steps preserve PFDI scoring and allow changing responses',()=>{
  const a=Array(20).fill(null),p=Array(20).fill(null);
  for(let i=0;i<20;i++){selectPresence(a,p,i,true);a[i]=4;assert.equal(nextQuestion(a,i),i===19?'result':i+1);}
  assert.equal(score(a).total,300);
  selectPresence(a,p,19,false);assert.ok(Math.abs(score(a).domains[2]-100*5/6)<1e-10);
});
test('published artifact contains patient files only, not dashboard or data modules',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'whp-public-'));
  try {
    await buildPublic(dir);
    const assets=await readdir(join(dir,'assets'));
    assert.ok(assets.includes('patient.js'));
    for(const file of ['admin-app.js','demo-data.js','styles.css','app.js'])assert.ok(!assets.includes(file));
    assert.ok(!(await readdir(dir)).includes('admin-preview.html'));
    const js=await readFile(join(dir,'assets/patient.js'),'utf8');
    assert.doesNotMatch(js,/admin-app|demo-data|data-go|fetch\(|localStorage|sessionStorage/);
    const html=await readFile(join(dir,'admin.html'),'utf8');assert.doesNotMatch(html,/<script/);
  }finally{await rm(dir,{recursive:true,force:true});}
});
