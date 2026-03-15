import { Temporal } from "@js-temporal/polyfill";

function obtenerConteoDesdeDia8(fecha = Temporal.Now.plainDateISO()) {
  // Si estamos en día 8 o después, el ciclo empezó este mes.
  // Si estamos antes de 8, el ciclo empezó el mes anterior.
  const inicioCiclo =
    fecha.day >= 8
      ? fecha.with({ day: 8 })
      : fecha.subtract({ months: 1 }).with({ day: 8 });

  // Día del ciclo (1-based)
  const diaDelCiclo = inicioCiclo.until(fecha, { largestUnit: "day" }).days;

  return { inicioCiclo, diaDelCiclo };
}

// Ejemplo con hoy
const hoy = Temporal.Now.plainDateISO();
const { inicioCiclo, diaDelCiclo } = obtenerConteoDesdeDia8(hoy);

console.log("Hoy:", hoy.toString());
console.log("Inicio ciclo:", inicioCiclo.toString());
console.log("Día del ciclo:", diaDelCiclo);

export const usedMB = 32100
export const maxMB = 200000
const dayRestartPlan = 8
const daysInMonth = 30

const today = new Date()
export const dayNow = today.getDate()
// Temporal
const nowDay = Temporal.Now.plainDateISO().day;
console.log(nowDay);

const fechaPredeterminada = Temporal.Now.plainDateISO().with({ day: 8 });
console.log(fechaPredeterminada.toString()); // 2026-03-15

export const dayCurrent = dayNow - dayRestartPlan
export const nFormat = (number: number) => (number.toLocaleString('es-MX'))

export function calculate(max = maxMB, used = usedMB) {
  const freeGB = max - used
  const avgPerDay = Math.trunc(max / daysInMonth); // Math.trunc quita los decimales
  const maxAccumulated = Math.trunc((max * dayCurrent) / daysInMonth)
  const limited = usedMB - maxAccumulated

  return { max, used, freeGB, maxAccumulated, avgPerDay, limited }
}
interface Gb {
  max: number
  used: number
  freeGB: number
  maxAccumulated: number
  avgPerDay: number
  limited: number
}
// console
function showConsole ({ max, used, freeGB, maxAccumulated, avgPerDay, limited }: Gb ) {
  console.log("-------------------------------")
  console.log(` MB del plan: ${nFormat(max)}MB | MB consumidos: ${nFormat(used)}MB | MB restantes: ${nFormat(freeGB)}`)
  console.log("-------------------------------")
  console.log(`- Dia actual: ${dayNow}`)
  console.log(`- Dias desde el ultimo reseteo: ${dayCurrent}`)
  console.log("-------------------------------")
  console.log("# Recomendaciones")
  console.log(`- MB recomendados consumir por dia: ${nFormat(avgPerDay)}MB`)
  console.log(`- Max consumir por ahora: ${nFormat(maxAccumulated)}MB`)
  if(limited > 0) {
    console.log(`- Sobrepasaste los MB recomendados por ${nFormat(limited)}MB`)
  }else if (limited < 0) {
    console.log(`- Aun tienes MB por consumir: ${nFormat(Math.abs(limited))}MB`)
  }
  console.log("-------------------------------")

}
showConsole(calculate())