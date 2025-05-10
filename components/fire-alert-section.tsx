"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, Flame, MapPin, Calendar, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useStateStore } from "@/lib/state-store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FireMap from "@/components/fire-map"

interface FireAlert {
  id: string
  location: string
  state: string
  riskLevel: "Baixo" | "Médio" | "Alto" | "Extremo"
  detectedAt: string
  coordinates: {
    lat: number
    lng: number
  }
  area: number // área em hectares
  source: string
}

export default function FireAlertSection() {
  const { selectedState } = useStateStore()
  const [fireAlerts, setFireAlerts] = useState<FireAlert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getFireAlerts = async () => {
      setLoading(true)
      try {
        // Em um cenário real, chamaríamos a API com o estado selecionado
        // const data = await fetchFireAlerts(selectedState);

        // Dados simulados para demonstração
        const mockData = generateMockFireAlerts(selectedState)
        setFireAlerts(mockData)
      } catch (error) {
        console.error("Erro ao buscar alertas de queimadas:", error)
      } finally {
        setLoading(false)
      }
    }

    getFireAlerts()
  }, [selectedState])

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="h-[300px] bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[200px] bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  const highRiskAlerts = fireAlerts.filter((alert) => alert.riskLevel === "Alto" || alert.riskLevel === "Extremo")

  return (
    <div className="space-y-6">
      {highRiskAlerts.length > 0 && (
        <Alert variant="destructive" className="bg-red-50 dark:bg-red-950/20 border-red-500">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Alerta de risco elevado</AlertTitle>
          <AlertDescription>
            Existem {highRiskAlerts.length} áreas com risco elevado de queimadas. Tome precauções adicionais.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="map">
        <TabsList className="mb-4">
          <TabsTrigger value="map">Mapa</TabsTrigger>
          <TabsTrigger value="list">Lista</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="mt-0">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden mb-6">
            <FireMap alerts={fireAlerts} />
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fireAlerts.map((alert, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Flame className={`h-5 w-5 ${getRiskColor(alert.riskLevel)}`} />
                        {alert.location}
                      </CardTitle>
                      <CardDescription>{alert.state}</CardDescription>
                    </div>
                    <Badge className={getRiskBadgeColor(alert.riskLevel)}>Risco {alert.riskLevel}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>
                        Coordenadas: {alert.coordinates.lat.toFixed(4)}, {alert.coordinates.lng.toFixed(4)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>Detectado em: {alert.detectedAt}</span>
                    </div>
                    <div className="text-sm">
                      <p>Área afetada: {alert.area} hectares</p>
                      <p className="text-xs text-muted-foreground mt-1">Fonte: {alert.source}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="w-full">
                    <span>Ver detalhes</span>
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Função para determinar a cor do ícone com base no nível de risco
function getRiskColor(riskLevel: string): string {
  switch (riskLevel) {
    case "Baixo":
      return "text-green-500"
    case "Médio":
      return "text-yellow-500"
    case "Alto":
      return "text-orange-500"
    case "Extremo":
      return "text-red-500"
    default:
      return "text-gray-500"
  }
}

// Função para determinar a cor do badge com base no nível de risco
function getRiskBadgeColor(riskLevel: string): string {
  switch (riskLevel) {
    case "Baixo":
      return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
    case "Médio":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100"
    case "Alto":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-100"
    case "Extremo":
      return "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100"
    default:
      return ""
  }
}

// Função para gerar dados simulados de alertas de queimadas
function generateMockFireAlerts(state: string): FireAlert[] {
  const riskLevels: Array<"Baixo" | "Médio" | "Alto" | "Extremo"> = ["Baixo", "Médio", "Alto", "Extremo"]
  const sources = ["INPE", "NASA FIRMS", "Sentinel-2", "MODIS", "Reportado por usuário"]
  const alerts: FireAlert[] = []

  // Mapeamento de estados para coordenadas aproximadas
  const stateCoordinates: Record<string, { lat: number; lng: number }> = {
    ac: { lat: -9.0, lng: -70.0 },
    al: { lat: -9.5, lng: -36.5 },
    ap: { lat: 1.0, lng: -52.0 },
    am: { lat: -3.5, lng: -65.0 },
    ba: { lat: -12.5, lng: -41.5 },
    ce: { lat: -5.0, lng: -39.0 },
    df: { lat: -15.8, lng: -47.9 },
    es: { lat: -19.5, lng: -40.5 },
    go: { lat: -16.0, lng: -49.5 },
    ma: { lat: -5.0, lng: -45.0 },
    mt: { lat: -13.0, lng: -56.0 },
    ms: { lat: -20.5, lng: -55.0 },
    mg: { lat: -18.0, lng: -44.0 },
    pa: { lat: -3.0, lng: -52.5 },
    pb: { lat: -7.0, lng: -36.5 },
    pr: { lat: -24.5, lng: -51.5 },
    pe: { lat: -8.5, lng: -37.5 },
    pi: { lat: -7.5, lng: -42.5 },
    rj: { lat: -22.0, lng: -43.0 },
    rn: { lat: -5.5, lng: -36.5 },
    rs: { lat: -30.0, lng: -53.5 },
    ro: { lat: -10.5, lng: -63.0 },
    rr: { lat: 2.0, lng: -61.5 },
    sc: { lat: -27.5, lng: -50.5 },
    sp: { lat: -22.0, lng: -48.0 },
    se: { lat: -10.5, lng: -37.5 },
    to: { lat: -10.0, lng: -48.5 },
  }

  // Nomes de cidades para cada estado
  const stateCities: Record<string, string[]> = {
    ac: ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira"],
    am: ["Manaus", "Parintins", "Tefé", "Coari"],
    pa: ["Belém", "Santarém", "Marabá", "Altamira"],
    mt: ["Cuiabá", "Sinop", "Rondonópolis", "Cáceres"],
    ms: ["Campo Grande", "Dourados", "Três Lagoas"],
    go: ["Goiânia", "Anápolis", "Rio Verde", "Catalão"],
    sp: ["São Paulo", "Campinas", "Ribeirão Preto", "São José dos Campos"],
    mg: ["Belo Horizonte", "Uberlândia", "Juiz de Fora", "Montes Claros"],
    rj: ["Rio de Janeiro", "Niterói", "Campos dos Goytacazes", "Juiz de Fora", "Montes Claros"],
    rj: ["Rio de Janeiro", "Niterói", "Campos dos Goytacazes", "Petrópolis"],
    ba: ["Salvador", "Feira de Santana", "Vitória da Conquista", "Ilhéus"],
    all: ["Amazônia Central", "Cerrado", "Pantanal", "Caatinga", "Mata Atlântica"],
  }

  // Se for "all", gera alertas para diferentes biomas
  if (state === "all") {
    const numAlerts = 8
    for (let i = 0; i < numAlerts; i++) {
      const randomBiome = stateCities["all"][Math.floor(Math.random() * stateCities["all"].length)]
      const randomState =
        Object.keys(stateCoordinates)[Math.floor(Math.random() * Object.keys(stateCoordinates).length)]
      const baseCoords = stateCoordinates[randomState]

      alerts.push({
        id: `fire-${i}-${randomState}`,
        location: randomBiome,
        state: randomState.toUpperCase(),
        riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)],
        detectedAt: new Date().toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        coordinates: {
          lat: baseCoords.lat + (Math.random() * 2 - 1),
          lng: baseCoords.lng + (Math.random() * 2 - 1),
        },
        area: Math.floor(Math.random() * 1000) + 50,
        source: sources[Math.floor(Math.random() * sources.length)],
      })
    }
  } else {
    // Gera alertas para o estado específico
    const cities = stateCities[state] || [`Capital de ${state.toUpperCase()}`, `Interior de ${state.toUpperCase()}`]
    const baseCoords = stateCoordinates[state] || { lat: -15.0, lng: -50.0 }

    const numAlerts = Math.floor(Math.random() * 3) + 2 // 2-4 alertas
    for (let i = 0; i < numAlerts; i++) {
      const randomCity = cities[Math.floor(Math.random() * cities.length)]

      alerts.push({
        id: `fire-${i}-${state}`,
        location: randomCity,
        state: state.toUpperCase(),
        riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)],
        detectedAt: new Date().toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        coordinates: {
          lat: baseCoords.lat + (Math.random() * 2 - 1),
          lng: baseCoords.lng + (Math.random() * 2 - 1),
        },
        area: Math.floor(Math.random() * 500) + 20,
        source: sources[Math.floor(Math.random() * sources.length)],
      })
    }
  }

  return alerts
}
