"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { formatDate, formatPrice } from "@/lib/utils"
import { CheckCircle, Clock, Package, Wrench, AlertCircle } from "lucide-react"

export default function TrackingPage() {
  const searchParams = useSearchParams()
  const [repairNumber, setRepairNumber] = useState(searchParams.get("num") || "")
  const [repair, setRepair] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!repairNumber) return

    setLoading(true)
    setError("")
    setRepair(null)

    try {
      const response = await fetch(`/api/public/repairs/${repairNumber}`)
      if (response.ok) {
        const data = await response.json()
        setRepair(data)
      } else {
        setError("Réparation non trouvée. Vérifiez votre numéro de suivi.")
      }
    } catch (err) {
      setError("Erreur lors de la recherche. Réessayez plus tard.")
    }
    setLoading(false)
  }

  useEffect(() => {
    if (searchParams.get("num")) {
      handleSearch()
    }
  }, [])

  const getStatusInfo = (status: string) => {
    const statusMap: Record<string, { label: string; icon: any; color: string }> = {
      PENDING: { label: "En attente", icon: Clock, color: "text-yellow-600" },
      DIAGNOSED: { label: "Diagnostiqué", icon: CheckCircle, color: "text-blue-600" },
      WAITING_PARTS: { label: "En attente de pièces", icon: Package, color: "text-orange-600" },
      IN_PROGRESS: { label: "En réparation", icon: Wrench, color: "text-purple-600" },
      COMPLETED: { label: "Terminé", icon: CheckCircle, color: "text-green-600" },
      READY_FOR_PICKUP: { label: "Prêt pour retrait", icon: CheckCircle, color: "text-green-600" },
      DELIVERED: { label: "Livré", icon: CheckCircle, color: "text-green-600" },
      CANCELLED: { label: "Annulé", icon: AlertCircle, color: "text-red-600" },
    }
    return statusMap[status] || { label: status, icon: Clock, color: "text-gray-600" }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Suivre ma Réparation</h1>
        <p className="text-gray-600 mb-8">
          Entrez votre numéro de suivi pour voir l'avancement de votre réparation
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Numéro de Suivi</CardTitle>
            <CardDescription>
              Le numéro de suivi vous a été envoyé par email lors de la création de votre demande
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="repairNumber" className="sr-only">Numéro de réparation</Label>
                <Input
                  id="repairNumber"
                  placeholder="Ex: REP240001"
                  value={repairNumber}
                  onChange={(e) => setRepairNumber(e.target.value.toUpperCase())}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} disabled={loading || !repairNumber}>
                {loading ? "Recherche..." : "Rechercher"}
              </Button>
            </div>
            {error && (
              <p className="text-red-600 text-sm mt-2">{error}</p>
            )}
          </CardContent>
        </Card>

        {repair && (
          <div className="space-y-6">
            {/* Informations générales */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Réparation {repair.repairNumber}</CardTitle>
                    <CardDescription>
                      {repair.model.brand.deviceType.name} - {repair.model.brand.name} {repair.model.name}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    {(() => {
                      const statusInfo = getStatusInfo(repair.status)
                      const Icon = statusInfo.icon
                      return (
                        <div className={`flex items-center gap-2 ${statusInfo.color}`}>
                          <Icon className="h-5 w-5" />
                          <span className="font-semibold">{statusInfo.label}</span>
                        </div>
                      )
                    })()}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Type de panne</p>
                    <p className="font-semibold">{repair.fault.faultType.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Prix</p>
                    <p className="font-semibold text-primary">{formatPrice(repair.price)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date de réception</p>
                    <p className="font-semibold">{formatDate(repair.receivedDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Service</p>
                    <p className="font-semibold">
                      {repair.serviceType === "ON_SITE" ? "Sur place" : "Envoi postal"}
                    </p>
                  </div>
                </div>

                {repair.estimatedDate && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Date estimée de fin</p>
                    <p className="font-semibold text-blue-900">{formatDate(repair.estimatedDate)}</p>
                  </div>
                )}

                {repair.completedDate && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Date de finalisation</p>
                    <p className="font-semibold text-green-900">{formatDate(repair.completedDate)}</p>
                  </div>
                )}

                {repair.diagnosticNotes && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Notes du technicien</p>
                    <p className="bg-gray-50 p-3 rounded">{repair.diagnosticNotes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Historique des statuts */}
            <Card>
              <CardHeader>
                <CardTitle>Historique</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {repair.statusHistory.map((history: any, index: number) => {
                    const statusInfo = getStatusInfo(history.status)
                    const Icon = statusInfo.icon
                    return (
                      <div key={history.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`rounded-full p-2 ${statusInfo.color} bg-gray-100`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          {index < repair.statusHistory.length - 1 && (
                            <div className="w-px h-full bg-gray-300 mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold">{statusInfo.label}</p>
                            <p className="text-sm text-gray-600">{formatDate(history.createdAt)}</p>
                          </div>
                          {history.notes && (
                            <p className="text-sm text-gray-600 mt-1">{history.notes}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Informations de contact */}
            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600 mb-2">
                  Pour toute question concernant votre réparation, contactez-nous :
                </p>
                <p className="font-semibold">
                  📞 02 XX XX XX XX | 📧 contact@reparation-express.fr
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
