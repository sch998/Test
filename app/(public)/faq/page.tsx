import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"

export const metadata = {
  title: "FAQ - Questions Fréquentes | Réparation Express Angers",
  description: "Trouvez les réponses aux questions les plus fréquentes sur nos services de réparation de téléphones, ordinateurs, tablettes et consoles de jeux à Angers.",
}

const faqs = [
  {
    category: "Services",
    questions: [
      {
        q: "Quels appareils réparez-vous ?",
        a: "Nous réparons tous types d'appareils électroniques : smartphones (iPhone, Samsung, Huawei, etc.), ordinateurs (PC et Mac), tablettes (iPad, Galaxy Tab, etc.) et consoles de jeux (PlayStation, Xbox, Nintendo Switch)."
      },
      {
        q: "Proposez-vous un service d'envoi postal ?",
        a: "Oui ! Si vous ne pouvez pas vous déplacer à Angers, vous pouvez nous envoyer votre appareil par La Poste. Nous vous fournirons une adresse d'envoi et un suivi complet de votre réparation."
      },
      {
        q: "Combien de temps prend une réparation ?",
        a: "La plupart des réparations courantes (écran, batterie) sont effectuées en moins de 24h. Pour les réparations plus complexes, nous vous communiquons un délai précis après diagnostic."
      },
    ]
  },
  {
    category: "Tarifs & Paiement",
    questions: [
      {
        q: "Comment connaître le prix de ma réparation ?",
        a: "Utilisez notre formulaire de demande en ligne pour obtenir immédiatement le prix de votre réparation. Vous pouvez aussi nous contacter par téléphone ou venir directement en boutique pour un devis gratuit."
      },
      {
        q: "Quels moyens de paiement acceptez-vous ?",
        a: "Nous acceptons les paiements en espèces, carte bancaire, et virement bancaire. Pour les réparations par envoi postal, le paiement se fait avant l'expédition du retour."
      },
      {
        q: "Dois-je payer un acompte ?",
        a: "Pour les réparations importantes, nous pouvons demander un acompte de 30% à 50%. Pour les réparations courantes en boutique, le paiement est demandé à la récupération de l'appareil."
      },
    ]
  },
  {
    category: "Garantie",
    questions: [
      {
        q: "Quelle est la durée de la garantie ?",
        a: "Toutes nos réparations sont garanties 6 mois pièces et main d'œuvre. Cette garantie couvre tout défaut de pièce ou de réparation, hors nouvelle casse ou oxydation."
      },
      {
        q: "Que couvre la garantie ?",
        a: "La garantie couvre les défauts de pièces et les malfaçons. Elle ne couvre pas les nouvelles casses, l'oxydation, les dégâts des eaux survenus après la réparation, ou l'usure normale."
      },
      {
        q: "Comment faire valoir ma garantie ?",
        a: "En cas de problème pendant la période de garantie, contactez-nous avec votre numéro de réparation. Nous examinerons votre appareil gratuitement et effectuerons la réparation sous garantie si elle est couverte."
      },
    ]
  },
  {
    category: "Processus de Réparation",
    questions: [
      {
        q: "Comment se déroule une réparation sur place ?",
        a: "1) Venez en boutique avec votre appareil, 2) Nous effectuons un diagnostic gratuit, 3) Nous vous communiquons le prix et le délai, 4) Si vous acceptez, nous effectuons la réparation, 5) Vous récupérez votre appareil réparé."
      },
      {
        q: "Comment se déroule une réparation par envoi postal ?",
        a: "1) Créez votre demande en ligne, 2) Envoyez-nous votre appareil à l'adresse indiquée, 3) Nous vous confirmons la réception, 4) Nous effectuons la réparation, 5) Nous vous renvoyons l'appareil par transporteur."
      },
      {
        q: "Puis-je suivre l'avancement de ma réparation ?",
        a: "Oui ! Lors de la création de votre demande, vous recevez un numéro de suivi. Utilisez-le sur notre page de suivi pour voir en temps réel l'état d'avancement de votre réparation."
      },
      {
        q: "Que se passe-t-il si vous ne pouvez pas réparer mon appareil ?",
        a: "Si la réparation s'avère impossible après diagnostic, nous vous en informons immédiatement. Aucun frais ne vous sera facturé, et vous pouvez récupérer votre appareil."
      },
    ]
  },
  {
    category: "Données & Sécurité",
    questions: [
      {
        q: "Mes données sont-elles en sécurité ?",
        a: "Nous ne consultons jamais vos données personnelles. Cependant, nous vous recommandons vivement d'effectuer une sauvegarde avant toute réparation, car certaines interventions peuvent nécessiter une réinitialisation."
      },
      {
        q: "Dois-je sauvegarder mes données avant la réparation ?",
        a: "Oui, nous vous recommandons fortement de sauvegarder vos données avant toute réparation. Bien que nous fassions de notre mieux pour préserver vos données, certaines pannes ou réparations peuvent nécessiter une réinitialisation complète."
      },
      {
        q: "Dois-je fournir mon code de déverrouillage ?",
        a: "Pour certaines réparations nécessitant des tests complets (notamment sur iPhone), nous pouvons avoir besoin de votre code de déverrouillage. Vous pouvez aussi désactiver temporairement le code."
      },
    ]
  },
  {
    category: "Pièces Détachées",
    questions: [
      {
        q: "Utilisez-vous des pièces d'origine ?",
        a: "Nous utilisons des pièces de qualité premium, certifiées et testées. Pour certains modèles, nous proposons aussi des pièces constructeur d'origine avec un supplément de prix."
      },
      {
        q: "D'où proviennent vos pièces détachées ?",
        a: "Nous travaillons avec des fournisseurs européens certifiés. Toutes nos pièces sont testées et garanties pour assurer la meilleure qualité de réparation."
      },
    ]
  },
]

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Questions Fréquentes (FAQ)
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center">
          Trouvez rapidement les réponses à vos questions
        </p>

        <div className="space-y-8">
          {faqs.map((category, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-bold mb-4 text-primary">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, qIdx) => (
                  <Card key={qIdx}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.q}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Card className="mt-12 bg-primary text-white">
          <CardHeader>
            <CardTitle>Vous n'avez pas trouvé la réponse ?</CardTitle>
            <CardDescription className="text-white/80">
              Notre équipe est là pour vous aider
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>📞 Téléphone : 02 XX XX XX XX</p>
              <p>📧 Email : contact@reparation-express.fr</p>
              <p>📍 Adresse : Angers, France</p>
              <p className="pt-4">Horaires : Lun-Ven 9h-18h | Sam 10h-17h</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
