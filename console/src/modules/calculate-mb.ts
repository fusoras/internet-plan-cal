import { cycleDay } from "./plan-internet-gb"
import plan from "../data/plan.json" with { type: "json" }

const defaultPlanMb = plan.default.planMb
const defaultUsedMb = plan.default.usedMb
const defaultPlanDuration = plan.default.planDuration

export function calculateMb(maxMb = defaultPlanMb, usedMb = defaultUsedMb) {
  const freeGB = maxMb - usedMb
  const avgPerDay = Math.trunc(maxMb / defaultPlanDuration); // Math.trunc quita los decimales
  const maxAccumulated = Math.trunc((maxMb * cycleDay) / defaultPlanDuration)
  const overuseMb = usedMb - maxAccumulated

  return { maxMb, usedMb, freeGB, maxAccumulated, avgPerDay, overuseMb }
}