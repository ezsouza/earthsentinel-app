"use client"

import { useEffect, useState } from "react"
import { Cloud, CloudRain, Sun, Thermometer, Droplets } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStateStore } from "@/lib/state-store"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ForecastDay {
  date: string
  day: string
  maxTemp: number
  minTemp: number
  condition: string
  icon: string
  rainChance: number
  humidity: number
}

export default function ForecastSection() {
  const { selectedState } = useStateStore()
  const [forecastData, setForecastData] = useState<ForecastDay[]>([])
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState("Brasil")

  useEffect(() => {
    const getForecastData = async () => {
      setLoading(true)
      try {
        // Em um cenário real, chamaríamos a API com o estado selecionado
        // const data = await fetchForecastData(selectedState);

        // Dados simulados para demonstração
        const mockData = generateMockForecastData()
        setForecastData(mockData)

        // Atualiza a localização com base no estado selecionado
        if (selectedState === "all") {
          setLocation("Brasil")
        } else {
          const stateMap: Record<string, string> = {
            sp: "São Paulo",
            rj: "Rio de Janeiro",
            df: "Distrito Federal",
            ba: "Bahia",
            am: "Amazonas",
            rs: "Rio Grande do Sul",
            mg: "Minas Gerais",
            pr: "Paraná",
            pe: "Pernambuco",
            ce: "Ceará",
          }
          setLocation(stateMap[selectedState] || selectedState.toUpperCase())
        }
      } catch (error) {
        console.error("Erro ao buscar dados de previsão:", error)
      } finally {
        setLoading(false)
      }
    }

    getForecastData()
  }, [selectedState])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="p-4 animate-pulse">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mb-4"></div>
              <div className="flex justify-center">
                <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Previsão para {location}</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {forecastData.map((day, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 pb-2 pt-4">
                <CardTitle className="text-lg">{day.day}</CardTitle>
                <CardDescription>{day.date}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-col items-center">
                  <div className="mb-2">
                    {day.condition === "Ensolarado" && <Sun className="h-10 w-10 text-yellow-500" />}
                    {day.condition === "Parcialmente nublado" && <Cloud className="h-10 w-10 text-gray-500" />}
                    {day.condition === "Chuvoso" && <CloudRain className="h-10 w-10 text-blue-500" />}
                    {!["Ensolarado", "Parcialmente nublado", "Chuvoso"].includes(day.condition) && (
                      <Cloud className="h-10 w-10 text-gray-500" />
                    )}
                  </div>
                  <p className="text-sm text-center">{day.condition}</p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <Thermometer className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">
                      {day.minTemp}° / {day.maxTemp}°
                    </span>
                  </div>

                  <div className="w-full mt-4 space-y-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <CloudRain className="h-3 w-3 text-blue-500" />
                            <span>Chuva</span>
                          </div>
                          <span>{day.rainChance}%</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Probabilidade de precipitação</p>
                      </TooltipContent>
                    </Tooltip>
                    <Progress value={day.rainChance} className="h-1.5" />

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <Droplets className="h-3 w-3 text-blue-500" />
                            <span>Umidade</span>
                          </div>
                          <span>{day.humidity}%</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Umidade relativa do ar</p>
                      </TooltipContent>
                    </Tooltip>
                    <Progress value={day.humidity} className="h-1.5" />
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

// Função para gerar dados simulados de previsão
function generateMockForecastData(): ForecastDay[] {
  const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
  const conditions = ["Ensolarado", "Parcialmente nublado", "Chuvoso", "Nublado", "Céu limpo"]

  const today = new Date()
  const forecast: ForecastDay[] = []

  for (let i = 0; i < 5; i++) {
    const forecastDate = new Date()
    forecastDate.setDate(today.getDate() + i)

    const day = days[forecastDate.getDay()]
    const date = forecastDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })

    forecast.push({
      date,
      day: i === 0 ? "Hoje" : day,
      maxTemp: Math.floor(Math.random() * 10) + 25, // 25-35°C
      minTemp: Math.floor(Math.random() * 10) + 15, // 15-25°C
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      icon: "/placeholder.svg?height=50&width=50",
      rainChance: Math.floor(Math.random() * 100),
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
    })
  }

  return forecast
}
