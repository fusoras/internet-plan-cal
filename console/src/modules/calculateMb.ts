import { cycleDay } from "./getCycleDay"
import plan from "../data/plan.json" with { type: "json" }

const defaultPlanMb = plan.default.planMb
const defaultUsedMb = plan.default.usedMb
const defaultPlanDuration = plan.default.planDuration

export function calculateMb(maxMb = defaultPlanMb, usedMb = defaultUsedMb) {
  const freeMb = maxMb - usedMb
  const avgPerDay = Math.trunc(maxMb / defaultPlanDuration);
  const accumulatedDays = Math.min(cycleDay + 1, defaultPlanDuration)
  const maxAccumulated = Math.trunc((maxMb * accumulatedDays) / defaultPlanDuration)
  const overuseMb = maxAccumulated - usedMb

  return { maxMb, usedMb, freeMb, maxAccumulated, avgPerDay, overuseMb }
}
