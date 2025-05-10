"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useStateStore } from "@/lib/state-store"
import { cn } from "@/lib/utils"

const brazilianStates = [
  { value: "all", label: "Todo o Brasil", flag: "🇧🇷" },
  { value: "ac", label: "Acre", flag: "🏳️" },
  { value: "al", label: "Alagoas", flag: "🏳️" },
  { value: "ap", label: "Amapá", flag: "🏳️" },
  { value: "am", label: "Amazonas", flag: "🏳️" },
  { value: "ba", label: "Bahia", flag: "🏳️" },
  { value: "ce", label: "Ceará", flag: "🏳️" },
  { value: "df", label: "Distrito Federal", flag: "🏳️" },
  { value: "es", label: "Espírito Santo", flag: "🏳️" },
  { value: "go", label: "Goiás", flag: "🏳️" },
  { value: "ma", label: "Maranhão", flag: "🏳️" },
  { value: "mt", label: "Mato Grosso", flag: "🏳️" },
  { value: "ms", label: "Mato Grosso do Sul", flag: "🏳️" },
  { value: "mg", label: "Minas Gerais", flag: "🏳️" },
  { value: "pa", label: "Pará", flag: "🏳️" },
  { value: "pb", label: "Paraíba", flag: "🏳️" },
  { value: "pr", label: "Paraná", flag: "🏳️" },
  { value: "pe", label: "Pernambuco", flag: "🏳️" },
  { value: "pi", label: "Piauí", flag: "🏳️" },
  { value: "rj", label: "Rio de Janeiro", flag: "🏳️" },
  { value: "rn", label: "Rio Grande do Norte", flag: "🏳️" },
  { value: "rs", label: "Rio Grande do Sul", flag: "🏳️" },
  { value: "ro", label: "Rondônia", flag: "🏳️" },
  { value: "rr", label: "Roraima", flag: "🏳️" },
  { value: "sc", label: "Santa Catarina", flag: "🏳️" },
  { value: "sp", label: "São Paulo", flag: "🏳️" },
  { value: "se", label: "Sergipe", flag: "🏳️" },
  { value: "to", label: "Tocantins", flag: "🏳️" },
]

export default function StateSelector() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { selectedState, setSelectedState } = useStateStore()

  const currentState = brazilianStates.find((state) => state.value === selectedState) || brazilianStates[0]

  const handleStateChange = (value: string) => {
    setLoading(true)
    setSelectedState(value)
    setOpen(false)

    // Simula o carregamento de dados
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }

  useEffect(() => {
    // Inicializa o estado com um breve carregamento
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-md flex items-center justify-center z-10">
          <div className="h-5 w-5 rounded-full border-2 border-green-600 border-t-transparent animate-spin"></div>
        </div>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full md:w-[250px] justify-between", loading && "opacity-80")}
            disabled={loading}
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">{currentState.flag}</span>
              {currentState.label}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full md:w-[250px] p-0">
          <Command>
            <CommandInput placeholder="Buscar estado..." />
            <CommandList>
              <CommandEmpty>Nenhum estado encontrado.</CommandEmpty>
              <CommandGroup>
                {brazilianStates.map((state) => (
                  <CommandItem key={state.value} value={state.value} onSelect={handleStateChange}>
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-lg">{state.flag}</span>
                      <span>{state.label}</span>
                      <Check
                        className={`ml-auto h-4 w-4 ${selectedState === state.value ? "opacity-100" : "opacity-0"}`}
                      />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
