import { usedMB, nFormat, maxMB, dayNow, dayCurrent, calculate } from "./plan.js";
const $ = (input) => document.querySelector(input)

const usedGbInput = $('#used-gb-input')
const maxGbInput = $('#max-gb-input')

if (usedGbInput && !usedGbInput.value) {
    usedGbInput.value = String(usedMB)
}
if (maxGbInput && !maxGbInput.value) {
    maxGbInput.value = String(maxMB)
}

const maxPlanValue = $('#val-max-plan')
const usedValue = $('#val-used')
const freeValue = $('#val-free')
const dayNowValue = $('#val-day-now')
const dayCurrentValue = $('#val-day-current')
const avgPerDayValue = $('#val-avg-per-day')
const maxAccumulatedValue = $('#val-max-accumulated')
const limitMessageValue = $('#val-limit-message')

function render(used = Number(usedGbInput?.value),max = Number(maxGbInput?.value)) {
    const { max: maxPlan, freeGB, maxAccumulated, avgPerDay, limited } = calculate(max, used)

    usedGbInput.setAttribute('max', `${max}`)
    if (used > max) {
        return
    }

    maxPlanValue.textContent = nFormat(maxPlan)
    usedValue.textContent = nFormat(used)
    freeValue.textContent = nFormat(freeGB)
    dayNowValue.textContent = String(dayNow)
    dayCurrentValue.textContent = String(dayCurrent)
    avgPerDayValue.textContent = nFormat(avgPerDay)
    maxAccumulatedValue.textContent = nFormat(maxAccumulated)

    if (limited > 0) {
        limitMessageValue.textContent = "Sobrepasaste los MB recomendados por " + nFormat(limited) + "MB";
    } else if (limited < 0) {
        limitMessageValue.textContent = "Aun tienes MB por consumir: " + nFormat(Math.abs(limited)) + "MB";
    } else {
        limitMessageValue.textContent = "Estas justo en el limite recomendado.";
    }
}

usedGbInput?.addEventListener('input', (event) => {
    const value = Number(event.target.value)
    render(Number.isFinite(value) ? value : 0, Number(maxGbInput?.value))
})
maxGbInput?.addEventListener('input', (event) => {
    const value = Number(event.target.value)
    render(Number(usedGbInput?.value), Number.isFinite(value) ? value : 0)
})
render()
