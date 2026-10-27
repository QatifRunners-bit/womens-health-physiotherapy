export function selectPresence(answers, present, index, value) {
  present[index] = value;
  answers[index] = value ? (answers[index] > 0 ? answers[index] : null) : 0;
}
export function canContinue(answers,index) {
  return Number.isInteger(answers[index]) && answers[index] >= 0 && answers[index] <= 4;
}
export function nextQuestion(answers,index) {
  if (!canContinue(answers,index)) return index;
  return index === 19 ? 'result' : index+1;
}
