"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { AlertTriangle, Flame, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useStateStore } from "@/lib/state-store"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type RiskLevel = "baixo" | "moderado" | "alto" | "extremo"

interface RiskData {
  level: RiskLevel
  description: string
  color: string
  bgColor: string
  icon: React.ReactNode
}

const riskLevels: Record<RiskLevel, RiskData> = {
  baixo: {
    level: "baixo",
    description: "Risco baixo de queimadas. Condições favoráveis para atividades ao ar livre.",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
    icon: <Flame className="h-5 w-5 text-green-600 dark:text-green-400" />,
  },
  moderado: {
    level: "moderado",
    description: "Risco moderado de queimadas. Recomenda-se atenção em atividades que possam gerar faíscas.",
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800",
    icon: <Flame className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
  },
  alto: {
    level: "alto",
    description:
      "Risco alto de queimadas. Evite atividades que possam gerar faíscas e fique atento a focos de incêndio.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800",
    icon: <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />,
  },
  extremo: {
    level: "extremo",
    description:
      "Risco extremo de queimadas. Situação crítica que requer máxima atenção. Evite qualquer atividade que possa gerar faíscas.",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
    icon: <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />,
  },
}

export default function FireRiskAlert() {
  const { selectedState } = useStateStore()
  const [riskData, setRiskData] = useState<RiskData>(riskLevels.baixo)

  useEffect(() => {
    // Simula a obtenção de dados de risco com base no estado selecionado
    const getRiskLevel = () => {
      // Simulação: estados diferentes têm níveis de risco diferentes
      const stateRiskMap: Record<string, RiskLevel> = {
        am: "alto",
        pa: "alto",
        mt: "extremo",
        ms: "alto",
        to: "moderado",
        ma: "moderado",
        pi: "moderado",
        ce: "baixo",
        rn: "baixo",
        pb: "baixo",
        pe: "baixo",
        al: "baixo",
        se: "baixo",
        ba: "moderado",
        go: "alto",
        df: "moderado",
        mg: "moderado",
        es: "baixo",
        rj: "baixo",
        sp: "baixo",
        pr: "baixo",
        sc: "baixo",
        rs: "baixo",
        ac: "alto",
        ro: "alto",
        rr: "moderado",
        ap: "moderado",
      }

      // Se for "all" (todo o Brasil), retorna um nível médio
      if (selectedState === "all") {
        return "moderado" as RiskLevel
      }

      return stateRiskMap[selectedState] || ("baixo" as RiskLevel)
    }

    const riskLevel = getRiskLevel()
    setRiskData(riskLevels[riskLevel])
  }, [selectedState])

  return (
    <TooltipProvider>
      <Alert className={`${riskData.bgColor} mb-6`}>
        <div className="flex items-center gap-2">
          {riskData.icon}
          <AlertTitle className={riskData.color}>
            Alerta de Risco de Queimadas: <span className="font-bold capitalize">{riskData.level}</span>
          </AlertTitle>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{riskData.description}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <AlertDescription className="mt-2">{riskData.description}</AlertDescription>
      </Alert>
    </TooltipProvider>
  )
}
