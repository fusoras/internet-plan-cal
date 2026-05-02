import { Temporal } from "@js-temporal/polyfill"

const defaultDateReset = 8

function getCycleDay(dateT = Temporal.Now.plainDateISO(), dateReset = defaultDateReset) {
  // day 8 of the month is the reset day for the plan
  const init =
    dateT.day >= dateReset
      ? dateT.with({ day: dateReset })
      : dateT.subtract({ months: 1 }).with({ day: dateReset })

  const cycleDay = init.until(dateT, { largestUnit: "day" }).days

  return { init, cycleDay };
}

export const dateNow = Temporal.Now.plainDateISO()
export const { init, cycleDay } = getCycleDay(dateNow)

export const mbFormat = (rawMegabytes = 0) => rawMegabytes.toLocaleString('es-MX')