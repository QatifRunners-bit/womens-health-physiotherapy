// Fixed monthly aggregates only. Never derive these from questionnaire answers.
export const MONTHS = Object.freeze([
  {month:'2026-08',eligible:200,count:36,symptoms:24,pop:15.3,cradi:12.2,udi:21.8,activities:2,requests:14,completed:8,paired:6,pre:92,post:61},
  {month:'2026-09',eligible:200,count:42,symptoms:30,pop:17.1,cradi:13.4,udi:23.6,activities:3,requests:18,completed:10,paired:8,pre:88,post:57},
  {month:'2026-10',eligible:200,count:46,symptoms:31,pop:14.8,cradi:11.7,udi:20.9,activities:4,requests:20,completed:12,paired:9,pre:85,post:54}
]);
export function aggregate(from='2026-08',to='2026-10') {
  const rows=MONTHS.filter(r=>r.month>=from && r.month<=to);
  const sum=k=>rows.reduce((s,r)=>s+r[k],0), count=sum('count');
  const weighted=k=>count?rows.reduce((s,r)=>s+r[k]*r.count,0)/count:null;
  const paired=sum('paired');
  const pairedMean=k=>paired?rows.reduce((s,r)=>s+r[k]*r.paired,0)/paired:null;
  const pop=weighted('pop'),cradi=weighted('cradi'),udi=weighted('udi');
  return {rows,count,symptoms:count?sum('symptoms')/count*100:null,pop,cradi,udi,total:count?pop+cradi+udi:null,participation:rows.length?count/200*100:null,activities:sum('activities'),requests:sum('requests'),completed:sum('completed'),paired,pre:pairedMean('pre'),post:pairedMean('post')};
}
export function aggregateCsv(m,from,to) {
  return '\uFEFF'+[['dataset','SYNTHETIC DEMO ONLY'],['from_month',from],['to_month',to],['metric','value'],...['count','symptoms','pop','cradi','udi','total','participation','activities','requests','completed','paired','pre','post'].map(k=>[k,m[k]??''])].map(row=>row.join(',')).join('\r\n');
}
