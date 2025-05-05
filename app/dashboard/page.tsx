"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Edit, Trash2, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { ThemeToggle } from "@/components/theme-toggle"

// Yaklaşan randevular için örnek veriler
const upcomingAppointments = [
  {
    id: "1",
    service: "Kariyer Geliştirme Koçluğu",
    date: new Date("2025-04-22T10:00:00"),
    coach: "Ahmet Yılmaz",
    price: 1000,
  },
  {
    id: "2",
    service: "Yaşam Koçluğu",
    date: new Date("2025-04-28T14:00:00"),
    coach: "Ayşe Demir",
    price: 850,
  },
]

// Geçmiş randevular için örnek veriler
const pastAppointments = [
  {
    id: "3",
    service: "Kariyer Geliştirme Koçluğu",
    date: new Date("2025-03-15T11:00:00"),
    coach: "Ahmet Yılmaz",
    price: 1000,
  },
  {
    id: "4",
    service: "Öğrenci Koçluğu",
    date: new Date("2025-03-05T13:00:00"),
    coach: "Mehmet Kaya",
    price: 600,
  },
  {
    id: "5",
    service: "Yaşam Koçluğu",
    date: new Date("2025-02-20T15:00:00"),
    coach: "Zeynep Çelik",
    price: 850,
  },
]

export default function DashboardPage() {
  const [appointments, setAppointments] = useState(upcomingAppointments)
  const [appointmentToCancel, setAppointmentToCancel] = useState<string | null>(null)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id))
    setShowCancelDialog(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <img src="/images/logo.png" alt="OD Academy&Coaching Logo" className="h-8 w-auto" />
            <span>OD Koçluk</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              Ana Sayfa
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
              Kontrol Paneli
            </Link>
            <Link href="/profile" className="text-sm font-medium hover:underline underline-offset-4">
              Profil
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="sm">
              Çıkış Yap
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kontrol Paneliniz</h1>
            <p className="text-muted-foreground">Randevularınızı ve rezervasyonlarınızı yönetin</p>
          </div>
          <Button asChild>
            <Link href="/book">
              <Plus className="mr-2 h-4 w-4" /> Yeni Seans Planla
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Yaklaşan</TabsTrigger>
            <TabsTrigger value="past">Geçmiş</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {appointments.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {appointments.map((appointment) => (
                  <Card
                    key={appointment.id}
                    className="transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:rotate-1 dark:hover:bg-card/80"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle>{appointment.service}</CardTitle>
                      <CardDescription>Koç: {appointment.coach}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {format(appointment.date, "EEEE, d MMMM yyyy", { locale: tr })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{format(appointment.date, "HH:mm")}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm font-medium">₺{appointment.price}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/book?edit=${appointment.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Yeniden Planla
                        </Link>
                      </Button>
                      <Dialog
                        open={showCancelDialog && appointmentToCancel === appointment.id}
                        onOpenChange={setShowCancelDialog}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                            onClick={() => setAppointmentToCancel(appointment.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            İptal Et
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Randevu İptali</DialogTitle>
                            <DialogDescription>
                              Bu randevuyu iptal etmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="gap-2 sm:gap-0">
                            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                              Randevuyu Koru
                            </Button>
                            <Button variant="destructive" onClick={() => handleCancelAppointment(appointment.id)}>
                              Evet, İptal Et
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Yaklaşan Randevu Yok</CardTitle>
                  <CardDescription>Planlanmış yaklaşan randevunuz bulunmamaktadır.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Koçluk veya eğitiminize başlamak için yeni bir seans planlayın.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/book">
                      <Plus className="mr-2 h-4 w-4" /> Yeni Seans Planla
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {pastAppointments.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pastAppointments.map((appointment) => (
                  <Card
                    key={appointment.id}
                    className="transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:rotate-1 dark:hover:bg-card/80"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle>{appointment.service}</CardTitle>
                      <CardDescription>Koç: {appointment.coach}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {format(appointment.date, "EEEE, d MMMM yyyy", { locale: tr })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{format(appointment.date, "HH:mm")}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm font-medium">₺{appointment.price}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/book?service=${appointment.service}`}>Tekrar Planla</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Geçmiş Randevu Yok</CardTitle>
                  <CardDescription>Geçmiş randevunuz bulunmamaktadır.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Seansları tamamladığınızda burada görüneceklerdir.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <footer className="border-t bg-stone-50 dark:bg-stone-950/10">
        <div className="container py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 OD Koçluk. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  )
}
