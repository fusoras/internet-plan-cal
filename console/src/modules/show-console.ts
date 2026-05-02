import { mbFormat, dateNow, cycleDay } from "./plan-internet-gb"

// # Console
export function showConsole ({ max, used, freeGB, maxAccumulated, avgPerDay, overuseMb }) {
  console.log("-------------------------------")
  console.log(` MB del plan: ${mbFormat(max)}MB | MB consumidos: ${mbFormat(used)}MB | MB restantes: ${mbFormat(freeGB)}`)
  console.log("-------------------------------")
  console.log(`- Día actual: ${dateNow.day}`)
  console.log(`- Días desde el último reseteo: ${cycleDay}`)
  console.log("-------------------------------")
  console.log("# Recomendaciones")
  console.log(`- MB recomendados consumir por día: ${mbFormat(avgPerDay)}MB`)
  console.log(`- Hoy consumir máximo hasta: ${mbFormat(maxAccumulated)}MB ` + (
    overuseMb > 0 
    ? `(Sobrepasado: ${mbFormat(overuseMb)})` 
    : `(Dentro del límite: ${mbFormat(Math.abs(overuseMb))}MB)`))
  console.log("-------------------------------")
}