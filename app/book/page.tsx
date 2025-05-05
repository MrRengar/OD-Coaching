"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CalendarIcon } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const services = [
  {
    id: "kariyer-gelistirme",
    name: "Kariyer Geliştirme Koçluğu",
    price: 1000,
  },
  {
    id: "yasam-koçlugu",
    name: "Yaşam Koçluğu",
    price: 850,
  },
  {
    id: "ogrenci-koçlugu",
    name: "Öğrenci Koçluğu",
    price: 600,
  },
  {
    id: "takim-koçlugu",
    name: "Takım Koçluğu",
    price: 1500,
  },
  {
    id: "grup-calismalari",
    name: "Grup Çalışmaları",
    price: 450,
  },
  {
    id: "zihinsel-performans",
    name: "Zihinsel Performans",
    price: 800,
  },
]

const timeSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

const formSchema = z.object({
  name: z.string().min(2, {
    message: "İsim en az 2 karakter olmalıdır.",
  }),
  email: z.string().email({
    message: "Lütfen geçerli bir e-posta adresi girin.",
  }),
  phone: z.string().min(10, {
    message: "Lütfen geçerli bir telefon numarası girin.",
  }),
  service: z.string({
    required_error: "Lütfen bir hizmet seçin.",
  }),
  date: z.date({
    required_error: "Lütfen bir tarih seçin.",
  }),
  time: z.string({
    required_error: "Lütfen bir saat dilimi seçin.",
  }),
})

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const serviceParam = searchParams.get("service")

  const [step, setStep] = useState(1)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: serviceParam || "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    router.push("/book/confirmation")
  }

  const selectedService = services.find((service) => service.name === form.watch("service"))

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <img src="/images/logo.png" alt="OD Academy&Coaching Logo" className="h-8 w-auto" />
            <span>OD Koçluk</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-12">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center mb-8">
            <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Ana Sayfaya Dön
            </Link>
          </div>

          <div className="space-y-2 text-center mb-8">
            <h1 className="text-3xl font-bold">Seansınızı Planlayın</h1>
            <p className="text-muted-foreground">Randevunuzu planlamak için hizmet, tarih ve saat seçin</p>
          </div>

          <div className="flex justify-between mb-8">
            <div className={cn("flex flex-col items-center", step >= 1 ? "text-emerald-700" : "text-muted-foreground")}>
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2",
                  step >= 1 ? "border-emerald-700 bg-emerald-50" : "border-muted",
                )}
              >
                1
              </div>
              <span className="text-xs">Hizmet</span>
            </div>
            <div className={cn("flex-1 border-t my-4 mx-2", step >= 2 ? "border-teal-600" : "border-muted")} />
            <div className={cn("flex flex-col items-center", step >= 2 ? "text-emerald-700" : "text-muted-foreground")}>
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2",
                  step >= 2 ? "border-emerald-700 bg-emerald-50" : "border-muted",
                )}
              >
                2
              </div>
              <span className="text-xs">Tarih & Saat</span>
            </div>
            <div className={cn("flex-1 border-t my-4 mx-2", step >= 3 ? "border-teal-600" : "border-muted")} />
            <div className={cn("flex flex-col items-center", step >= 3 ? "text-emerald-700" : "text-muted-foreground")}>
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2",
                  step >= 3 ? "border-emerald-700 bg-emerald-50" : "border-muted",
                )}
              >
                3
              </div>
              <span className="text-xs">Bilgiler</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && "Hizmet Seçin"}
                {step === 2 && "Tarih ve Saat Seçin"}
                {step === 3 && "Kişisel Bilgileriniz"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Rezervasyon yapmak istediğiniz hizmet türünü seçin"}
                {step === 2 && "Randevunuz için uygun bir tarih ve saat seçin"}
                {step === 3 && "Rezervasyonunuzu tamamlamak için bilgilerinizi girin"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {step === 1 && (
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hizmet</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Bir hizmet seçin" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {services.map((service) => (
                                  <SelectItem key={service.id} value={service.name}>
                                    {service.name} - ₺{service.price}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>İhtiyacınız olan koçluk türünü seçin</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Tarih</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP", { locale: tr })
                                    ) : (
                                      <span>Bir tarih seçin</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                                  initialFocus
                                  locale={tr}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>Randevunuz için bir hafta içi günü seçin</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Saat</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Bir saat dilimi seçin" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>Uygun bir saat dilimi seçin</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {step === 3 && (
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ad Soyad</FormLabel>
                            <FormControl>
                              <Input placeholder="Ahmet Yılmaz" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-posta</FormLabel>
                            <FormControl>
                              <Input placeholder="ahmet.yilmaz@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefon Numarası</FormLabel>
                            <FormControl>
                              <Input placeholder="(0555) 123 45 67" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {selectedService && form.watch("date") && form.watch("time") && (
                        <div className="mt-6 space-y-4">
                          <Separator />
                          <div className="space-y-2">
                            <h3 className="font-medium">Rezervasyon Özeti</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="text-muted-foreground">Hizmet:</div>
                              <div>{selectedService.name}</div>
                              <div className="text-muted-foreground">Tarih:</div>
                              <div>{form.watch("date") ? format(form.watch("date"), "PPP", { locale: tr }) : ""}</div>
                              <div className="text-muted-foreground">Saat:</div>
                              <div>{form.watch("time")}</div>
                              <div className="text-muted-foreground">Ücret:</div>
                              <div>₺{selectedService.price}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    {step > 1 ? (
                      <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                        Önceki
                      </Button>
                    ) : (
                      <div></div>
                    )}

                    {step < 3 ? (
                      <Button
                        type="button"
                        onClick={() => {
                          if (step === 1) {
                            form.trigger("service").then((isValid) => {
                              if (isValid) setStep(2)
                            })
                          } else if (step === 2) {
                            form.trigger(["date", "time"]).then((isValid) => {
                              if (isValid) setStep(3)
                            })
                          }
                        }}
                      >
                        Sonraki
                      </Button>
                    ) : (
                      <Button type="submit">Rezervasyonu Tamamla</Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="border-t bg-gray-50">
        <div className="container py-6 text-center text-sm text-gray-500">
          <p>© 2025 OD Koçluk. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  )
}
