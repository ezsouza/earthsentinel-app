import Link from "next/link"
import { MapPin, Mail, Phone, Globe, Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from "@/components/logo"

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo className="h-8 w-8" />
              <h3 className="text-xl font-bold">EarthSentinel</h3>
            </div>
            <p className="text-green-100 mb-4">Monitoramento ambiental inteligente para um futuro sustentável.</p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-green-100 hover:text-white hover:bg-green-800">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-green-100 hover:text-white hover:bg-green-800">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-green-100 hover:text-white hover:bg-green-800">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Website</span>
              </Button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-green-100 hover:text-white transition-colors">
                  Dados Climáticos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-green-100 hover:text-white transition-colors">
                  Previsão do Tempo
                </Link>
              </li>
              <li>
                <Link href="#" className="text-green-100 hover:text-white transition-colors">
                  Alertas de Queimadas
                </Link>
              </li>
              <li>
                <Link href="#" className="text-green-100 hover:text-white transition-colors">
                  Dados de Carbono
                </Link>
              </li>
              <li>
                <Link href="#" className="text-green-100 hover:text-white transition-colors">
                  API para Desenvolvedores
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-300" />
                <span>São Paulo, SP - Brasil</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-300" />
                <a
                  href="mailto:contato@earthsentinel.com.br"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  contato@earthsentinel.com.br
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-300" />
                <a href="tel:+551140028922" className="text-green-100 hover:text-white transition-colors">
                  +55 (11) 4002-8922
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Inscreva-se</h4>
            <p className="text-green-100 mb-4">Receba atualizações e alertas ambientais.</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Seu e-mail"
                className="bg-green-800 border-green-700 text-white placeholder:text-green-300"
              />
              <Button variant="secondary">Enviar</Button>
            </div>
          </div>
        </div>
        <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-100">
          <p>&copy; {new Date().getFullYear()} EarthSentinel. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
