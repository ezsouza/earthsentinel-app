import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative pt-20 bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
        style={{ backgroundImage: "url('/placeholder.svg?height=800&width=1600')" }}
      />
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Monitoramento Ambiental Inteligente</h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Dados de temperatura, previsão do tempo, alertas de queimadas e informações sobre carbono para todos os
            estados brasileiros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-green-800 hover:bg-green-900 text-white">
              <Link href="#monitoring">Explorar dados</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-green-700 border-green-500 text-white hover:bg-green-800">
              <Link href="/cadastro" className="flex items-center">
                Criar conta <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-background to-transparent"></div>
    </section>
  )
}
