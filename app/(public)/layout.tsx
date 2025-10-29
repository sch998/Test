import Link from "next/link"
import { Smartphone, MapPin, Phone, Mail } from "lucide-react"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Smartphone className="h-8 w-8" />
              <span className="text-2xl font-bold">Réparation Express</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="hover:text-gray-200">
                Accueil
              </Link>
              <Link href="/reparation" className="hover:text-gray-200">
                Demander une réparation
              </Link>
              <Link href="/suivi" className="hover:text-gray-200">
                Suivre ma réparation
              </Link>
              <Link href="/faq" className="hover:text-gray-200">
                FAQ
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Réparation Express</h3>
              <p className="text-gray-400">
                Votre spécialiste de la réparation de téléphones, ordinateurs, tablettes et consoles de jeux à Angers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Angers, France</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>02 XX XX XX XX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>contact@reparation-express.fr</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Horaires</h3>
              <div className="text-gray-400 space-y-1">
                <p>Lundi - Vendredi: 9h - 18h</p>
                <p>Samedi: 10h - 17h</p>
                <p>Dimanche: Fermé</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Réparation Express. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
