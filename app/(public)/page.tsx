import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Smartphone, Laptop, Tablet, Gamepad2, Clock, Shield, MapPin, Star } from "lucide-react"

export const metadata = {
  title: "Réparation Téléphone & Électronique à Angers | Réparation Express",
  description: "Réparation rapide et professionnelle de téléphones, ordinateurs, tablettes et consoles de jeux à Angers. Service sur place et par envoi postal. Devis gratuit.",
}

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Réparation Professionnelle d'Appareils Électroniques à Angers
            </h1>
            <p className="text-xl mb-8">
              Téléphones, Ordinateurs, Tablettes, Consoles - Réparation rapide sur place ou par envoi postal
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/reparation">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Demander une réparation
                </Button>
              </Link>
              <Link href="/suivi">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100">
                  Suivre ma réparation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nos Services de Réparation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Smartphone className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Téléphones</CardTitle>
                <CardDescription>
                  iPhone, Samsung, Huawei, Xiaomi et toutes marques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Écran, batterie, charge, caméra, boutons, haut-parleur
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Laptop className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Ordinateurs</CardTitle>
                <CardDescription>
                  PC et Mac, portables et de bureau
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Écran, clavier, disque dur, RAM, virus, lenteur
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Tablet className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Tablettes</CardTitle>
                <CardDescription>
                  iPad, Samsung Galaxy Tab, et autres
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Vitre tactile, batterie, charge, boutons
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Gamepad2 className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Consoles de Jeux</CardTitle>
                <CardDescription>
                  PlayStation, Xbox, Nintendo Switch
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Lecteur, manettes, surchauffe, connectique
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pourquoi Nous Choisir ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="h-16 w-16 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Réparation Rapide</h3>
              <p className="text-gray-600">
                La plupart des réparations sont effectuées en moins de 24h
              </p>
            </div>
            <div className="text-center">
              <Shield className="h-16 w-16 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Garantie 6 Mois</h3>
              <p className="text-gray-600">
                Toutes nos réparations sont garanties 6 mois pièces et main d'œuvre
              </p>
            </div>
            <div className="text-center">
              <MapPin className="h-16 w-16 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sur Place ou Par Envoi</h3>
              <p className="text-gray-600">
                Venez en boutique à Angers ou envoyez votre appareil par La Poste
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Avis de Nos Clients
          </h2>
          <div className="flex justify-center items-center mb-8">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-current" />
              ))}
            </div>
            <span className="ml-2 text-gray-600">4.9/5 sur Google</span>
          </div>
          <div className="text-center">
            <Link href="/avis">
              <Button variant="outline">Voir tous les avis</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Besoin d'une Réparation ?
          </h2>
          <p className="text-xl mb-8">
            Obtenez un devis gratuit en quelques clics
          </p>
          <Link href="/reparation">
            <Button size="lg" variant="secondary">
              Commencer ma demande
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
