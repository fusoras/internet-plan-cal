// Console/plan-internet-gb.ts
var usedMB = 31700;
var maxMB = 200000;
var dayRestartPlan = 8;
var daysInMonth = 30;
var today = new Date;
var dayNow = today.getDate();
var dayCurrent = dayNow - dayRestartPlan;
var nFormat = (number) => number.toLocaleString("es-MX");
function calculate(max = maxMB, used = usedMB) {
  const freeGB = max - used;
  const avgPerDay = Math.trunc(max / daysInMonth);
  const maxAccumulated = Math.trunc(max * dayCurrent / daysInMonth);
  const limited = usedMB - maxAccumulated;
  return { max, used, freeGB, maxAccumulated, avgPerDay, limited };
}
function showConsole({ max, used, freeGB, maxAccumulated, avgPerDay, limited }) {
  console.log("-------------------------------");
  console.log(" MB del plan: " + nFormat(max) + "MB | MB consumidos: " + nFormat(used) + "MB" + " | MB restantes: " + nFormat(freeGB));
  console.log("-------------------------------");
  console.log("- Dia actual: " + dayNow);
  console.log("- Dias desde el ultimo reseteo: " + dayCurrent);
  console.log("-------------------------------");
  console.log("# Recomendaciones");
  console.log("- MB recomendados consumir por dia: " + nFormat(avgPerDay) + "MB");
  console.log("- Max consumir por ahora: " + nFormat(maxAccumulated) + "MB");
  if (limited > 0) {
    console.log("- Sobrepasaste los MB recomendados por " + nFormat(limited) + "MB");
  } else if (limited < 0) {
    console.log("- Aun tienes MB por consumir: " + nFormat(Math.abs(limited)) + "MB");
  }
  console.log("-------------------------------");
}
// showConsole(calculate());
export {
  usedMB,
  nFormat,
  maxMB,
  dayNow,
  dayCurrent,
  calculate
};
