"use client"

import type React from "react"

import { useState } from "react"
import { Flame, Calendar, MapPin, Search, Filter, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Report {
  id: string
  date: string
  location: string
  coordinates: string
  status: "pending" | "verified" | "resolved"
  intensity: "baixa" | "media" | "alta" | "extrema"
  description: string
  hasImages: boolean
}

const mockReports: Report[] = [
  {
    id: "REP-001",
    date: "10/05/2023, 14:32",
    location: "Parque Nacional da Chapada dos Veadeiros, GO",
    coordinates: "-14.1347, -47.8292",
    status: "verified",
    intensity: "media",
    description:
      "Foco de incêndio próximo à trilha principal. Chamas visíveis a aproximadamente 500m da entrada do parque.",
    hasImages: true,
  },
  {
    id: "REP-002",
    date: "22/04/2023, 09:15",
    location: "Reserva Florestal, MT",
    coordinates: "-15.6013, -56.0978",
    status: "resolved",
    intensity: "alta",
    description: "Grande área em chamas próxima à rodovia. Fumaça densa visível a quilômetros de distância.",
    hasImages: true,
  },
  {
    id: "REP-003",
    date: "05/04/2023, 16:45",
    location: "Área de Preservação, AM",
    coordinates: "-3.1190, -60.0217",
    status: "pending",
    intensity: "baixa",
    description: "Pequeno foco de fumaça observado na mata. Sem chamas visíveis, mas área com vegetação seca.",
    hasImages: false,
  },
  {
    id: "REP-004",
    date: "28/03/2023, 11:20",
    location: "Fazenda Santa Luzia, MT",
    coordinates: "-12.6819, -55.7892",
    status: "verified",
    intensity: "extrema",
    description: "Incêndio de grandes proporções em área de pastagem, se aproximando de área de preservação.",
    hasImages: true,
  },
  {
    id: "REP-005",
    date: "15/03/2023, 08:30",
    location: "Margem do Rio Araguaia, TO",
    coordinates: "-10.5478, -50.6358",
    status: "resolved",
    intensity: "media",
    description: "Foco de incêndio em vegetação ribeirinha. Área de difícil acesso.",
    hasImages: false,
  },
  {
    id: "REP-006",
    date: "02/03/2023, 17:10",
    location: "Serra do Cipó, MG",
    coordinates: "-19.3722, -43.5889",
    status: "resolved",
    intensity: "alta",
    description: "Incêndio em área de campo rupestre. Ventos fortes espalhando as chamas rapidamente.",
    hasImages: true,
  },
  {
    id: "REP-007",
    date: "18/02/2023, 13:25",
    location: "Parque Estadual, SP",
    coordinates: "-23.5505, -46.6333",
    status: "pending",
    intensity: "baixa",
    description: "Pequeno foco de incêndio próximo à área de camping. Possivelmente causado por fogueira mal apagada.",
    hasImages: true,
  },
  {
    id: "REP-008",
    date: "05/02/2023, 10:40",
    location: "Área Rural, PR",
    coordinates: "-25.4284, -49.2733",
    status: "verified",
    intensity: "media",
    description: "Incêndio em área de plantação, se aproximando de fragmento de mata nativa.",
    hasImages: false,
  },
  {
    id: "REP-009",
    date: "20/01/2023, 15:55",
    location: "Reserva Indígena, RO",
    coordinates: "-8.7619, -63.9039",
    status: "resolved",
    intensity: "extrema",
    description: "Grande incêndio florestal ameaçando aldeia indígena. Situação crítica.",
    hasImages: true,
  },
  {
    id: "REP-010",
    date: "08/01/2023, 12:15",
    location: "Área de Conservação, BA",
    coordinates: "-12.9714, -38.5014",
    status: "verified",
    intensity: "alta",
    description: "Incêndio em área de caatinga. Vegetação extremamente seca facilitando a propagação.",
    hasImages: true,
  },
  {
    id: "REP-011",
    date: "01/01/2023, 00:30",
    location: "Praia do Forte, BA",
    coordinates: "-12.5797, -38.0189",
    status: "resolved",
    intensity: "baixa",
    description: "Pequeno incêndio causado por fogos de artifício de Ano Novo. Contido rapidamente.",
    hasImages: false,
  },
  {
    id: "REP-012",
    date: "15/12/2022, 14:20",
    location: "Parque Nacional da Tijuca, RJ",
    coordinates: "-22.9629, -43.2096",
    status: "resolved",
    intensity: "media",
    description: "Incêndio em encosta de difícil acesso. Helicópteros foram utilizados no combate.",
    hasImages: true,
  },
]

export default function UserReportsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [filteredReports, setFilteredReports] = useState<Report[]>(mockReports)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    filterReports(searchTerm, statusFilter)
  }

  const filterReports = (search: string, status: string) => {
    let filtered = [...mockReports]

    if (search) {
      filtered = filtered.filter(
        (report) =>
          report.location.toLowerCase().includes(search.toLowerCase()) ||
          report.id.toLowerCase().includes(search.toLowerCase()) ||
          report.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (status !== "all") {
      filtered = filtered.filter((report) => report.status === status)
    }

    setFilteredReports(filtered)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100"
          >
            Pendente
          </Badge>
        )
      case "verified":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100"
          >
            Verificado
          </Badge>
        )
      case "resolved":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
          >
            Resolvido
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  const getIntensityBadge = (intensity: string) => {
    switch (intensity) {
      case "baixa":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">
            Baixa
          </Badge>
        )
      case "media":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100">
            Média
          </Badge>
        )
      case "alta":
        return (
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-100">
            Alta
          </Badge>
        )
      case "extrema":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100">Extrema</Badge>
        )
      default:
        return <Badge>Desconhecida</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meus Relatórios</CardTitle>
        <CardDescription>Histórico de todos os focos de queimada reportados por você</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por localização ou ID..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button type="submit">Buscar</Button>
            </form>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value)
                  filterReports(searchTerm, value)
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="verified">Verificado</SelectItem>
                  <SelectItem value="resolved">Resolvido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">Todos ({filteredReports.length})</TabsTrigger>
              <TabsTrigger value="pending">
                Pendentes ({filteredReports.filter((r) => r.status === "pending").length})
              </TabsTrigger>
              <TabsTrigger value="verified">
                Verificados ({filteredReports.filter((r) => r.status === "verified").length})
              </TabsTrigger>
              <TabsTrigger value="resolved">
                Resolvidos ({filteredReports.filter((r) => r.status === "resolved").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <Card key={report.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Flame
                                className={`h-5 w-5 ${report.intensity === "extrema" ? "text-red-500" : report.intensity === "alta" ? "text-orange-500" : report.intensity === "media" ? "text-yellow-500" : "text-green-500"}`}
                              />
                              {report.id}
                            </CardTitle>
                            <CardDescription>{report.location}</CardDescription>
                          </div>
                          {getStatusBadge(report.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{report.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{report.coordinates}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Intensidade:</span>
                            {getIntensityBadge(report.intensity)}
                          </div>
                          <p className="text-sm line-clamp-2">{report.description}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-2 flex flex-col items-center justify-center py-12 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Nenhum relatório encontrado</h3>
                    <p className="text-muted-foreground mt-2">Tente ajustar seus filtros ou termos de busca.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredReports.filter((r) => r.status === "pending").length > 0 ? (
                  filteredReports
                    .filter((r) => r.status === "pending")
                    .map((report) => (
                      <Card key={report.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <Flame
                                  className={`h-5 w-5 ${report.intensity === "extrema" ? "text-red-500" : report.intensity === "alta" ? "text-orange-500" : report.intensity === "media" ? "text-yellow-500" : "text-green-500"}`}
                                />
                                {report.id}
                              </CardTitle>
                              <CardDescription>{report.location}</CardDescription>
                            </div>
                            {getStatusBadge(report.status)}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{report.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{report.coordinates}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Intensidade:</span>
                              {getIntensityBadge(report.intensity)}
                            </div>
                            <p className="text-sm line-clamp-2">{report.description}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <div className="col-span-2 flex flex-col items-center justify-center py-12 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Nenhum relatório pendente</h3>
                    <p className="text-muted-foreground mt-2">Todos os seus relatórios já foram processados.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="verified" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredReports.filter((r) => r.status === "verified").length > 0 ? (
                  filteredReports
                    .filter((r) => r.status === "verified")
                    .map((report) => (
                      <Card key={report.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <Flame
                                  className={`h-5 w-5 ${report.intensity === "extrema" ? "text-red-500" : report.intensity === "alta" ? "text-orange-500" : report.intensity === "media" ? "text-yellow-500" : "text-green-500"}`}
                                />
                                {report.id}
                              </CardTitle>
                              <CardDescription>{report.location}</CardDescription>
                            </div>
                            {getStatusBadge(report.status)}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{report.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{report.coordinates}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Intensidade:</span>
                              {getIntensityBadge(report.intensity)}
                            </div>
                            <p className="text-sm line-clamp-2">{report.description}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <div className="col-span-2 flex flex-col items-center justify-center py-12 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Nenhum relatório verificado</h3>
                    <p className="text-muted-foreground mt-2">Seus relatórios ainda estão sendo analisados.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="resolved" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredReports.filter((r) => r.status === "resolved").length > 0 ? (
                  filteredReports
                    .filter((r) => r.status === "resolved")
                    .map((report) => (
                      <Card key={report.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <Flame
                                  className={`h-5 w-5 ${report.intensity === "extrema" ? "text-red-500" : report.intensity === "alta" ? "text-orange-500" : report.intensity === "media" ? "text-yellow-500" : "text-green-500"}`}
                                />
                                {report.id}
                              </CardTitle>
                              <CardDescription>{report.location}</CardDescription>
                            </div>
                            {getStatusBadge(report.status)}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{report.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{report.coordinates}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Intensidade:</span>
                              {getIntensityBadge(report.intensity)}
                            </div>
                            <p className="text-sm line-clamp-2">{report.description}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <div className="col-span-2 flex flex-col items-center justify-center py-12 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Nenhum relatório resolvido</h3>
                    <p className="text-muted-foreground mt-2">
                      Seus relatórios ainda estão em processo de verificação ou resolução.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
