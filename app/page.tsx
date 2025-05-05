"use client"

import Link from "next/link"
import { Calendar, Clock, Users, Star, Shield, Heart, Zap, Phone, Mail } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"

const services = [
  {
    title: "Kariyer Koçluğu",
    description:
      "Kariyer planlaması, hedef belirleme ve profesyonel gelişim alanlarında danışmanlık sunuyorum. Her bireyin benzersiz yeteneklerini ve tutkularını keşfetmesine ve bunları kariyer hedeflerine ulaşmak için nasıl kullanabileceğini anlamasına yardımcı oluyorum.",
    icon: <Star className="h-10 w-10 text-sand-400" />,
  },
  {
    title: "Öğrenci Koçluğu",
    description:
      "Profesyonel bir öğrenci koçu olarak, öğrencilere akademik başarılarını ve kişisel gelişimlerini optimize etmeleri için kapsamlı destek sağlıyorum. Her öğrencinin benzersiz yeteneklerini ve hedeflerini dikkate alarak, bireysel koçluk seansları ve özelleştirilmiş stratejilerle onların en iyi performanslarını sergilemelerine yardımcı oluyorum.",
    icon: <Zap className="h-10 w-10 text-sand-400" />,
  },
  {
    title: "Takım Koçluğu",
    description:
      "Ekiplerin verimliliğini artırmak ve uyumlu bir çalışma ortamı yaratmak için çalışıyorum. Ekip üyelerinin iletişim becerilerini geliştirmelerine, çatışmaları etkili bir şekilde yönetmelerine ve ortak hedeflere ulaşmalarına yardımcı oluyorum.",
    icon: <Users className="h-10 w-10 text-sand-400" />,
  },
]

const features = [
  {
    title: "Kişiselleştirilmiş Yaklaşım",
    description: "Her danışanın benzersiz ihtiyaçlarına göre özelleştirilmiş koçluk programları",
    icon: <Heart className="h-8 w-8 text-sand-400" />,
  },
  {
    title: "Esnek Planlama",
    description: "Programınıza uygun zamanlarda seanslar planlayın",
    icon: <Calendar className="h-8 w-8 text-sand-400" />,
  },
  {
    title: "Uzman Koç",
    description: "Çeşitli alanlarda sertifikalı profesyonel ile çalışın",
    icon: <Shield className="h-8 w-8 text-sand-400" />,
  },
  {
    title: "7/24 Destek",
    description: "İhtiyaç duyduğunuzda yardım alın",
    icon: <Clock className="h-8 w-8 text-sand-400" />,
  },
]

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
    title: "TÜRKİYE'DEKİ EĞİTİM SİSTEMİNİN İŞLEVSİZLİĞİ",
    excerpt: "Türkiye'de eğitim sisteminin karşılaştığı sorunlar ve bu sorunlara yönelik kapsamlı çözüm önerileri.",
    date: "5 Nisan 2025",
    author: "Ozan Doğan",
    slug: "turkiyedeki-egitim-sisteminin-islevsizligi",
    image: "/placeholder.svg?height=200&width=400",
  },
]

// Scroll reveal fonksiyonu
function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
          }
        })
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    )

    const revealElements = document.querySelectorAll(".scroll-reveal")
    revealElements.forEach((el) => observer.observe(el))

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return null
}

