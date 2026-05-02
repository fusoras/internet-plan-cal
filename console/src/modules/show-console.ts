import { dateNow, cycleDay } from "./plan-internet-gb"
import { formatMb } from "./utils"

// # Console
export function showConsole ({ maxMb, usedMb, freeGB, maxAccumulated, avgPerDay, overuseMb }) {
  console.log("-------------------------------")
  console.log(` MB del plan: ${formatMb(maxMb)}MB | MB consumidos: ${formatMb(usedMb)}MB | MB restantes: ${formatMb(freeGB)}`)
  console.log("-------------------------------")
  console.log(`- Día actual: ${dateNow.day}`)
  console.log(`- Días desde el último reseteo: ${cycleDay}`)
  console.log("-------------------------------")
  console.log("# Recomendaciones")
  console.log(`- MB recomendados consumir por día: ${formatMb(avgPerDay)}MB`)
  console.log(`- Hoy consumir máximo hasta: ${formatMb(maxAccumulated)}MB ` + (
    overuseMb > 0 
    ? `(Sobrepasado: ${formatMb(overuseMb)})` 
    : `(Dentro del límite: ${formatMb(Math.abs(overuseMb))}MB)`))
  console.log("-------------------------------")
}