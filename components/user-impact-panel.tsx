"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Award, Leaf, AlertTriangle, BarChart3, TrendingUp, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const impactData = [
  { name: "Jan", reports: 1, co2: 5 },
  { name: "Fev", reports: 2, co2: 12 },
  { name: "Mar", reports: 3, co2: 18 },
  { name: "Abr", reports: 1, co2: 7 },
  { name: "Mai", reports: 2, co2: 15 },
  { name: "Jun", reports: 0, co2: 0 },
  { name: "Jul", reports: 1, co2: 8 },
  { name: "Ago", reports: 0, co2: 0 },
  { name: "Set", reports: 1, co2: 10 },
  { name: "Out", reports: 0, co2: 0 },
  { name: "Nov", reports: 1, co2: 9 },
  { name: "Dez", reports: 0, co2: 0 },
]

const badgesData = [
  {
    id: "badge-1",
    name: "Sentinela Iniciante",
    description: "Reportou seu primeiro foco de queimada",
    icon: <Shield className="h-6 w-6 text-green-600" />,
    unlocked: true,
  },
  {
    id: "badge-2",
    name: "Protetor da Floresta",
    description: "Reportou 5 focos de queimada",
    icon: <Leaf className="h-6 w-6 text-green-600" />,
    unlocked: true,
  },
  {
    id: "badge-3",
    name: "Guardião Ambiental",
    description: "Reportou 10 focos de queimada",
    icon: <Award className="h-6 w-6 text-green-600" />,
    unlocked: true,
  },
  {
    id: "badge-4",
    name: "Sentinela Experiente",
    description: "Reportou focos em 3 estados diferentes",
    icon: <AlertTriangle className="h-6 w-6 text-green-600" />,
    unlocked: false,
  },
  {
    id: "badge-5",
    name: "Analista Ambiental",
    description: "Reportou 5 focos verificados consecutivamente",
    icon: <BarChart3 className="h-6 w-6 text-green-600" />,
    unlocked: false,
  },
  {
    id: "badge-6",
    name: "Protetor Elite",
    description: "Contribuiu para evitar 100 toneladas de CO₂",
    icon: <TrendingUp className="h-6 w-6 text-green-600" />,
    unlocked: false,
  },
]

export default function UserImpactPanel() {
  const [progress, setProgress] = useState(0)
  const [totalReports, setTotalReports] = useState(0)
  const [totalCO2, setTotalCO2] = useState(0)

  useEffect(() => {
    // Calcula o total de relatórios e CO2 evitado
    const reports = impactData.reduce((sum, item) => sum + item.reports, 0)
    const co2 = impactData.reduce((sum, item) => sum + item.co2, 0)

    setTotalReports(reports)
    setTotalCO2(co2)

    // Animação do progresso
    const timer = setTimeout(() => setProgress(85), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Seu Impacto Ambiental</CardTitle>
          <CardDescription>Veja como suas contribuições estão ajudando a proteger o meio ambiente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-green-600" />
                    Total de Relatórios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalReports}</div>
                  <p className="text-sm text-muted-foreground mt-1">Focos de queimada reportados</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    CO₂ Evitado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalCO2} ton</div>
                  <p className="text-sm text-muted-foreground mt-1">Emissões evitadas estimadas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-600" />
                    Nível de Contribuição
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">Guardião</div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progresso para o próximo nível</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="chart">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="chart">Gráfico de Impacto</TabsTrigger>
                <TabsTrigger value="badges">Conquistas</TabsTrigger>
              </TabsList>

              <TabsContent value="chart" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Impacto Mensal</CardTitle>
                    <CardDescription>Relatórios enviados e CO₂ evitado estimado (em toneladas)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={impactData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" orientation="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.9)",
                              borderRadius: "6px",
                              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                              border: "none",
                            }}
                          />
                          <Legend />
                          <Bar yAxisId="left" dataKey="reports" name="Relatórios" fill="#22c55e" />
                          <Bar yAxisId="right" dataKey="co2" name="CO₂ Evitado (ton)" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="badges" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Suas Conquistas</CardTitle>
                    <CardDescription>Conquistas desbloqueadas por suas contribuições ambientais</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {badgesData.map((badge) => (
                        <Card key={badge.id} className={`overflow-hidden ${!badge.unlocked ? "opacity-50" : ""}`}>
                          <CardContent className="p-4">
                            <div className="flex flex-col items-center text-center">
                              <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
                                {badge.icon}
                              </div>
                              <h3 className="font-medium">{badge.name}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{badge.description}</p>
                              <Badge className="mt-3" variant={badge.unlocked ? "default" : "outline"}>
                                {badge.unlocked ? "Desbloqueado" : "Bloqueado"}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center border-t pt-4">
                    <Button variant="outline">Ver Todas as Conquistas</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
