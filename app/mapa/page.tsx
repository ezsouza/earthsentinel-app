"use client"

import { useState, useEffect } from "react"
import { Flame, Filter, Layers, Info, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Header from "@/components/header"
import FireMap from "@/components/fire-map"
import FireRiskAlert from "@/components/fire-risk-alert"

interface FireAlert {
  id: string
  location: string
  state: string
  riskLevel: "Baixo" | "Médio" | "Alto" | "Extremo"
  coordinates: {
    lat: number
    lng: number
  }
  area: number
}

export default function MapaPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedState, setSelectedState] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("7d")
  const [showVerified, setShowVerified] = useState(true)
  const [showReported, setShowReported] = useState(true)
  const [intensityRange, setIntensityRange] = useState([0, 100])
  const [fireAlerts, setFireAlerts] = useState<FireAlert[]>([])

  useEffect(() => {
    // Simulação de carregamento de dados
    const loadData = setTimeout(() => {
      setFireAlerts(generateMockFireAlerts())
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(loadData)
  }, [])

  const generateMockFireAlerts = (): FireAlert[] => {
    const alerts: FireAlert[] = []
    const riskLevels: Array<"Baixo" | "Médio" | "Alto" | "Extremo"> = ["Baixo", "Médio", "Alto", "Extremo"]

    // Gera 30 alertas aleatórios pelo Brasil
    for (let i = 0; i < 30; i++) {
      alerts.push({
        id: `FIRE-${i + 1}`,
        location: `Localização ${i + 1}`,
        state: ["AM", "PA", "MT", "GO", "MG", "SP", "PR", "RS", "BA", "PE"][Math.floor(Math.random() * 10)],
        riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)],
        coordinates: {
          lat: -15 + (Math.random() * 20 - 10), // Aproximadamente entre -25 e -5 (Brasil)
          lng: -50 + (Math.random() * 20 - 10), // Aproximadamente entre -60 e -40 (Brasil)
        },
        area: Math.floor(Math.random() * 1000) + 10,
      })
    }

    return alerts
  }

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Mapa de Queimadas</h1>
              <p className="text-muted-foreground mt-2">Visualize focos de queimadas em todo o território brasileiro</p>
            </div>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filtros
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Filtrar Dados</h4>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Select value={selectedState} onValueChange={setSelectedState}>
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Selecione um estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os estados</SelectItem>
                          <SelectItem value="am">Amazonas</SelectItem>
                          <SelectItem value="pa">Pará</SelectItem>
                          <SelectItem value="mt">Mato Grosso</SelectItem>
                          <SelectItem value="go">Goiás</SelectItem>
                          <SelectItem value="mg">Minas Gerais</SelectItem>
                          <SelectItem value="sp">São Paulo</SelectItem>
                          <SelectItem value="pr">Paraná</SelectItem>
                          <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                          <SelectItem value="ba">Bahia</SelectItem>
                          <SelectItem value="pe">Pernambuco</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="period">Período</Label>
                      <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                        <SelectTrigger id="period">
                          <SelectValue placeholder="Selecione um período" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24h">Últimas 24 horas</SelectItem>
                          <SelectItem value="7d">Últimos 7 dias</SelectItem>
                          <SelectItem value="30d">Últimos 30 dias</SelectItem>
                          <SelectItem value="90d">Últimos 90 dias</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Intensidade do Foco</Label>
                      <Slider
                        value={intensityRange}
                        onValueChange={setIntensityRange}
                        min={0}
                        max={100}
                        step={1}
                        className="my-4"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Baixa</span>
                        <span>Alta</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Tipo de Alerta</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          id="verified"
                          checked={showVerified}
                          onCheckedChange={(checked) => setShowVerified(checked as boolean)}
                        />
                        <Label htmlFor="verified" className="text-sm font-normal">
                          Alertas verificados
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="reported"
                          checked={showReported}
                          onCheckedChange={(checked) => setShowReported(checked as boolean)}
                        />
                        <Label htmlFor="reported" className="text-sm font-normal">
                          Alertas reportados por usuários
                        </Label>
                      </div>
                    </div>
                    <Button className="w-full">Aplicar Filtros</Button>
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    Camadas
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Camadas do Mapa</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="layer-fire" defaultChecked />
                        <Label htmlFor="layer-fire" className="text-sm font-normal">
                          Focos de queimadas
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="layer-risk" defaultChecked />
                        <Label htmlFor="layer-risk" className="text-sm font-normal">
                          Áreas de risco
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="layer-satellite" />
                        <Label htmlFor="layer-satellite" className="text-sm font-normal">
                          Imagem de satélite
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="layer-temperature" />
                        <Label htmlFor="layer-temperature" className="text-sm font-normal">
                          Temperatura
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="layer-wind" />
                        <Label htmlFor="layer-wind" className="text-sm font-normal">
                          Direção do vento
                        </Label>
                      </div>
                    </div>
                    <Button className="w-full">Aplicar Camadas</Button>
                  </div>
                </PopoverContent>
              </Popover>
              <Button variant="outline" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Ajuda
              </Button>
            </div>
          </div>

          <FireRiskAlert />

          <Card className="mb-8">
            <CardHeader className="pb-2">
              <CardTitle>Mapa de Focos de Queimadas</CardTitle>
              <CardDescription>
                Visualização de focos ativos no período de{" "}
                {selectedPeriod === "24h"
                  ? "24 horas"
                  : selectedPeriod === "7d"
                    ? "7 dias"
                    : selectedPeriod === "30d"
                      ? "30 dias"
                      : "90 dias"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[400px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>
                    <p className="text-muted-foreground">Carregando mapa...</p>
                  </div>
                </div>
              ) : (
                <FireMap alerts={fireAlerts} />
              )}
            </CardContent>
          </Card>

          <Tabs defaultValue="list">
            <TabsList className="grid grid-cols-2 w-full md:w-[400px] mb-6">
              <TabsTrigger value="list">Lista de Focos</TabsTrigger>
              <TabsTrigger value="stats">Estatísticas</TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <Card>
                <CardHeader>
                  <CardTitle>Focos de Queimadas Ativos</CardTitle>
                  <CardDescription>{fireAlerts.length} focos detectados no período selecionado</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <AlertTitle>Atenção</AlertTitle>
                      <AlertDescription>
                        Os dados apresentados são atualizados a cada 3 horas. Última atualização: hoje às 14:30.
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {fireAlerts.slice(0, 6).map((alert) => (
                        <Card key={alert.id} className="overflow-hidden hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Flame
                                  className={`h-4 w-4 ${alert.riskLevel === "Extremo" ? "text-red-500" : alert.riskLevel === "Alto" ? "text-orange-500" : alert.riskLevel === "Médio" ? "text-yellow-500" : "text-green-500"}`}
                                />
                                {alert.location}
                              </CardTitle>
                            </div>
                            <CardDescription>{alert.state}</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-4">
                            <div className="text-sm">
                              <div className="flex justify-between mb-1">
                                <span className="text-muted-foreground">Coordenadas:</span>
                                <span>
                                  {alert.coordinates.lat.toFixed(4)}, {alert.coordinates.lng.toFixed(4)}
                                </span>
                              </div>
                              <div className="flex justify-between mb-1">
                                <span className="text-muted-foreground">Área afetada:</span>
                                <span>{alert.area} hectares</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Nível de risco:</span>
                                <span
                                  className={`font-medium ${alert.riskLevel === "Extremo" ? "text-red-500" : alert.riskLevel === "Alto" ? "text-orange-500" : alert.riskLevel === "Médio" ? "text-yellow-500" : "text-green-500"}`}
                                >
                                  {alert.riskLevel}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="flex justify-center">
                      <Button variant="outline">Ver Todos os Focos</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas de Queimadas</CardTitle>
                  <CardDescription>Análise comparativa de focos de queimadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Total de Focos</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">{fireAlerts.length}</div>
                          <p className="text-sm text-muted-foreground mt-1">
                            <span className="text-green-600">↓ 12%</span> em relação ao período anterior
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Área Afetada</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">
                            {fireAlerts.reduce((sum, alert) => sum + alert.area, 0).toLocaleString()} ha
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            <span className="text-red-600">↑ 8%</span> em relação ao período anterior
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Risco Médio</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">Médio</div>
                          <p className="text-sm text-muted-foreground mt-1">Baseado em condições climáticas atuais</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Botão "Ver Relatório Completo" removido */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}
