import { Suspense } from "react"
import type { Metadata } from "next"
import Header from "@/components/header"
import StateSelector from "@/components/state-selector"
import WeatherSection from "@/components/weather-section"
import ForecastSection from "@/components/forecast-section"
import FireAlertSection from "@/components/fire-alert-section"
import CarbonSection from "@/components/carbon-section"
import FireRiskAlert from "@/components/fire-risk-alert"
import HeroSection from "@/components/hero-section"
import Footer from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { Shield, Leaf, Globe, AlertTriangle, BarChart3, TreePine, Building2, Scale } from "lucide-react"

export const metadata: Metadata = {
  title: "EarthSentinel — Monitoramento Ambiental Inteligente",
  description: "Plataforma de monitoramento ambiental para o Brasil com dados de clima, queimadas e carbono",
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <HeroSection />

      <section className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Painel de Monitoramento</h2>
            <p className="text-muted-foreground mt-2">Dados ambientais em tempo real para todo o Brasil</p>
          </div>
          <StateSelector />
        </div>

        <Suspense fallback={<FireRiskSkeleton />}>
          <FireRiskAlert />
        </Suspense>

        <Tabs defaultValue="weather" className="w-full mt-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="weather">Clima Atual</TabsTrigger>
            <TabsTrigger value="forecast">Previsão</TabsTrigger>
            <TabsTrigger value="fire">Alertas de Queimadas</TabsTrigger>
            <TabsTrigger value="carbon">Dados de Carbono</TabsTrigger>
          </TabsList>

          <TabsContent value="weather" className="mt-0">
            <Suspense fallback={<DashboardSkeleton />}>
              <WeatherSection />
            </Suspense>
          </TabsContent>

          <TabsContent value="forecast" className="mt-0">
            <Suspense fallback={<DashboardSkeleton />}>
              <ForecastSection />
            </Suspense>
          </TabsContent>

          <TabsContent value="fire" className="mt-0">
            <Suspense fallback={<DashboardSkeleton />}>
              <FireAlertSection />
            </Suspense>
          </TabsContent>

          <TabsContent value="carbon" className="mt-0">
            <Suspense fallback={<DashboardSkeleton />}>
              <CarbonSection />
            </Suspense>
          </TabsContent>
        </Tabs>
      </section>

      {/* Seção "Por que monitorar dados ambientais?" com design melhorado */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Por que monitorar dados ambientais?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              O monitoramento ambiental é essencial para a preservação do meio ambiente e para a tomada de decisões
              informadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Prevenção de Desastres</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Alertas antecipados de condições climáticas extremas e queimadas podem salvar vidas, reduzir danos à
                  biodiversidade e minimizar perdas econômicas.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-1 bg-gradient-to-r from-blue-400 to-cyan-500"></div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <Scale className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Políticas Públicas</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Dados precisos auxiliam na criação de políticas públicas eficazes para proteção ambiental, adaptação
                  climática e desenvolvimento sustentável.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Conscientização</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Informações acessíveis sobre o meio ambiente promovem a conscientização e engajamento da população em
                  práticas sustentáveis e conservação ambiental.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nova seção sobre Riscos de Queimadas */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold tracking-tight mb-6">Riscos e Impactos das Queimadas</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Perda de Biodiversidade</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Queimadas destroem habitats naturais, causando a morte de animais e plantas, muitas vezes de
                      espécies endêmicas e ameaçadas de extinção.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Emissão de Gases de Efeito Estufa</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Incêndios florestais liberam grandes quantidades de CO₂ e outros gases, contribuindo
                      significativamente para as mudanças climáticas.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Impactos na Saúde Pública</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      A fumaça das queimadas causa problemas respiratórios, agrava condições cardíacas e aumenta a
                      incidência de doenças em populações próximas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src="/placeholder.svg?height=400&width=600&text=Impacto+das+Queimadas"
                  alt="Impacto das queimadas na floresta"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nova seção sobre Acordos da ONU */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Acordos Internacionais de Sustentabilidade</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compromissos globais que orientam as ações de preservação ambiental e combate às mudanças climáticas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden border-0 shadow-md">
              <div className="h-2 bg-green-600"></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Acordo de Paris</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Tratado internacional adotado em 2015 que visa reduzir as emissões de gases de efeito estufa e limitar
                  o aumento da temperatura global.
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium">Meta:</span> Limitar o aquecimento global a bem menos de 2°C,
                  preferencialmente a 1,5°C, em comparação aos níveis pré-industriais.
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden border-0 shadow-md">
              <div className="h-2 bg-blue-600"></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Agenda 2030</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Plano de ação global com 17 Objetivos de Desenvolvimento Sustentável (ODS) que buscam erradicar a
                  pobreza e proteger o planeta.
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium">Destaque:</span> ODS 13 (Ação Contra a Mudança Global do Clima) e ODS 15
                  (Vida Terrestre).
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden border-0 shadow-md">
              <div className="h-2 bg-amber-600"></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <TreePine className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Convenção da Biodiversidade</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Tratado internacional que visa a conservação da diversidade biológica, o uso sustentável de seus
                  componentes e a repartição justa dos benefícios.
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium">Meta:</span> Proteger 30% das áreas terrestres e marinhas globais até
                  2030.
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Nova seção sobre Empresas Comprometidas */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Empresas Comprometidas com a Sustentabilidade</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Organizações que lideram iniciativas de preservação ambiental e desenvolvimento sustentável.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Pacto Global da ONU</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Iniciativa corporativa internacional</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Mais de 15.000 empresas em todo o mundo comprometidas com os princípios de direitos humanos, trabalho,
                meio ambiente e anticorrupção, alinhados aos Objetivos de Desenvolvimento Sustentável.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Science Based Targets</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Metas baseadas na ciência</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Iniciativa que mobiliza empresas a estabelecerem metas de redução de emissões baseadas na ciência
                climática, em linha com o Acordo de Paris para limitar o aquecimento global.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">RE100</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">100% energia renovável</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Iniciativa global que reúne empresas influentes comprometidas com o uso de 100% de energia renovável em
                suas operações, acelerando a transição para uma economia de baixo carbono.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <TreePine className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Coalizão Brasil Clima, Florestas e Agricultura</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Iniciativa multissetorial brasileira</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Movimento que reúne mais de 200 empresas, associações, organizações da sociedade civil e indivíduos
                interessados em contribuir para a promoção de uma nova economia de baixo carbono no Brasil.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-5 w-1/2 mb-2" />
            <Skeleton className="h-4 w-4/5 mb-4" />
            <Skeleton className="h-[120px] w-full" />
          </Card>
        ))}
    </div>
  )
}

function FireRiskSkeleton() {
  return <Skeleton className="h-16 w-full mt-4 mb-6" />
}
