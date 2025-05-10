"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Globe, LogIn, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import Logo from "@/components/logo"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navItems = [
    { href: "/", label: "Início" },
    { href: "/mapa", label: "Mapa" },
    { href: "/sobre", label: "Sobre" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-8 w-8" />
              <span
                className={cn(
                  "font-bold text-xl transition-colors",
                  isScrolled || pathname !== "/" ? "text-green-700 dark:text-green-400" : "text-white",
                )}
              >
                EarthSentinel
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-medium transition-colors hover:text-green-600 dark:hover:text-green-400",
                  isScrolled || pathname !== "/"
                    ? "text-gray-700 dark:text-gray-200"
                    : "text-white hover:text-white/80",
                  pathname === item.href && "text-green-600 dark:text-green-400",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={cn(
                "rounded-full",
                isScrolled || pathname !== "/" ? "text-gray-700 dark:text-gray-200" : "text-white",
              )}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Alternar tema</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className={cn(
                "rounded-full hidden md:flex",
                isScrolled || pathname !== "/" ? "text-gray-700 dark:text-gray-200" : "text-white",
              )}
            >
              <Link href="/mapa">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Mapa global</span>
              </Link>
            </Button>

            <Button
              asChild
              className={cn(
                "hidden md:flex",
                !isScrolled && pathname === "/"
                  ? "bg-green-800 hover:bg-green-900 text-white border-green-700"
                  : "bg-green-700 hover:bg-green-800 text-white",
              )}
            >
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Entrar
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className={cn(
                "md:hidden",
                isScrolled || pathname !== "/" ? "text-gray-700 dark:text-gray-200" : "text-white",
              )}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "py-2 font-medium transition-colors hover:text-green-600 dark:hover:text-green-400",
                    pathname === item.href ? "text-green-600 dark:text-green-400" : "text-gray-700 dark:text-gray-200",
                  )}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/login"
                className="py-2 font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
                onClick={closeMobileMenu}
              >
                Entrar
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
