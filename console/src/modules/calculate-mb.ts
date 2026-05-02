import { cycleDay } from "./plan-internet-gb"
import plan from "../data/plan.json" with { type: "json" }

const input = plan.input

export function calculateMb(max = input.planMb, used = input.usedMb) {
  const freeGB = max - used
  const avgPerDay = Math.trunc(max / plan.planDuration); // Math.trunc quita los decimales
  const maxAccumulated = Math.trunc((max * cycleDay) / plan.planDuration)
  const overuseMb = used - maxAccumulated

  return { max, used, freeGB, maxAccumulated, avgPerDay, overuseMb }
}