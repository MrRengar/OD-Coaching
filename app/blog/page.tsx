import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// Blog yazıları için yeni veriler
const blogPosts = [
  {
    id: 1,
    title: "Duygusuz Nesil Mitosu Üzerine Eleştirel Bir İnceleme",
    excerpt:
      "Modern gençliğin 'duygusuz' olarak etiketlenmesine dair yaygın söylemlerin sosyolojik ve psikolojik bir analizi.",
    date: "15 Nisan 2025",
    author: "Ozan Doğan",
    slug: "duygusuz-nesil-mitosu",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "BEN YAPARIM",
    excerpt:
      "Öğrencilerin 'ben yaparım' algısının gelişmesi, öz güvenlerinin ve içsel motivasyonlarının güçlenmesiyle doğrudan ilişkilidir.",
    date: "10 Nisan 2025",
    author: "Ozan Doğan",
    slug: "ben-yaparim",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "TÜRKİYE'DEKİ EĞİTİM SİSTEMİNİN İŞLEVSİZLİĞİ: SORUNLAR ve ÇÖZÜM ÖNERİLERİ",
    excerpt: "Türkiye'de eğitim sisteminin karşılaştığı sorunlar ve bu sorunlara yönelik kapsamlı çözüm önerileri.",
    date: "5 Nisan 2025",
    author: "Ozan Doğan",
    slug: "turkiyedeki-egitim-sisteminin-islevsizligi",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "Başarı Mitleri: Hepimiz Aynı Yoldan mı Geçiyoruz?",
    excerpt:
      "Başarıya ulaşmak için tek bir yol olmadığını ve herkesin kendi yolunu çizebileceğini anlatan bir inceleme.",
    date: "1 Nisan 2025",
    author: "Ozan Doğan",
    slug: "basari-mitleri",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-sand-200 dark:border-slate-800 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <img src="/images/logo.png" alt="OD Academy&Coaching Logo" className="h-8 w-auto" />
            <span className="gradient-text">OD Academy&Coaching</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-sand-500 dark:hover:text-sand-400 transition-colors"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium hover:text-sand-500 dark:hover:text-sand-400 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-sand-500 dark:hover:text-sand-400 transition-colors"
            >
              İletişim
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-12">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Ana Sayfaya Dön
          </Link>
        </div>

        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold">Blog</h1>
          <p className="text-muted-foreground">Uzman koçumuzdan içgörüler ve tavsiyeler</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="blog-card flex flex-col bg-white dark:bg-slate-800 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:rotate-1 dark:hover:bg-slate-800/80 card-shine"
            >
              <div className="p-2">
                <div className="bg-sand-400 dark:bg-sand-600 text-white px-3 py-1 text-xs font-medium inline-block mb-2">
                  {post.date}
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center text-sm mt-2">
                    <User className="h-3 w-3 mr-1" />
                    {post.author}
                    <span className="mx-2">•</span>
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.date}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3 flex-1">
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="blog-card-footer">
                <Button
                  asChild
                  variant="outline"
                  className="text-sand-500 dark:text-sand-400 hover:text-sand-600 dark:hover:text-sand-300 border-sand-200 dark:border-slate-700"
                >
                  <Link href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                    Devamını Oku
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <footer className="border-t border-sand-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="container py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 OD Koçluk. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  )
}
