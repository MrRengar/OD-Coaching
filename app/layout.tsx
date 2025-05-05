import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: {
    default: "OD Koçluk - Profesyonel Koçluk Hizmetleri",
    template: "%s | OD Koçluk",
  },
  description: "Kişiselleştirilmiş koçluk seansları ile kişisel ve profesyonel hedeflerinize ulaşın.",
  keywords: ["koçluk", "eğitim", "kişisel gelişim", "kariyer koçluğu", "öğrenci koçluğu"],
  authors: [{ name: "Ozan Doğan" }],
  creator: "OD Koçluk",
    generator: 'v0.dev'
}