export default function Home() {
  const scrollTextSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll opaklık efekti için
    const handleScroll = () => {
      if (!scrollTextSectionRef.current) return

      const scrollPosition = window.scrollY
      const sectionTop = scrollTextSectionRef.current.offsetTop
      const sectionHeight = scrollTextSectionRef.current.offsetHeight
      const windowHeight = window.innerHeight

      // Bölümün görünür olduğu scroll aralığını hesapla
      const startScroll = sectionTop - windowHeight
      const endScroll = sectionTop + sectionHeight

      // Bölüm görünür aralıkta mı kontrol et
      if (scrollPosition >= startScroll && scrollPosition <= endScroll) {
        // Scroll ilerleme yüzdesini hesapla (0-1 arası)
        const scrollProgress = (scrollPosition - startScroll) / (endScroll - startScroll)

        // Her satır için farklı bir ilerleme hesapla
        const textLines = scrollTextSectionRef.current.querySelectorAll(".scroll-progress-text")
        textLines.forEach((line, index) => {
          // Her satır için farklı bir gecikme uygula
          const lineDelay = index * 0.1 // Her satır için %10 gecikme
          const lineProgress = Math.max(0, Math.min(1, (scrollProgress - lineDelay) / 0.6))

          // Opaklığı %10'dan %100'e kadar hesapla
          const opacity = 0.1 + lineProgress * 0.9

          // Opaklığı uygula
          line.style.opacity = opacity.toString()
        })
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // İlk yükleme için çağır

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollReveal />

      <header className="border-b border-sand-200 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between">
          {/* Header kısmındaki halter ikonunu logo ile değiştir */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <img src="/images/logo.png" alt="OD Academy&Coaching Logo" className="h-8 w-auto" />
            <span className="gradient-text">OD Academy&Coaching</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-sand-500 transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-sand-500 transition-colors">
              Blog
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-sand-500 transition-colors">
              İletişim
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero bölümü */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-hero relative overflow-hidden">
          <div className="container relative z-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl scroll-reveal text-3d">
                  <span className="gradient-text">Potansiyelinizi Keşfedin, Hedeflerinize Ulaşın</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] scroll-reveal">
                  Kişiselleştirilmiş koçluk seansları ile hayatınızı dönüştürün. İster kariyerinizi, ister kişisel
                  gelişiminizi iyileştirmek isteyin, hedeflerinize ulaşmanıza yardımcı olmak için buradayız.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 scroll-reveal">
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-6 text-lg border-sand-300 hover:bg-sand-100 dark:border-sand-700 dark:hover:bg-sand-900/30"
                    onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Daha Fazla Bilgi
                  </Button>
                </div>
              </div>
              <div className="relative scroll-reveal">
                <img
                  src="/images/profile-new.png"
                  alt="Ozan Doğan"
                  width={500}
                  height={500}
                  className="profile-image mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Scroll ile ilerleyen animasyonlu yazı bölümü */}
        <section
          ref={scrollTextSectionRef}
          className="w-full py-16 md:py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="space-y-6 mb-8">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <div className="scroll-progress-text opacity-10">Bugün yapman gereken şeyi yine mi erteledin?</div>
                  <div className="scroll-progress-text opacity-10">Belki tembel olduğun için değil ...</div>
                  <div className="scroll-progress-text opacity-10"> </div>
                  <div className="scroll-progress-text opacity-10">
                    Belki zorlandığın duyguyla yüzleşmek istemediğin için.
                  </div>
                </h2>
              </div>
              <p className="scroll-progress-text opacity-10 text-lg md:text-xl text-sand-200/80 mt-8">
                Erteleme bir alışkanlıksa, başlamak da bir beceridir
              </p>
            </div>
          </div>
        </section>

        {/* Hakkımda bölümü - Neden bizi seçmelisiniz bölümünün üstüne taşındı */}
        <section
          id="about"
          className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-sand-50/50 dark:from-slate-900 dark:to-slate-800/50"
        >
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6 scroll-reveal text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  <span className="gradient-text">Hakkımda</span>
                </h2>
                <p className="text-muted-foreground md:text-lg scroll-reveal" style={{ transitionDelay: "100ms" }}>
                  Manisa'da doğdum. Uludağ Üniversitesi Felsefe bölümü mezunuyum. Şu an Felsefe öğretmeni olarak
                  çalışıyor ve aynı zamanda profesyonel koçluk yapıyorum.
                </p>
                <p className="text-muted-foreground md:text-lg scroll-reveal" style={{ transitionDelay: "200ms" }}>
                  Kişisel ve profesyonel hayatlarınızda belirlediğiniz hedeflere ulaşmak için yol haritası oluşturmak
                  isterseniz sizlerin yanında olmayı isterim. İçinizde var olan yetenekleri ve potansiyelinizi maksimize
                  etmek ve geliştirmek için sizinle birlikte bu yolda yürüyebiliriz.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 relative overflow-hidden">
          <div className="container">
            <div className="text-center space-y-4 mb-12 scroll-reveal">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <span className="gradient-text">Neden Bizi Seçmelisiniz?</span>
              </h2>
              <p className="text-muted-foreground md:text-lg max-w-[800px] mx-auto">
                Profesyonel koçluk hizmetlerimizle fark yaratıyoruz
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="card-dynamic p-6 scroll-reveal hover-lift bg-white dark:bg-slate-800"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="services"
          className="w-full py-16 md:py-24 bg-gradient-to-b from-sand-50/50 to-white dark:from-slate-900/50 dark:to-slate-900"
        >
          <div className="container">
            <div className="text-center space-y-4 mb-12 scroll-reveal">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <span className="gradient-text">Hizmetlerimiz</span>
              </h2>
              <p className="text-muted-foreground md:text-lg max-w-[800px] mx-auto">
                Uzmanlaşmış koçluk ve eğitim hizmetlerimiz arasından seçim yapın
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="card-dynamic relative scroll-reveal card-shine bg-white dark:bg-slate-800"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="p-6">
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog bölümü */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-sand-50/50 dark:from-slate-900 dark:to-slate-800/50">
          <div className="container">
            <div className="text-center space-y-4 mb-12 scroll-reveal">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <span className="gradient-text">Blog</span>
              </h2>
              <p className="text-muted-foreground md:text-lg max-w-[800px] mx-auto">
                En son yazılarımız ve içgörülerimiz
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {blogPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="blog-card scroll-reveal bg-white dark:bg-slate-800"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="p-2">
                    <div className="bg-sand-400 dark:bg-sand-600 text-white px-3 py-1 text-xs font-medium inline-block mb-2">
                      {post.date}
                    </div>
                  </div>
                  <div className="p-6 blog-card-content">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-6">{post.excerpt}</p>
                    <div className="blog-card-footer">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-sand-500 dark:text-sand-400 hover:text-sand-600 dark:hover:text-sand-300 font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Devamını Oku
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                asChild
                className="bg-sand-400 hover:bg-sand-500 text-white dark:bg-sand-600 dark:hover:bg-sand-700"
              >
                <Link href="/blog" target="_blank" rel="noopener noreferrer">
                  Tüm Yazıları Görüntüle
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="w-full py-16 md:py-24 bg-gradient-to-b from-sand-50/50 to-white dark:from-slate-800/50 dark:to-slate-900"
        >
          <div className="container">
            <div className="text-center space-y-4 mb-12 scroll-reveal">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <span className="gradient-text">İletişim</span>
              </h2>
              <p className="text-muted-foreground md:text-lg max-w-[800px] mx-auto">
                Sorularınız mı var? Benimle iletişime geçin.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div
                  className="card-dynamic p-6 text-center scroll-reveal hover-lift bg-white dark:bg-slate-800"
                  style={{ transitionDelay: "100ms" }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-sand-100 dark:bg-sand-900/30 p-3">
                      <Phone className="h-8 w-8 text-sand-500 dark:text-sand-400" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Telefon</h3>
                  <p className="text-muted-foreground">+90 553 442 77 82</p>
                </div>

                <div
                  className="card-dynamic p-6 text-center scroll-reveal hover-lift bg-white dark:bg-slate-800"
                  style={{ transitionDelay: "200ms" }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-sand-100 dark:bg-sand-900/30 p-3">
                      <Mail className="h-8 w-8 text-sand-500 dark:text-sand-400" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">E-posta</h3>
                  <p className="text-muted-foreground">ozandgann@gmail.com</p>
                </div>

                <div
                  className="card-dynamic p-6 text-center scroll-reveal hover-lift bg-white dark:bg-slate-800"
                  style={{ transitionDelay: "300ms" }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-sand-100 dark:bg-sand-900/30 p-3">
                      <Clock className="h-8 w-8 text-sand-500 dark:text-sand-400" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Çalışma Saatleri</h3>
                  <p className="text-muted-foreground">Pazartesi - Cuma: 09:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-sand-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              {/* Footer kısmındaki halter ikonunu logo ile değiştir */}
              <div className="flex items-center gap-2 font-bold text-xl">
                <img src="/images/logo.png" alt="OD Academy&Coaching Logo" className="h-8 w-auto" />
                <span className="gradient-text">OD Academy&Coaching</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Hedeflerinize ulaşmanıza yardımcı olmak için profesyonel koçluk ve eğitim hizmetleri.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Hızlı Bağlantılar</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-sand-500 dark:hover:text-sand-400 transition-colors"
                >
                  Ana Sayfa
                </Link>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-sand-500 dark:hover:text-sand-400 transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="#contact"
                  className="text-muted-foreground hover:text-sand-500 dark:hover:text-sand-400 transition-colors"
                >
                  İletişim
                </Link>
              </nav>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">İletişim</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Manisa, Türkiye</p>
                <p>ozandgann@gmail.com</p>
                <p>+90 553 442 7782</p>
              </div>
            </div>
          </div>

          <div className="border-t border-sand-200 dark:border-slate-800 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 OD Koçluk. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
