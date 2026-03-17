import { useState} from "react"
import { todayT, mbFormat, cycleDay, calculateMb } from '@/lib/plan-internet-gb'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Mbs = { valueMin?: number, valueMax?: number }

export function Main(){
    const [inputUsedMb, setInputUsedMb] = useState(0)
    const [inputMaxMb, setInputMaxMb] = useState(200000)
    const [spentMb, setSpentMb] = useState(0)
    const [maxMb, setMaxMb] = useState(0)
    const [isAriaDisabled, setIsAriaDisabled] = useState(false)
    const { avgPerDay, maxAccumulated, overuseMb } = calculateMb(inputMaxMb, inputUsedMb)

    function handleInput({ valueMin, valueMax }: Mbs = {}) {
        if (valueMin !== undefined && inputMaxMb !== undefined) {
            if (valueMin > inputMaxMb) {
                setIsAriaDisabled(true)
                return
            }
            setInputUsedMb(valueMin)
            console.log("valueMin in handleinput", valueMin)
        }
        if ( valueMax !== undefined) {
            setInputMaxMb(valueMax)
            console.log("valueMax in handleinput", valueMax)
        }
      setIsAriaDisabled(false)
    }

    function handleButton (){
        setSpentMb(inputUsedMb)
        setMaxMb(inputMaxMb)
        console.log("valueMin", inputUsedMb)
        console.log("valueMax", inputMaxMb)
    }
    return (
        <main className='flex flex-col place-content-center place-items-center'>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="fieldgroup-name">MB consumidos</FieldLabel>
                    <Input aria-invalid={isAriaDisabled} id="fieldgroup-name" type="number" min="0" step="1" placeholder="1000 = 1gb" onChange={(e) => handleInput({valueMin: Number(e.target.value)})} />
                </Field>
                <Field>
                    <FieldLabel htmlFor="fieldgroup-email">MB maximos del plan</FieldLabel>
                    <Input
                        id="fieldgroup-email"
                        type="number"
                        min="0"
                        step="1"
                        placeholder="200000 = 200gb"
                        onChange={(e) => handleInput({valueMax: Number(e.target.value)})}
                    />
                    <FieldDescription>
                    </FieldDescription>
                </Field>
                <Field orientation="horizontal" className="flex justify-center">
                    <Button type="submit" onClick={() => handleButton()}>Guardar</Button>
                </Field>
            </FieldGroup>
            <Card className="mt-4">
              <CardContent className="space-y-1 text-sm">
                <div className="flex items-center gap-1">
                    <p>MB del plan: <Badge variant="outline">{mbFormat(maxMb)}MB</Badge></p>
                    <div className="border-l h-10 md:h-5"></div>
                    <p>MB consumidos: <Badge variant="default">{mbFormat(spentMb)}MB</Badge></p>
                    <div className="border-l h-10 md:h-5"></div>
                    <p>MB restantes: <Badge variant="destructive" >{mbFormat(maxMb - spentMb)}MB</Badge></p>
                </div>
                <div className="border-t mt-3 p-2">
                    <p>Día actual: <Badge variant="outline">{todayT.day}</Badge></p>
                    <p>Días desde el último reseteo: <Badge variant="outline">{cycleDay}</Badge></p>
                    <h2 className="text-xl">Recomendaciones</h2>
                    <p>MB recomendados consumir por día: <Badge variant="outline">{mbFormat(avgPerDay)}MB</Badge></p>
                    <p>Hoy consumir máximo hasta: <Badge variant="outline">{mbFormat(maxAccumulated)}MB</Badge> {overuseMb > 0 ? `(Sobrepasado: ${mbFormat(overuseMb)})` : `(Dentro del límite: ${mbFormat(Math.abs(overuseMb))}MB)`}</p>
                </div>
              </CardContent>
            </Card>

        </main>
    )
}