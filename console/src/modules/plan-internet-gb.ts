import { Temporal } from "@js-temporal/polyfill"
import plan from "../data/plan.json" with { type: "json" }

const defaultDateReset = plan.default.dateReset

export const dateNow = Temporal.Now.plainDateISO().subtract({days: 1})

function getCycleDay(dateT = dateNow, dateReset = defaultDateReset) {
  // day 8 of the month is the reset day for the plan
  const init =
    dateT.day >= dateReset
      ? dateT.with({ day: dateReset })
      : dateT.subtract({ months: 1 }).with({ day: dateReset })

  const cycleDay = init.until(dateT, { largestUnit: "day" }).days

  return { init, cycleDay };
}

export const { init, cycleDay } = getCycleDay()
