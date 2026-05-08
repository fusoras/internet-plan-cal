import { useState } from "react";
import { calculateMb } from "@/modules/calculateMb";
import { formatMb as mbFormat } from "@/modules/utils";
import { dateNow, cycleDay } from "@/modules/getCycleDay";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Mbs = { valueMin?: number; valueMax?: number; };

function normalizeMbValue(value: string) {
  console.log("value in normalizeMbValue", value);
  const cleanedValue = value.replace(/[.,]/g, "");
  console.log("cleanedValue in normalizeMbValue", cleanedValue);
  return cleanedValue === "" ? 0 : Number(cleanedValue);
}

export function Main() {
  const [inputUsedMb, setInputUsedMb] = useState(0);
  const [inputMaxMb, setInputMaxMb] = useState(200000);
  const [spentMb, setSpentMb] = useState(0);
  const [maxMb, setMaxMb] = useState(200000);
  const [isAriaDisabled, setIsAriaDisabled] = useState(false);
  const [unitSelection, setUnitSelection] = useState("Megabytes");

  const { avgPerDay, maxAccumulated, overuseMb } = calculateMb(inputMaxMb, inputUsedMb);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectOption = event.target.value;
    setUnitSelection(selectOption);
    console.log("Seleccionaste:", selectOption);
  };
  function handleInput({ valueMin, valueMax }: Mbs = {}) {
    if (valueMin !== undefined && inputMaxMb !== undefined) {
      if (valueMin > inputMaxMb) {
        setIsAriaDisabled(true);
        return;
      }
      const formatMb = unitSelection == "Gigabytes" ? valueMin * 1000 : valueMin;
      setInputUsedMb(formatMb);
      console.log("valueMin in handleinput", formatMb);
    }
    if (valueMax !== undefined) {
      const formatMb = unitSelection == "Gigabytes" ? valueMax * 1000 : valueMax;
      setInputMaxMb(formatMb);
      console.log("valueMax in handleinput", formatMb);
    }
    setIsAriaDisabled(false);
  }

  function handleButton() {
    setSpentMb(inputUsedMb);
    setMaxMb(inputMaxMb);
    console.log("valueMin", inputUsedMb);
    console.log("valueMax", inputMaxMb);
  }
  return (
    <main className="flex flex-col place-content-center place-items-center">
      <FieldGroup>
        <select onChange={handleSelectChange}>
          <option value="Megabytes">Megabytes / MB</option>
          <option value="Gigabytes">Gigabytes / GB</option>
        </select>
        <Field>
          <FieldLabel htmlFor="fieldgroup-name">{unitSelection} consumidos</FieldLabel>
          <Input
            aria-invalid={isAriaDisabled}
            id="fieldgroup-name"
            type="number"
            min="0"
            step="1"
            placeholder={unitSelection === "Megabytes" ? "50000 MB" : "50 GB"}
            onChange={(e) => handleInput({ valueMin: normalizeMbValue(e.target.value) })}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="fieldgroup-email">{unitSelection} maximos del plan</FieldLabel>
          <Input
            id="fieldgroup-email"
            type="number"
            min="0"
            step="1"
            placeholder={unitSelection === "Megabytes" ? "200000 MB" : "200 GB"}
            onChange={(e) => handleInput({ valueMax: normalizeMbValue(e.target.value) })}
          />
          <FieldDescription></FieldDescription>
        </Field>
        <Field orientation="horizontal" className="flex justify-center">
          <Button type="submit" onClick={() => handleButton()}>
            Guardar
          </Button>
        </Field>
      </FieldGroup>
      <Card className="mt-4">
        <CardContent className="space-y-1 text-sm">
          <div className="flex items-center gap-1">
            <p>
              MB del plan: <Badge variant="outline">{mbFormat(maxMb)}MB</Badge>
            </p>
            <div className="border-l h-10 md:h-5"></div>
            <p>
              MB consumidos: <Badge variant="default">{mbFormat(spentMb)}MB</Badge>
            </p>
            <div className="border-l h-10 md:h-5"></div>
            <p>
              MB restantes: <Badge variant="destructive">{mbFormat(maxMb - spentMb)}MB</Badge>
            </p>
          </div>
          <div className="border-t mt-3 p-2">
            <p>
              Día actual: <Badge variant="outline">{dateNow.day}</Badge>
            </p>
            <p>
              Días desde el último reseteo: <Badge variant="outline">{cycleDay}</Badge>
            </p>
            <h2 className="text-xl">Recomendaciones</h2>
            <p>
              MB recomendados consumir por día:{" "}
              <Badge variant="outline">{mbFormat(avgPerDay)}MB</Badge>
            </p>
            <p>
              Hoy consumir máximo hasta:{" "}
              <Badge variant="outline">{mbFormat(maxAccumulated)}MB</Badge>{" "}
              {overuseMb < 0
                ? `(Sobrepasado: ${mbFormat(overuseMb)})`
                : `(Dentro del límite: ${mbFormat(Math.abs(overuseMb))}MB)`}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
