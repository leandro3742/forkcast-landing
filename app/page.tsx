"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  CheckCircle,
  TrendingUp,
  DollarSign,
  Scale,
  Brain,
  Users,
  FileSpreadsheet,
  MessageSquare,
  Shield,
  Globe,
} from "lucide-react"

const currencyRates = {
  USD: 1,
  UYU: 43.5,
  ARS: 1050,
}

const pricingTiers = {
  starter: { usd: 0, name: "Starter" },
  pro: { usd: 49, name: "Pro" },
  business: { usd: 149, name: "Business" },
  enterprise: { usd: null, name: "Enterprise" },
}

export default function ForkCastLanding() {
  const [currency, setCurrency] = useState<"USD" | "UYU" | "ARS">("USD")
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")
  const [language, setLanguage] = useState<"es" | "en">("es")
  const [demoOpen, setDemoOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  const formatPrice = (usdPrice: number | null) => {
    if (usdPrice === null) return null
    const rate = currencyRates[currency]
    const price = usdPrice * rate
    const annualDiscount = billingPeriod === "annual" ? 0.83 : 1 // 2 months free
    const finalPrice = Math.round(price * annualDiscount)

    const symbols = { USD: "$", UYU: "$U", ARS: "$" }
    return `${symbols[currency]}${finalPrice.toLocaleString()}`
  }

  const copy = {
    es: {
      hero: {
        title: "Compras más inteligentes para tu restaurante, basadas en tus ventas reales.",
        subtitle:
          "ForkCast analiza ventas históricas, stock actual y recetas para prever lo que vas a necesitar, evitar sobrecompras y armar órdenes de compra por proveedor.",
        primaryCta: "Empezar prueba gratis",
        secondaryCta: "Ver demo de 3 minutos",
        badges: ["Inventario-consciente", "Listas por proveedor", "Conversión automática de unidades"],
      },
      benefits: [
        { title: "Comprá exactamente lo que necesitás", desc: "Pronósticos basados en ventas reales y recetas." },
        {
          title: "Comparar proveedores, transparentemente",
          desc: "Promedios por categoría y mejor precio por vendedor.",
        },
        {
          title: "Se acabaron los dolores de cabeza con unidades",
          desc: "ml↔l, g↔kg y tamaños de paquete manejados automáticamente.",
        },
      ],
      howItWorks: {
        title: "Cómo funciona",
        steps: [
          {
            title: "Conectá tus datos",
            desc: "Subí ventas (Excel/CSV), exportación de inventario y listas de proveedores.",
          },
          { title: "ForkCast analiza", desc: "La IA reconcilia unidades, mapea productos y aprende tus patrones." },
          {
            title: "Comprá con confianza",
            desc: "Obtené una lista de compras lista para enviar por proveedor, con cantidades sugeridas y sustituciones.",
          },
        ],
      },
    },
    en: {
      hero: {
        title: "Smarter restaurant purchasing, powered by your real sales.",
        subtitle:
          "ForkCast analyzes past sales, current stock, and recipes to forecast needs, avoid over-buying, and auto-build purchase orders by supplier.",
        primaryCta: "Start free trial",
        secondaryCta: "See 3-min demo",
        badges: ["Works with CSV/Excel", "Inventory-aware", "Restaurant-first"],
      },
      benefits: [
        { title: "Buy exactly what you need", desc: "Forecast from real sales + recipes." },
        { title: "Compare suppliers, transparently", desc: "Category averages & best price per vendor." },
        { title: "No more unit headaches", desc: "ml↔l, g↔kg, and pack sizes handled automatically." },
      ],
      howItWorks: {
        title: "How it works",
        steps: [
          { title: "Connect your data", desc: "Upload sales (Excel/CSV), inventory export, and supplier lists." },
          { title: "ForkCast analyzes", desc: "AI reconciles units, maps products, and learns your patterns." },
          {
            title: "Purchase with confidence",
            desc: "Get a ready-to-send purchase list by supplier, with suggested quantities and substitutions.",
          },
        ],
      },
    },
  }

  const currentCopy = copy[language]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">ForkCast</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-blue-600">
              Características
            </a>
            <a href="#pricing" className="text-slate-600 dark:text-slate-300 hover:text-blue-600">
              Precios
            </a>
            <a href="#faq" className="text-slate-600 dark:text-slate-300 hover:text-blue-600">
              FAQ
            </a>
            <Select value={language} onValueChange={(value: "es" | "en") => setLanguage(value)}>
              <SelectTrigger className="w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">ES</SelectItem>
                <SelectItem value="en">EN</SelectItem>
              </SelectContent>
            </Select>
          </nav>

          <Button className="bg-blue-600 hover:bg-blue-700">{currentCopy.hero.primaryCta}</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {currentCopy.hero.badges.map((badge, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
              >
                {badge}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 text-balance">
            {currentCopy.hero.title}
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto text-pretty">
            {currentCopy.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
              {currentCopy.hero.primaryCta}
            </Button>
            <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                  {currentCopy.hero.secondaryCta}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Demo de ForkCast</DialogTitle>
                  <DialogDescription>
                    Mirá cómo ForkCast puede transformar las compras de tu restaurante
                  </DialogDescription>
                </DialogHeader>
                <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <p className="text-slate-500">Video demo placeholder - 3 minutos</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Value Bullets */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {currentCopy.benefits.map((benefit, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                  {i === 0 && <TrendingUp className="w-6 h-6 text-green-600" />}
                  {i === 1 && <DollarSign className="w-6 h-6 text-green-600" />}
                  {i === 2 && <Scale className="w-6 h-6 text-green-600" />}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-16">
            {currentCopy.howItWorks.title}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {currentCopy.howItWorks.steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{i + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-16">
            Características principales
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "Sugerencias de compra con IA",
                desc: "Algoritmos inteligentes analizan patrones de venta",
              },
              {
                icon: DollarSign,
                title: "Comparación de precios",
                desc: "Promedios por categoría y mejor precio por vendedor",
              },
              { icon: Scale, title: "Conversiones de unidades", desc: "ml↔l, g↔kg y tamaños de paquete automáticos" },
              {
                icon: FileSpreadsheet,
                title: "Planificación consciente de recetas",
                desc: "Campo de ingredientes JSON soportado",
              },
              {
                icon: Users,
                title: "Importación de catálogos",
                desc: "CSV/Excel para ventas, inventario y proveedores",
              },
              { icon: MessageSquare, title: "Asistente de chat", desc: "Preguntas rápidas: '¿qué debería comprar?'" },
              { icon: Globe, title: "Multi-moneda", desc: "USD, UYU, ARS con conversión automática" },
              { icon: Shield, title: "Notificaciones por email", desc: "Integración con Resend para alertas" },
            ].map((feature, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="w-8 h-8 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-8">
            Precios transparentes
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Select value={currency} onValueChange={(value: "USD" | "UYU" | "ARS") => setCurrency(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="UYU">UYU ($U)</SelectItem>
                <SelectItem value="ARS">ARS ($)</SelectItem>
              </SelectContent>
            </Select>

            <Tabs value={billingPeriod} onValueChange={(value: "monthly" | "annual") => setBillingPeriod(value)}>
              <TabsList>
                <TabsTrigger value="monthly">Mensual</TabsTrigger>
                <TabsTrigger value="annual">Anual (ahorrá 2 meses)</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(pricingTiers).map(([key, tier]) => (
              <Card key={key} className={`relative ${key === "pro" ? "border-blue-500 shadow-lg" : ""}`}>
                {key === "pro" && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">Más popular</Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {tier.usd === null ? "Contactanos" : tier.usd === 0 ? "Gratis" : formatPrice(tier.usd)}
                    {tier.usd !== null && tier.usd > 0 && (
                      <span className="text-sm font-normal text-slate-500">
                        /{billingPeriod === "monthly" ? "mes" : "año"}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {key === "starter" &&
                      [
                        "Hasta 1 ubicación",
                        "Importaciones manuales",
                        "Sugerencias IA limitadas",
                        "Soporte comunitario",
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}

                    {key === "pro" &&
                      [
                        "Hasta 3 ubicaciones",
                        "Sugerencias IA completas",
                        "Comparación de proveedores",
                        "Export email de órdenes",
                        "Soporte prioritario",
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}

                    {key === "business" &&
                      [
                        "Hasta 10 ubicaciones",
                        "Analytics avanzados",
                        "Multi-moneda",
                        "Acceso basado en roles",
                        "Onboarding incluido",
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}

                    {key === "enterprise" &&
                      ["SLAs personalizados", "SSO", "Success manager dedicado", "Integraciones custom"].map(
                        (feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ),
                      )}
                  </ul>

                  <Button
                    className={`w-full ${key === "pro" ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    variant={key === "pro" ? "default" : "outline"}
                  >
                    {tier.usd === null ? "Contactar ventas" : "Empezar prueba gratis"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-sm text-slate-500 mt-8">
            * Precios aproximados. Impuestos no incluidos. Conversión de moneda estimativa.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-16">
            Lo que dicen nuestros clientes
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                role: "Dueña, Parrilla El Asador",
                location: "Montevideo, UY",
                quote:
                  "ForkCast me ayudó a reducir el desperdicio en un 30%. Ahora compro exactamente lo que necesito.",
                avatar: "MG",
              },
              {
                name: "Carlos Mendoza",
                role: "Chef Ejecutivo, Bistró Central",
                location: "Buenos Aires, AR",
                quote: "La comparación de proveedores me ahorra horas cada semana. Los precios son transparentes.",
                avatar: "CM",
              },
              {
                name: "Ana Rodríguez",
                role: "Gerente, Café Luna",
                location: "Punta del Este, UY",
                quote: "Las conversiones automáticas de unidades son un salvavidas. No más errores de cálculo.",
                avatar: "AR",
              },
            ].map((testimonial, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <p className="text-slate-600 dark:text-slate-300 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-sm text-slate-500">{testimonial.role}</p>
                      <p className="text-sm text-slate-400">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-16">
            Preguntas frecuentes
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "¿Cómo calcula ForkCast las sugerencias?",
                a: "ForkCast analiza tus ventas históricas, stock actual y recetas para crear pronósticos precisos. Usa algoritmos de machine learning que mejoran con el tiempo.",
              },
              {
                q: "¿Puedo importar catálogos y listas de precios de mis proveedores?",
                a: "Sí, ForkCast soporta importación de archivos CSV y Excel con catálogos de proveedores, incluyendo precios y disponibilidad.",
              },
              {
                q: "¿Cómo funcionan las conversiones de unidades?",
                a: "El sistema maneja automáticamente conversiones entre ml↔l, g↔kg, unidades individuales y tamaños de paquete. También reconcilia diferentes nombres de productos.",
              },
              {
                q: "¿Soportan múltiples ubicaciones y monedas?",
                a: "Sí, desde el plan Pro podés manejar múltiples ubicaciones. Soportamos USD, UYU y ARS con conversión automática.",
              },
              {
                q: "¿Mis datos están seguros?",
                a: "Absolutamente. Todos los datos están encriptados en tránsito y en reposo. Usamos acceso de menor privilegio y podés exportar o eliminar tus datos cuando quieras.",
              },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Empezá a comprar más inteligente hoy</h2>
          <p className="text-xl text-blue-100 mb-8">
            Probá ForkCast gratis por 14 días. No necesitás tarjeta de crédito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8">
              Empezar prueba gratis
            </Button>
            <Dialog open={contactOpen} onOpenChange={setContactOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 bg-transparent"
                >
                  Agendar demo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agendar una demo</DialogTitle>
                  <DialogDescription>
                    Contanos sobre tu restaurante y te mostramos cómo ForkCast puede ayudarte
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Nombre completo" />
                  <Input placeholder="Email" type="email" />
                  <Input placeholder="Nombre del restaurante" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="País" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uy">Uruguay</SelectItem>
                      <SelectItem value="ar">Argentina</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Número de ubicaciones" type="number" />
                  <Textarea placeholder="Contanos sobre tus desafíos actuales con las compras..." />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Enviar solicitud</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ForkCast</span>
              </div>
              <p className="text-slate-400 mb-4">
                Compras inteligentes para restaurantes independientes en Argentina y Uruguay.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#features" className="hover:text-white">
                    Características
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white">
                    Precios
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentación
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Sobre nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Carreras
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Política de privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Términos de servicio
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-slate-800" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400">© 2025 ForkCast. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Select value={language} onValueChange={(value: "es" | "en") => setLanguage(value)}>
                <SelectTrigger className="w-20 bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">🇦🇷 ES</SelectItem>
                  <SelectItem value="en">🇺🇸 EN</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
