import { Leaf, Shield, Globe, BarChart3, MapPin, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col pt-16">
        <section className="bg-gradient-to-br from-green-800 to-green-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                Sistema Inteligente de Monitoramento Ambiental com Reporte Geolocalizado e Indicadores de Impacto
                Sustentável
              </h1>
              <p className="text-lg text-green-100">
                Conheça a proposta do EarthSentinel para um futuro mais sustentável e consciente
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Sobre o EarthSentinel</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  O <strong>EarthSentinel</strong> é uma plataforma inovadora de monitoramento ambiental que combina
                  tecnologia de ponta, dados em tempo real e participação cidadã para criar um sistema abrangente de
                  proteção ao meio ambiente brasileiro.
                </p>
                <p>
                  Desenvolvido com foco na preservação dos diversos biomas brasileiros, o EarthSentinel utiliza dados de
                  satélites, estações meteorológicas e reportes de usuários para criar um ecossistema de informações
                  ambientais precisas e atualizadas.
                </p>
                <p>
                  Nossa missão é democratizar o acesso a dados ambientais, promover a conscientização sobre questões
                  climáticas e facilitar ações rápidas para combater incêndios florestais e outras ameaças ao meio
                  ambiente.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Pilares do Sistema</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                      <Globe className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Monitoramento Inteligente</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Integração de múltiplas fontes de dados ambientais, incluindo satélites, estações meteorológicas e
                      APIs públicas para fornecer informações precisas e atualizadas sobre condições climáticas,
                      queimadas e níveis de carbono.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                      <MapPin className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Reporte Geolocalizado</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Sistema de participação cidadã que permite aos usuários reportar focos de queimadas e outros
                      incidentes ambientais com precisão geográfica, utilizando a geolocalização do dispositivo e
                      complementando os dados oficiais.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                      <BarChart3 className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Indicadores de Impacto</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Métricas e visualizações que quantificam o impacto ambiental das ações de monitoramento e reporte,
                      incluindo estimativas de CO₂ evitado e áreas preservadas, criando um sistema de feedback positivo
                      para os usuários.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Funcionalidades Principais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Sistema de Alerta de Queimadas</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Monitoramento em tempo real de focos de incêndio em todo o território brasileiro, com alertas
                    visuais baseados em níveis de risco e visualização em mapa interativo.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Monitoramento de Carbono</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Acompanhamento de emissões e captura de carbono por região, com visualizações gráficas e indicadores
                    de tendência para conscientização sobre mudanças climáticas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Reporte Cidadão</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Interface intuitiva para que usuários reportem focos de queimadas, com captura automática de
                    geolocalização, upload de imagens e descrição detalhada do incidente.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Gamificação Ambiental</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Sistema de conquistas e métricas de impacto que incentiva a participação contínua dos usuários,
                    quantificando sua contribuição para a preservação ambiental.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Impacto e Benefícios</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  O EarthSentinel não é apenas uma plataforma de monitoramento, mas um ecossistema completo que gera
                  impactos positivos em múltiplas dimensões:
                </p>
                <ul>
                  <li>
                    <strong>Ambiental:</strong> Detecção precoce de queimadas, reduzindo danos a ecossistemas e
                    diminuindo emissões de CO₂.
                  </li>
                  <li>
                    <strong>Social:</strong> Engajamento cidadão na proteção ambiental, criando uma rede de
                    monitoramento colaborativo.
                  </li>
                  <li>
                    <strong>Educacional:</strong> Conscientização sobre questões ambientais através de dados acessíveis
                    e visualizações intuitivas.
                  </li>
                  <li>
                    <strong>Governamental:</strong> Fornecimento de dados complementares para órgãos ambientais,
                    auxiliando na tomada de decisões e alocação de recursos.
                  </li>
                </ul>
                <p>
                  Ao integrar tecnologia, dados científicos e participação cidadã, o EarthSentinel cria um ciclo
                  virtuoso de proteção ambiental, onde cada reporte e interação contribui para um Brasil mais
                  sustentável e resiliente às mudanças climáticas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-green-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Junte-se ao EarthSentinel</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Faça parte desta iniciativa de monitoramento ambiental e contribua para a preservação do meio ambiente
              brasileiro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/cadastro"
                className="bg-white text-green-700 hover:bg-green-100 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Criar uma conta
              </a>
              <a
                href="/mapa"
                className="bg-green-600 text-white hover:bg-green-500 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Explorar o mapa
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
