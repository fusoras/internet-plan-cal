import { inputUsedMb, inputPlanMb, planDuration, cycleDay } from "./plan-internet-gb";

export function calculateMb(max = inputPlanMb, used = inputUsedMb) {
  const freeGB = max - used
  const avgPerDay = Math.trunc(max / planDuration); // Math.trunc quita los decimales
  const maxAccumulated = Math.trunc((max * cycleDay) / planDuration)
  const overuseMb = used - maxAccumulated

  return { max, used, freeGB, maxAccumulated, avgPerDay, overuseMb }
}