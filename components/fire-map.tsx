"use client"

import { useRef, useState } from "react"
import { Flame } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface FireMapProps {
  alerts: {
    id: string
    location: string
    state: string
    riskLevel: "Baixo" | "Médio" | "Alto" | "Extremo"
    coordinates: {
      lat: number
      lng: number
    }
    area: number
  }[]
}

export default function FireMap({ alerts }: FireMapProps) {
  const [activeAlert, setActiveAlert] = useState<string | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  const getRiskColor = (riskLevel: string): string => {
    switch (riskLevel) {
      case "Baixo":
        return "bg-green-500"
      case "Médio":
        return "bg-yellow-500"
      case "Alto":
        return "bg-orange-500"
      case "Extremo":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const handlePointClick = (id: string) => {
    setActiveAlert(id === activeAlert ? null : id)
  }

  return (
    <div className="relative w-full h-[500px] bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
      <div className="absolute top-4 left-4 z-10 bg-white dark:bg-gray-900 p-2 rounded-md shadow-md">
        <h4 className="text-sm font-medium mb-2">Legenda</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs">Risco Baixo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs">Risco Médio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs">Risco Alto</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs">Risco Extremo</span>
          </div>
        </div>
      </div>

      {/* Mapa do Brasil */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Imagem do mapa do Brasil - usando uma imagem mais realista */}
          <svg
            className="absolute inset-0 w-full h-full opacity-80 dark:opacity-60"
            viewBox="0 0 800 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Contorno simplificado do Brasil */}
            <path
              d="M400 150 C300 150, 200 200, 150 300 C100 400, 100 500, 150 600 C200 700, 300 750, 400 750 C500 750, 600 700, 650 600 C700 500, 700 400, 650 300 C600 200, 500 150, 400 150"
              fill="#D1E7DD"
              stroke="#198754"
              strokeWidth="8"
            />
            {/* Estados principais */}
            <circle cx="300" cy="250" r="30" fill="#AED6B8" stroke="#198754" strokeWidth="2" /> {/* Norte */}
            <circle cx="450" cy="250" r="25" fill="#AED6B8" stroke="#198754" strokeWidth="2" /> {/* Nordeste */}
            <circle cx="350" cy="400" r="40" fill="#AED6B8" stroke="#198754" strokeWidth="2" /> {/* Centro-Oeste */}
            <circle cx="450" cy="500" r="35" fill="#AED6B8" stroke="#198754" strokeWidth="2" /> {/* Sudeste */}
            <circle cx="350" cy="600" r="30" fill="#AED6B8" stroke="#198754" strokeWidth="2" /> {/* Sul */}
          </svg>

          {/* Pontos de alerta */}
          {alerts.map((alert) => {
            // Normaliza as coordenadas para o tamanho do mapa
            // Ajustando para coordenadas mais realistas do Brasil
            const normalizedLat = ((alert.coordinates.lat + 33) / 66) * 100
            const normalizedLng = ((alert.coordinates.lng + 74) / 148) * 100

            return (
              <div
                key={alert.id}
                className={`absolute cursor-pointer transition-all duration-300 ${
                  activeAlert === alert.id ? "z-20 scale-125" : "z-10"
                }`}
                style={{
                  top: `${normalizedLat}%`,
                  left: `${normalizedLng}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => handlePointClick(alert.id)}
              >
                <div className={`relative group`}>
                  <div
                    className={`w-4 h-4 rounded-full ${getRiskColor(
                      alert.riskLevel,
                    )} shadow-md flex items-center justify-center animate-pulse`}
                  >
                    <Flame className="h-2 w-2 text-white" />
                  </div>

                  {activeAlert === alert.id && (
                    <Card className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 shadow-lg z-30">
                      <CardContent className="p-3 text-xs">
                        <div className="font-medium">
                          {alert.location}, {alert.state}
                        </div>
                        <div className="text-muted-foreground mt-1">Área: {alert.area} hectares</div>
                        <Badge className="mt-2" variant="outline">
                          Risco {alert.riskLevel}
                        </Badge>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
