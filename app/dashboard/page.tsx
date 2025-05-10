"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FileText, AlertTriangle, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"
import ReportFireForm from "@/components/report-fire-form"
import UserReportsList from "@/components/user-reports-list"
import UserImpactPanel from "@/components/user-impact-panel"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Simulação de verificação de autenticação
    const checkAuth = setTimeout(() => {
      // Em um cenário real, verificaríamos se o usuário está autenticado
      // Se não estiver, redirecionamos para a página de login
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(checkAuth)
  }, [router])

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="flex min-h-screen flex-col pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center items-center h-[80vh]">
              <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>
                <p className="text-muted-foreground">Carregando painel...</p>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Painel do Usuário</h1>
              <p className="text-muted-foreground mt-2">Bem-vindo ao seu painel de monitoramento ambiental</p>
            </div>
            <Button onClick={() => router.push("/")}>Voltar para o Mapa</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  Relatórios Enviados
                </CardTitle>
                <CardDescription>Total de relatórios submetidos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-sm text-muted-foreground mt-1">Último relatório: 2 dias atrás</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Alertas Ativos
                </CardTitle>
                <CardDescription>Alertas de queimadas na sua região</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <p className="text-sm text-muted-foreground mt-1">Nível de risco: Moderado</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Impacto Ambiental
                </CardTitle>
                <CardDescription>Sua contribuição para o meio ambiente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">85%</div>
                <div className="mt-2">
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="report" className="w-full">
            <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-8">
              <TabsTrigger value="report">Reportar Queimada</TabsTrigger>
              <TabsTrigger value="reports">Meus Relatórios</TabsTrigger>
              <TabsTrigger value="impact">Meu Impacto</TabsTrigger>
            </TabsList>

            <TabsContent value="report" className="mt-0">
              <ReportFireForm />
            </TabsContent>

            <TabsContent value="reports" className="mt-0">
              <UserReportsList />
            </TabsContent>

            <TabsContent value="impact" className="mt-0">
              <UserImpactPanel />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}
