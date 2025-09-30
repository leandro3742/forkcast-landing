"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select"
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
const CALENDLY_URL = "https://calendly.com/agustina-forkcast/30min?month=2025-10&date=2025-10-01"

const pricingTiers = {
  starter: { usdMonthly: 0, usdAnnual: 0, name: "Starter" },
  pro: { usdMonthly: 40, usdAnnual: 490, name: "Pro" }, // Ajustado a 40 USD mensual como solicitado
  enterprise: { usdMonthly: null, usdAnnual: null, name: "Enterprise" },
}

export default function ForkCastLanding() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")
  const [demoOpen, setDemoOpen] = useState(false)
  const [calendlyOpen, setCalendlyOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string>("") // Para guardar qué plan seleccionó
  
  // Estado para el formulario de registro
  const [registerForm, setRegisterForm] = useState({
    businessName: '',
    fullName: '',
    email: '',
    taxId: '',
    location: ''
  })
  
  // Estados para el formulario de proveedores
  const [supplierForm, setSupplierForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    productType: '',
    coverageArea: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Función para manejar el envío del formulario de proveedores
  const handleSupplierSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validación básica
    if (!supplierForm.companyName || !supplierForm.contactName || !supplierForm.email) {
      setSubmitError('Por favor completa los campos obligatorios: Empresa, Nombre y Email')
      return
    }
    
    setIsSubmitting(true)
    setSubmitError('')
    
    try {
      // Enviar todo a través del endpoint API del servidor
      // El servidor se encarga de enviar emails tanto al proveedor como a los administradores
      const apiResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplierForm),
      })
      
      const data = await apiResponse.json()
      
      if (!apiResponse.ok) {
        throw new Error(data.error || data.message || 'Error al enviar el formulario')
      }
      
      // Éxito
      setSubmitSuccess(true)
      setSupplierForm({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        productType: '',
        coverageArea: '',
        message: ''
      })
    } catch (error) {
      console.error('Error al enviar el formulario:', error)
      setSubmitError(error instanceof Error ? error.message : 'Error al enviar el formulario')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSupplierForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const copy = {
    es: {
      hero: {
        title: "Compras más inteligentes para tu restaurante, basadas en tus ventas reales.",
        subtitle:
          "ForkCast analiza ventas históricas, stock actual y recetas para prever lo que vas a necesitar, evitar sobrecompras y armar órdenes de compra por proveedor.",
        primaryCta: "Agendar Llamada",
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
  }

  const currentCopy = copy.es

  // Componente de diálogo para Calendly
  const CalendlyDialog = () => (
    <Dialog open={calendlyOpen} onOpenChange={setCalendlyOpen}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Agenda una demo con nosotros</DialogTitle>
          <DialogDescription>
            Selecciona una fecha y hora que te convenga para conocer más sobre ForkCast
          </DialogDescription>
        </DialogHeader>
        <div className="h-full w-full">
          <iframe
            src={`${CALENDLY_URL}?embed=true&hideCookieBanner=true`}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Calendly Scheduling"
            className="min-h-[500px]"
          />
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-stone-600/95 backdrop-blur border-b border-stone-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="ForkCast" className="h-8 w-auto" />
            <span className="text-xl font-bold text-white">ForkCast</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-stone-200 hover:text-amber-400">
              Características
            </a>
            <a href="#pricing" className="text-stone-200 hover:text-amber-400">
              Precios
            </a>
            <a href="#proveedores" className="text-stone-200 hover:text-amber-400">
              Proveedores
            </a>
            <a href="#faq" className="text-stone-200 hover:text-amber-400">
              FAQ
            </a>
          </nav>

          <Button
            className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-semibold"
            onClick={() => setCalendlyOpen(true)}
          >
            {currentCopy.hero.primaryCta}
          </Button>
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
                className="bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300"
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
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-semibold text-lg px-8"
              onClick={() => setCalendlyOpen(true)}
            >
              {currentCopy.hero.primaryCta}
            </Button>
            <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-stone-300 text-stone-700 hover:bg-stone-50 bg-transparent"
                >
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
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mb-4">
                  {i === 0 && <TrendingUp className="w-6 h-6 text-amber-600" />}
                  {i === 1 && <DollarSign className="w-6 h-6 text-amber-600" />}
                  {i === 2 && <Scale className="w-6 h-6 text-amber-600" />}
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
                <div className="w-16 h-16 bg-stone-600 rounded-full flex items-center justify-center mx-auto mb-6">
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
                  <feature.icon className="w-8 h-8 text-stone-600 mb-2" />
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
            <Tabs value={billingPeriod} onValueChange={(value) => setBillingPeriod(value as "monthly" | "annual")}>
              <TabsList>
                <TabsTrigger value="monthly">Mensual</TabsTrigger>
                <TabsTrigger value="annual">Anual (ahorrá 2 meses)</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
            {Object.entries(pricingTiers).map(([key, tier]) => (
              <Card key={key} className={`relative ${key === "pro" ? "border-amber-500 shadow-lg" : ""}`}>
                {key === "pro" && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-stone-900">
                    Más popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  {tier.usdMonthly === null ? (
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">Contactanos</div>
                  ) : tier.usdMonthly === 0 ? (
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">Gratis</div>
                  ) : billingPeriod === "monthly" ? (
                    <div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">
                        ${tier.usdMonthly}<span className="text-sm font-normal text-slate-500">/mes</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">
                        ${tier.usdMonthly}<span className="text-sm font-normal text-slate-500">/mes</span>
                      </div>
                      <div className="text-base text-slate-500 mt-1">
                        ${tier.usdAnnual} total anual
                      </div>
                    </div>
                  )}
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
                    className={`w-full ${
                      key === "pro" ? "bg-amber-500 hover:bg-amber-600 text-stone-900 font-semibold" : ""
                    }`}
                    variant={key === "pro" ? "default" : "outline"}
                    onClick={() => {
                      setSelectedPlan(key)
                      setSignupOpen(true)
                    }}
                  >
                    {tier.usdMonthly === null ? "Contactar ventas" : "Empezar prueba gratis"}
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

      {/* Suppliers Section */}
      <section id="proveedores" className="py-20 bg-stone-600">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Sos proveedor de restaurantes?</h2>
            <p className="text-xl text-stone-100 mb-8 max-w-3xl mx-auto">
              Sumate a ForkCast y conectá directamente con restaurantes que buscan tus productos. Aumentá tu visibilidad
              y simplificá el proceso de ventas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-stone-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Acceso directo a restaurantes</h3>
                    <p className="text-stone-100">
                      Conectá con cientos de restaurantes que ya usan ForkCast para sus compras diarias.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-stone-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Aumentá tus ventas</h3>
                    <p className="text-stone-100">
                      Los restaurantes ven tus productos cuando más los necesitan, en el momento exacto de compra.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileSpreadsheet className="w-6 h-6 text-stone-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Gestión simplificada</h3>
                    <p className="text-stone-100">
                      Subí tu catálogo una vez y mantené precios actualizados automáticamente.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                Se parte de nuestra comunidad
              </h3>
              <p className="text-white dark:text-slate-300 mb-6 text-center bg-stone-600 rounded-lg p-4">
                No tenemos planes de pago para proveedores. Queremos conocerte y entender cómo podemos trabajar juntos.
              </p>

              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">¡Gracias por contactarnos!</h4>
                  <p className="text-slate-600 mb-6">
                    Hemos recibido tu información y nos pondremos en contacto contigo en las próximas 24 horas.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitSuccess(false)}
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSupplierSubmit} className="space-y-4">
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
                      {submitError}
                    </div>
                  )}
                  
                  <Input 
                    placeholder="Nombre de la empresa *" 
                    name="companyName"
                    value={supplierForm.companyName}
                    onChange={handleInputChange}
                    required
                  />
                  <Input 
                    placeholder="Tu nombre completo *" 
                    name="contactName"
                    value={supplierForm.contactName}
                    onChange={handleInputChange}
                    required
                  />
                  <Input 
                    placeholder="Email de contacto *" 
                    type="email" 
                    name="email"
                    value={supplierForm.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Input 
                    placeholder="Teléfono" 
                    name="phone"
                    value={supplierForm.phone}
                    onChange={handleInputChange}
                  />
                  <Select 
                    value={supplierForm.productType} 
                    onValueChange={(value) => handleInputChange({ target: { name: 'productType', value } } as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de productos que ofrecés" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="carnes">Carnes y embutidos</SelectItem>
                      <SelectItem value="lacteos">Lácteos</SelectItem>
                      <SelectItem value="verduras">Frutas y verduras</SelectItem>
                      <SelectItem value="bebidas">Bebidas</SelectItem>
                      <SelectItem value="panaderia">Panadería y pastelería</SelectItem>
                      <SelectItem value="condimentos">Condimentos y especias</SelectItem>
                      <SelectItem value="limpieza">Productos de limpieza</SelectItem>
                      <SelectItem value="equipamiento">Equipamiento y utensilios</SelectItem>
                      <SelectItem value="otros">Otros</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select 
                    value={supplierForm.coverageArea} 
                    onValueChange={(value) => handleInputChange({ target: { name: 'coverageArea', value } } as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Zona de cobertura" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="montevideo">Montevideo</SelectItem>
                      <SelectItem value="interior-uy">Interior de Uruguay</SelectItem>
                      <SelectItem value="buenos-aires">Buenos Aires</SelectItem>
                      <SelectItem value="interior-ar">Interior de Argentina</SelectItem>
                      <SelectItem value="ambos">Argentina y Uruguay</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea 
                    placeholder="Contanos sobre tu empresa y qué te interesa de ForkCast..." 
                    name="message"
                    value={supplierForm.message}
                    onChange={handleInputChange}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-stone-900 font-semibold text-lg py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar información'}
                  </Button>
                </form>
              )}

              <p className="text-sm text-slate-500 text-center mt-4">
                Te contactaremos en menos de 24 horas para coordinar una llamada
              </p>
            </div>
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

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col items-center">
            <div className="mb-6 text-center">
              <div className="flex items-center space-x-3 mb-4 justify-center">
                <img src="/logo.png" alt="ForkCast" className="h-10 w-auto" />
                <span className="text-xl font-bold">ForkCast</span>
              </div>
              <p className="text-slate-400 max-w-md">
                Compras inteligentes para restaurantes independientes en Argentina y Uruguay.
              </p>
            </div>
          </div>

          <Separator className="my-8 bg-slate-800" />

          <div className="flex flex-col justify-center items-center">
            <p className="text-slate-400">© 2025 ForkCast. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
      
      {/* Calendly Dialog */}
      <CalendlyDialog />

      {/* Signup Dialog */}
      <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Comienza tu prueba gratuita</DialogTitle>
            <DialogDescription>
              {selectedPlan === "starter" ? "Prueba gratuita - Plan Starter" : 
               selectedPlan === "pro" ? "Prueba gratuita - Plan Pro" : 
               selectedPlan === "enterprise" ? "Contacta con ventas - Plan Enterprise" : 
               "Completa tus datos para comenzar"}
            </DialogDescription>
          </DialogHeader>
          
          {!signupSuccess ? (
          <form className="space-y-4" onSubmit={async (e) => {
            e.preventDefault()
            setIsRegistering(true)
            
            try {
              // Enviar datos al endpoint de registro
              const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  ...registerForm,
                  planType: selectedPlan,
                  billingPeriod
                }),
              })
              
              const data = await response.json()
              
              if (!response.ok) {
                throw new Error(data.error || data.message || 'Error al registrar')
              }
              
              console.log('Registro exitoso:', data)
              // Si todo va bien, mostramos el éxito
              setSignupSuccess(true)
            } catch (error) {
              console.error('Error al registrar:', error)
              alert('Ha ocurrido un error. Por favor intenta nuevamente.')
            } finally {
              setIsRegistering(false)
            }
          }}>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <span className="block text-sm font-medium">Nombre de la empresa</span>
                <Input 
                  id="businessName" 
                  placeholder="Restaurante ABC" 
                  required 
                  value={registerForm.businessName}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, businessName: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <span className="block text-sm font-medium">Nombre completo</span>
                <Input 
                  id="fullName" 
                  placeholder="Tu nombre y apellido" 
                  required 
                  value={registerForm.fullName}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, fullName: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <span className="block text-sm font-medium">Email</span>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="tu@email.com" 
                  required 
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <span className="block text-sm font-medium">RUT / CUIT</span>
                <Input 
                  id="taxId" 
                  placeholder="12345678-9 o 20-12345678-9" 
                  required 
                  value={registerForm.taxId}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, taxId: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <span className="block text-sm font-medium">Ubicación de tu restaurante</span>
                <Select 
                  onValueChange={(value) => setRegisterForm(prev => ({ ...prev, location: value }))}
                  value={registerForm.location}
                >
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Selecciona ubicación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Uruguay</SelectLabel>
                      <SelectItem value="montevideo">Montevideo</SelectItem>
                      <SelectItem value="interior-uy">Interior de Uruguay</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Argentina</SelectLabel>
                      <SelectItem value="buenos-aires">Buenos Aires</SelectItem>
                      <SelectItem value="interior-ar">Interior de Argentina</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" type="button" onClick={() => setSignupOpen(false)} disabled={isRegistering}>Cancelar</Button>
              <Button 
                type="submit" 
                className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-semibold"
                disabled={isRegistering}
              >
                {isRegistering ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-stone-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </>
                ) : (
                  selectedPlan === "enterprise" ? "Enviar solicitud" : "Comenzar prueba gratuita"
                )}
              </Button>
            </div>
          </form>
          ) : (
          <div className="py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">¡Registro exitoso!</h3>
            <p className="text-gray-600 mb-6">
              {selectedPlan === "enterprise" 
                ? "Un representante de ventas se pondrá en contacto contigo pronto." 
                : "Hemos creado tu cuenta y enviado las instrucciones para acceder a tu prueba gratuita al email proporcionado."}
            </p>
            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-semibold w-full"
              onClick={() => {
                setSignupOpen(false)
                setSignupSuccess(false)
                setRegisterForm({
                  businessName: '',
                  fullName: '',
                  email: '',
                  taxId: '',
                  location: ''
                })
              }}
            >
              Continuar
            </Button>
          </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
