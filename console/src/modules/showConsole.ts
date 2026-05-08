import { dateNow, cycleDay } from "./getCycleDay"
import { formatMb } from "./utils"

// # Console
export function showConsole ({ maxMb, usedMb, freeMb, maxAccumulated, avgPerDay, overuseMb }) {
  console.log("-------------------------------")
  console.log(` MB del plan: ${formatMb(maxMb)}MB | MB consumidos: ${formatMb(usedMb)}MB | MB restantes: ${formatMb(freeMb)}`)
  console.log("-------------------------------")
  console.log(`- Día actual: ${dateNow.day}`)
  console.log(`- Días desde el último reseteo: ${cycleDay}`)
  console.log("-------------------------------")
  console.log("# Recomendaciones")
  console.log(`- MB recomendados consumir por día: ${formatMb(avgPerDay)}MB`)
  console.log(`- Hoy consumir máximo hasta: ${formatMb(maxAccumulated)}MB ` + (
    overuseMb < 0
    ? `(Sobrepasado: ${formatMb(overuseMb)})`
    : `(Dentro del límite: ${formatMb(overuseMb)}MB)`)
  )
  console.log("-------------------------------")
}
