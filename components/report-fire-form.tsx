"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MapPin, Upload, Camera, X, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReportFireForm() {
  const [location, setLocation] = useState("")
  const [coordinates, setCoordinates] = useState<{ lat: number | null; lng: number | null }>({
    lat: null,
    lng: null,
  })
  const [description, setDescription] = useState("")
  const [intensity, setIntensity] = useState("")
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([])
  const { toast } = useToast()

  const handleGetLocation = () => {
    setIsGettingLocation(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCoordinates({ lat: latitude, lng: longitude })
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`)
          setIsGettingLocation(false)

          toast({
            title: "Localização obtida com sucesso",
            description: `Coordenadas: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          })
        },
        (error) => {
          console.error("Erro ao obter localização:", error)
          setIsGettingLocation(false)

          toast({
            variant: "destructive",
            title: "Erro ao obter localização",
            description: "Verifique se você permitiu o acesso à sua localização.",
          })
        },
      )
    } else {
      setIsGettingLocation(false)
      toast({
        variant: "destructive",
        title: "Geolocalização não suportada",
        description: "Seu navegador não suporta geolocalização.",
      })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)

      if (images.length + newFiles.length > 3) {
        toast({
          variant: "destructive",
          title: "Limite de imagens excedido",
          description: "Você pode enviar no máximo 3 imagens.",
        })
        return
      }

      setImages([...images, ...newFiles])

      // Criar previews das imagens
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
      setImagesPreviews([...imagesPreviews, ...newPreviews])
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    const newPreviews = [...imagesPreviews]

    // Liberar URL do objeto
    URL.revokeObjectURL(newPreviews[index])

    newImages.splice(index, 1)
    newPreviews.splice(index, 1)

    setImages(newImages)
    setImagesPreviews(newPreviews)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Relatório enviado com sucesso",
        description: "Obrigado por contribuir para o monitoramento ambiental.",
      })

      // Limpar formulário
      setLocation("")
      setCoordinates({ lat: null, lng: null })
      setDescription("")
      setIntensity("")
      setImages([])
      setImagesPreviews([])
    }, 2000)
  }

  // Limpar URLs de objetos ao desmontar o componente
  useEffect(() => {
    return () => {
      imagesPreviews.forEach((preview) => URL.revokeObjectURL(preview))
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reportar Foco de Queimada</CardTitle>
        <CardDescription>
          Preencha o formulário abaixo para reportar um foco de queimada. Suas informações ajudam a proteger o meio
          ambiente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Importante</AlertTitle>
              <AlertDescription>
                Reporte apenas focos de queimada que você observou pessoalmente. Informações falsas podem prejudicar as
                operações de combate a incêndios.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="location">Localização</Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Coordenadas ou endereço"
                  className="flex-1"
                  required
                />
                <Button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={isGettingLocation}
                  className="flex-shrink-0"
                >
                  {isGettingLocation ? (
                    <div className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin mr-2" />
                  ) : (
                    <MapPin className="h-4 w-4 mr-2" />
                  )}
                  Obter Localização
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Clique no botão para capturar automaticamente sua localização atual ou insira manualmente.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="intensity">Intensidade do Foco</Label>
              <Select value={intensity} onValueChange={setIntensity} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a intensidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa - Fumaça visível, sem chamas aparentes</SelectItem>
                  <SelectItem value="media">Média - Chamas visíveis, área pequena</SelectItem>
                  <SelectItem value="alta">Alta - Chamas grandes, área extensa</SelectItem>
                  <SelectItem value="extrema">Extrema - Fogo descontrolado, risco imediato</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o que você está observando, incluindo detalhes como tamanho aproximado da área, direção do vento, proximidade de áreas habitadas, etc."
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Imagens (opcional)</Label>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {imagesPreviews.map((preview, index) => (
                  <div key={index} className="relative rounded-md overflow-hidden h-24 bg-gray-100 dark:bg-gray-800">
                    <img
                      src={preview || "/placeholder.svg"}
                      alt={`Imagem ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                {images.length < 3 && (
                  <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md">
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
                    >
                      <Camera className="h-6 w-6 text-muted-foreground mb-1" />
                      <span className="text-xs text-muted-foreground">Adicionar</span>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        multiple
                      />
                    </label>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Você pode enviar até 3 imagens para ajudar na identificação do foco de queimada.
              </p>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
                <span>Enviando...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span>Enviar Alerta</span>
              </div>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-6">
        <p className="text-sm text-muted-foreground text-center max-w-md">
          Seus relatórios são fundamentais para o monitoramento ambiental e ajudam a prevenir danos maiores ao meio
          ambiente.
        </p>
      </CardFooter>
    </Card>
  )
}
