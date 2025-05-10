"use client"

import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { AlertCircle, ArrowDown, ArrowUp, Factory, Leaf, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useStateStore } from "@/lib/state-store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CarbonData {
  region: string
  emissions: number
  capture: number
  balance: number
  year: number
  trend: "up" | "down" | "stable"
}

interface EmissionSource {
  name: string
  value: number
  color: string
}

export default function CarbonSection() {
  const { selectedState } = useStateStore()
  const [carbonData, setCarbonData] = useState<CarbonData[]>([])
  const [emissionSources, setEmissionSources] = useState<EmissionSource[]>([])
  const [loading, setLoading] = useState(true)
  const [totalBalance, setTotalBalance] = useState(0)

  useEffect(() => {
    const getCarbonData = async () => {
      setLoading(true)
      try {
        // Em um cenário real, chamaríamos a API com o estado selecionado
        // const data = await fetchCarbonData(selectedState);

        // Dados simulados para demonstração
        const mockData = generateMockCarbonData(selectedState)
        setCarbonData(mockData)

        // Gera dados de fontes de emissão
        setEmissionSources([
          { name: "Transporte", value: 35, color: "#ef4444" },
          { name: "Indústria", value: 25, color: "#f97316" },
          { name: "Agropecuária", value: 20, color: "#84cc16" },
          { name: "Energia", value: 15, color: "#3b82f6" },
          { name: "Resíduos", value: 5, color: "#8b5cf6" },
        ])

        // Calcula o balanço total
        const total = mockData.reduce((sum, item) => sum + item.balance, 0)
        setTotalBalance(total)
      } catch (error) {
        console.error("Erro ao buscar dados de carbono:", error)
      } finally {
        setLoading(false)
      }
    }

    getCarbonData()
  }, [selectedState])

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
        <div className="h-[400px] bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[200px] bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Alert
          className={`${totalBalance < 0 ? "bg-red-50 dark:bg-red-950/20 border-red-500" : "bg-green-50 dark:bg-green-950/20 border-green-500"}`}
        >
          {totalBalance < 0 ? (
            <AlertCircle className="h-4 w-4 text-red-500" />
          ) : (
            <Leaf className="h-4 w-4 text-green-500" />
          )}
          <AlertTitle>Balanço de Carbono</AlertTitle>
          <AlertDescription>
            {totalBalance < 0
              ? `Emissão líquida de ${Math.abs(totalBalance).toLocaleString()} toneladas de CO₂ equivalente.`
              : `Captura líquida de ${totalBalance.toLocaleString()} toneladas de CO₂ equivalente.`}
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="bar">
          <TabsList className="mb-4">
            <TabsTrigger value="bar">Emissões vs. Captura</TabsTrigger>
            <TabsTrigger value="pie">Fontes de Emissão</TabsTrigger>
          </TabsList>

          <TabsContent value="bar" className="mt-0">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Emissões vs. Captura de Carbono</CardTitle>
                    <CardDescription>Dados anuais em toneladas de CO₂ equivalente</CardDescription>
                  </div>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Comparação entre emissões e captura de carbono por região. Valores negativos no balanço indicam
                        emissão líquida.
                      </p>
                    </TooltipContent>
                  </UITooltip>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={carbonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="region" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => value.toLocaleString()}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "6px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          border: "none",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="emissions" name="Emissões" fill="#ef4444" />
                      <Bar dataKey="capture" name="Captura" fill="#22c55e" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pie" className="mt-0">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Fontes de Emissão de Carbono</CardTitle>
                    <CardDescription>Distribuição percentual por setor</CardDescription>
                  </div>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Distribuição das fontes de emissão de carbono por setor econômico.</p>
                    </TooltipContent>
                  </UITooltip>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={emissionSources}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {emissionSources.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => `${value}%`}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "6px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          border: "none",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {carbonData.slice(0, 3).map((region, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 bg-gradient-to-r from-green-50 to-gray-50 dark:from-green-950/30 dark:to-gray-950/30">
                <CardTitle>{region.region}</CardTitle>
                <CardDescription>Dados de {region.year}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Factory className="h-5 w-5 text-red-500" />
                      <span>Emissões:</span>
                    </div>
                    <span className="font-medium">{region.emissions.toLocaleString()} ton</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-green-500" />
                      <span>Captura:</span>
                    </div>
                    <span className="font-medium">{region.capture.toLocaleString()} ton</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span>Balanço:</span>
                    <div
                      className={`flex items-center gap-1 font-bold ${region.balance < 0 ? "text-red-500" : "text-green-500"}`}
                    >
                      {region.balance < 0 ? (
                        <>
                          <ArrowUp className="h-4 w-4" />
                          {Math.abs(region.balance).toLocaleString()} ton
                        </>
                      ) : (
                        <>
                          <ArrowDown className="h-4 w-4" />
                          {region.balance.toLocaleString()} ton
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Tendência:</span>
                    {region.trend === "up" && <ArrowUp className="h-4 w-4 text-red-500" />}
                    {region.trend === "down" && <ArrowDown className="h-4 w-4 text-green-500" />}
                    {region.trend === "stable" && <span>→</span>}
                    <span>{region.trend === "up" ? "Aumento" : region.trend === "down" ? "Redução" : "Estável"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}

// Função para gerar dados simulados de carbono
function generateMockCarbonData(state: string): CarbonData[] {
  const trends: Array<"up" | "down" | "stable"> = ["up", "down", "stable"]

  if (state === "all") {
    return [
      {
        region: "Norte",
        emissions: 120000,
        capture: 180000,
        balance: 60000,
        year: 2023,
        trend: "stable",
      },
      {
        region: "Nordeste",
        emissions: 150000,
        capture: 90000,
        balance: -60000,
        year: 2023,
        trend: "up",
      },
      {
        region: "Centro-Oeste",
        emissions: 200000,
        capture: 130000,
        balance: -70000,
        year: 2023,
        trend: "down",
      },
      {
        region: "Sudeste",
        emissions: 350000,
        capture: 120000,
        balance: -230000,
        year: 2023,
        trend: "up",
      },
      {
        region: "Sul",
        emissions: 180000,
        capture: 150000,
        balance: -30000,
        year: 2023,
        trend: "down",
      },
    ]
  } else {
    // Gera dados para regiões dentro do estado selecionado
    const regions = ["Capital", "Interior", "Região Norte", "Região Sul", "Região Central"]
    const selectedRegions = regions.slice(0, 3) // Pega apenas 3 regiões

    return selectedRegions.map((region) => {
      const emissions = Math.floor(Math.random() * 100000) + 50000
      const capture = Math.floor(Math.random() * 100000) + 30000

      return {
        region: `${region} (${state.toUpperCase()})`,
        emissions,
        capture,
        balance: capture - emissions,
        year: 2023,
        trend: trends[Math.floor(Math.random() * trends.length)],
      }
    })
  }
}
