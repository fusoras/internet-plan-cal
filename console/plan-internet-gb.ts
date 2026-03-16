import { Temporal } from "@js-temporal/polyfill";

function getCycleDay(dateT = Temporal.Now.plainDateISO()) {
  // day 8 of the month is the reset day for the plan
  const init =
    dateT.day >= 8
      ? dateT.with({ day: 8 })
      : dateT.subtract({ months: 1 }).with({ day: 8 });

  const cycleDay = init.until(dateT, { largestUnit: "day" }).days;

  return { init, cycleDay };
}

// # Example with today (temporal)
// const falseDate = Temporal.Now.plainDateISO().with({ day: 17 })
// console.log(`false date: ${falseDate}`)
const todayT = Temporal.Now.plainDateISO();
const { init, cycleDay } = getCycleDay(todayT);

// console.log("-- Test Temporal --")
// console.log("Today:", todayT.toString());
// console.log("Inicio ciclo:", init.toString());
// console.log("Día del ciclo:", cycleDay);
// # Const values
// export const usedMB = 42100
// export const maxMB = 200000
const inputUsedMb = 42100
const inputPlanMb = 200000
const planDuration = 30

// const today = new Date()
// export const dayNow = today.getDate()
// export const nFormat = (number: number) => (number.toLocaleString('es-MX'))
export const mbFormat = (number: number) => (number.toLocaleString('es-MX'))

export function calculateMb(max = inputPlanMb, used = inputUsedMb) {
  const freeGB = max - used
  const avgPerDay = Math.trunc(max / planDuration); // Math.trunc quita los decimales
  const maxAccumulated = Math.trunc((max * cycleDay) / planDuration)
  const overuseMb = used - maxAccumulated

  return { max, used, freeGB, maxAccumulated, avgPerDay, overuseMb }
}
interface Mb {
  max: number
  used: number
  freeGB: number
  maxAccumulated: number
  avgPerDay: number
  overuseMb: number
}
// # Console
function showConsole ({ max, used, freeGB, maxAccumulated, avgPerDay, overuseMb }: Mb ) {
  console.log("-------------------------------")
  console.log(` MB del plan: ${mbFormat(max)}MB | MB consumidos: ${mbFormat(used)}MB | MB restantes: ${mbFormat(freeGB)}`)
  console.log("-------------------------------")
  console.log(`- Dia actual: ${todayT}`)
  console.log(`- Dias desde el ultimo reseteo: ${cycleDay}`)
  console.log("-------------------------------")
  console.log("# Recomendaciones")
  console.log(`- MB recomendados consumir por dia: ${mbFormat(avgPerDay)}MB`)
  console.log(`- Hoy consumir maximo hasta: ${mbFormat(maxAccumulated)}MB ` + (
    overuseMb > 0 
    ? `(Sobrepasado: ${mbFormat(overuseMb)})` 
    : `(Dentro del limite: ${mbFormat(Math.abs(overuseMb))}MB)`))
  console.log("-------------------------------")

}
showConsole(calculateMb())