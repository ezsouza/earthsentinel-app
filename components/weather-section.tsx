"use client"

import { useEffect, useState } from "react"
import { Droplets, Thermometer, Wind, Compass, Gauge } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStateStore } from "@/lib/state-store"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface WeatherData {
  location: string
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  windDirection: string
  pressure: number
  condition: string
  icon: string
  updatedAt: string
}

export default function WeatherSection() {
  const { selectedState } = useStateStore()
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getWeatherData = async () => {
      setLoading(true)
      try {
        // Em um cenário real, chamaríamos a API com o estado selecionado
        // const data = await fetchWeatherData(selectedState);

        // Dados simulados para demonstração
        const mockData = generateMockWeatherData(selectedState)
        setWeatherData(mockData)
      } catch (error) {
        console.error("Erro ao buscar dados do clima:", error)
      } finally {
        setLoading(false)
      }
    }

    getWeatherData()
  }, [selectedState])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="p-6 animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mb-4"></div>
              <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weatherData.map((data, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30">
              <CardTitle>{data.location}</CardTitle>
              <CardDescription>Atualizado em {data.updatedAt}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-3xl font-bold">
                    <Thermometer className="h-6 w-6 text-orange-500" />
                    {data.temperature}°C
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-muted-foreground flex items-center gap-1 cursor-help">
                        {data.condition}
                        <span className="text-xs">ℹ️</span>
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Sensação térmica: {data.feelsLike}°C</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <img
                  src={data.icon || "/placeholder.svg?height=80&width=80"}
                  alt={data.condition}
                  className="w-16 h-16"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span>{data.humidity}% umidade</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-gray-500" />
                  <span>{data.windSpeed} km/h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-indigo-500" />
                  <span>{data.windDirection}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-purple-500" />
                  <span>{data.pressure} hPa</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  )
}

// Função para gerar dados simulados
function generateMockWeatherData(state: string): WeatherData[] {
  const windDirections = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
  const conditions = ["Ensolarado", "Parcialmente nublado", "Nublado", "Chuva leve", "Céu limpo"]
  const now = new Date()
  const formattedTime = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })

  if (state === "all") {
    return [
      {
        location: "São Paulo, SP",
        temperature: 24,
        feelsLike: 26,
        humidity: 65,
        windSpeed: 12,
        windDirection: windDirections[Math.floor(Math.random() * windDirections.length)],
        pressure: 1012,
        condition: "Parcialmente nublado",
        icon: "/placeholder.svg?height=80&width=80",
        updatedAt: formattedTime,
      },
      {
        location: "Rio de Janeiro, RJ",
        temperature: 28,
        feelsLike: 31,
        humidity: 70,
        windSpeed: 8,
        windDirection: windDirections[Math.floor(Math.random() * windDirections.length)],
        pressure: 1010,
        condition: "Ensolarado",
        icon: "/placeholder.svg?height=80&width=80",
        updatedAt: formattedTime,
      },
      {
        location: "Brasília, DF",
        temperature: 26,
        feelsLike: 27,
        humidity: 45,
        windSpeed: 15,
        windDirection: windDirections[Math.floor(Math.random() * windDirections.length)],
        pressure: 1015,
        condition: "Céu limpo",
        icon: "/placeholder.svg?height=80&width=80",
        updatedAt: formattedTime,
      },
      {
        location: "Salvador, BA",
        temperature: 30,
        feelsLike: 33,
        humidity: 75,
        windSpeed: 10,
        windDirection: windDirections[Math.floor(Math.random() * windDirections.length)],
        pressure: 1008,
        condition: "Ensolarado",
        icon: "/placeholder.svg?height=80&width=80",
        updatedAt: formattedTime,
      },
      {
        location: "Manaus, AM",
        temperature: 32,
        feelsLike: 36,
        humidity: 85,
        windSpeed: 5,
        windDirection: windDirections[Math.floor(Math.random() * windDirections.length)],
        pressure: 1005,
        condition: "Chuva leve",
        icon: "/placeholder.svg?height=80&width=80",
        updatedAt: formattedTime,
      },
      {
        location: "Porto Alegre, RS",
        temperature: 22,
        feelsLike: 23,
        humidity: 60,
        windSpeed: 18,
        windDirection: windDirections[Math.floor(Math.random() * windDirections.length)],
        pressure: 1018,
        condition: "Nublado",
        icon: "/placeholder.svg?height=80&width=80",
        updatedAt: formattedTime,
      },
    ]
  } else {
    // Retorna dados apenas para o estado selecionado
    const stateMap: Record<string, string> = {
      sp: "São Paulo",
      rj: "Rio de Janeiro",
      df: "Brasília",
      ba: "Salvador",
      am: "Manaus",
      rs: "Porto Alegre",
      mg: "Belo Horizonte",
      pr: "Curitiba",
      pe: "Recife",
      ce: "Fortaleza",
    }

    const stateName = stateMap[state] || "Cidade Principal"

    return [
      {
        location: `${stateName}, ${state.toUpperCase()}`,
        temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
        feelsLike: Math.floor(Math.random() * 15) + 22, // 22-37°C
        humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
        windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
        windDirection: windDirections[Math.floor(Math.random() * windDirections.length)],
        pressure: Math.floor(Math.random() * 20) + 1000, // 1000-1020 hPa
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        icon: "/placeholder.svg?height=80&width=80",
        updatedAt: formattedTime,
      },
      {
        location: `Interior, ${state.toUpperCase()}`,
        temperature: Math.floor(Math.random() * 15) + 20,
        feelsLike: Math.floor(Math.random() * 15) + 22,
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        windDirection: windDirections[Math.floor(Math.random() * windDirections.length)],
        pressure: Math.floor(Math.random() * 20) + 1000,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        icon: "/placeholder.svg?height=80&width=80",
        updatedAt: formattedTime,
      },
      {
        location: `Região Norte, ${state.toUpperCase()}`,
        temperature: Math.floor(Math.random() * 15) + 20,
        feelsLike: Math.floor(Math.random() * 15) + 22,
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        windDirection: windDirections[Math.floor(Math.random() * windDirections.length)],
        pressure: Math.floor(Math.random() * 20) + 1000,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        icon: "/placeholder.svg?height=80&width=80",
        updatedAt: formattedTime,
      },
    ]
  }
}
