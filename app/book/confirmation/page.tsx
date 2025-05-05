import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, ArrowLeft } from "lucide-react"

export default function ConfirmationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <img src="/images/logo.png" alt="OD Academy&Coaching Logo" className="h-8 w-auto" />
            <span>OD Koçluk</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 container py-12">
        <div className="mx-auto max-w-md">
          <div className="flex items-center mb-8">
            <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Ana Sayfaya Dön
            </Link>
          </div>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-emerald-700" />
              </div>
              <CardTitle className="text-2xl">Rezervasyon Onaylandı!</CardTitle>
              <CardDescription>Randevunuz başarıyla planlandı</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-muted p-6">
                <div className="flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-emerald-700 mr-2" />
                  <h3 className="font-medium">Randevu Detayları</h3>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-left text-muted-foreground">Hizmet:</div>
                  <div className="text-right font-medium">Kariyer Geliştirme Koçluğu</div>
                  <div className="text-left text-muted-foreground">Tarih:</div>
                  <div className="text-right font-medium">22 Nisan 2025</div>
                  <div className="text-left text-muted-foreground">Saat:</div>
                  <div className="text-right font-medium">10:00</div>
                  <div className="text-left text-muted-foreground">Ücret:</div>
                  <div className="text-right font-medium">₺1.000,00</div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Tüm detaylarla birlikte bir onay e-postası e-posta adresinize gönderilmiştir.
                </p>
                <p className="text-sm text-muted-foreground">
                  Lütfen planlanan randevu saatinizden 10 dakika önce geliniz.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full" asChild>
                <Link href="/dashboard">Randevularınızı Yönetin</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/">Ana Sayfaya Dön</Link>
              </Button>
            </CardFooter>
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
