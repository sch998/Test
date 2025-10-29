import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Réparation Téléphone & Électronique - Angers | Réparation Express",
  description: "Spécialiste de la réparation de téléphones, ordinateurs, tablettes et consoles de jeux à Angers. Réparation sur place et par envoi postal. Devis gratuit.",
  keywords: "réparation téléphone Angers, réparation ordinateur Angers, réparation tablette, réparation console de jeux, réparation iPhone, réparation Samsung, réparation sur place",
  openGraph: {
    title: "Réparation Téléphone & Électronique - Angers",
    description: "Spécialiste de la réparation de téléphones, ordinateurs, tablettes et consoles de jeux à Angers",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
