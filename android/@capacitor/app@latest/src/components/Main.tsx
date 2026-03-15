import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { maxMB,usedMB, nowDay, nFormat, dayCurrentTemporal, calculate } from '@/lib/plan-internet-gb'
import { useState} from "react"
export function Main(){
    const [inputUsedMb, setInputUsedMb] = useState(usedMB)
    const [spentMb, setSpentMb] = useState(usedMB)
    const [isAriaDisabled, setIsAriaDisabled] = useState(false)
    const { avgPerDay, maxAccumulated } = calculate(maxMB, usedMB)

    function handleInput(value: number) {
      if (value > maxMB) {
        setIsAriaDisabled(true)
        return
      }
      setIsAriaDisabled(false)
      setInputUsedMb(value)
    }

    function handleButton (){
        setSpentMb(inputUsedMb)
        console.log("value", inputUsedMb)
    }
    return (
        <main className='flex flex-col place-content-center place-items-center'>
            <h2 className='text-2xl'>Input</h2>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="fieldgroup-name">MB consumidos</FieldLabel>
                    <Input aria-invalid={isAriaDisabled} id="fieldgroup-name" type="number" min="0" step="1" placeholder="1000 = 1gb" onChange={(e) => handleInput(Number(e.target.value))} />
                </Field>
                <Field>
                    <FieldLabel htmlFor="fieldgroup-email">MB maximos del plan</FieldLabel>
                    <Input
                        id="fieldgroup-email"
                        type="number"
                        min="0"
                        step="1"
                        placeholder="200000"
                    />
                    <FieldDescription>
                    </FieldDescription>
                </Field>
                <Field orientation="horizontal">
                    <Button type="reset" variant="outline">
                    Reset
                    </Button>
                    <Button type="submit" onClick={() => handleButton()}>Submit</Button>
                </Field>
            </FieldGroup>
            <p id="gb-plan-2">
                MB del plan: {nFormat(maxMB)}MB |
                MB consumidos: {nFormat(spentMb)}MB |
                MB restantes: {nFormat(maxMB - spentMb)}MB
            </p>
            <p id="gb-plan-3">Dia actual: {nowDay}</p>
            <p id="gb-plan-4">Dias desde el ultimo reseteo: {dayCurrentTemporal}</p>
            <h2 id="gb-plan-5">Recomendaciones</h2>
            <p id="gb-plan-6">MB recomendados consumir por dia: {nFormat(avgPerDay)}MB</p>
            <p id="gb-plan-7">Max consumir por ahora: {nFormat(maxAccumulated)}MB</p>
        </main>
    )
}