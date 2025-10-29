"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Select } from "@/app/components/ui/select"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { formatPrice, formatDate } from "@/lib/utils"

export default function RepairsPage() {
  const [repairs, setRepairs] = useState<any[]>([])
  const [filteredRepairs, setFilteredRepairs] = useState<any[]>([])
  const [selectedRepair, setSelectedRepair] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRepairs()
  }, [])

  useEffect(() => {
    if (filterStatus) {
      setFilteredRepairs(repairs.filter(r => r.status === filterStatus))
    } else {
      setFilteredRepairs(repairs)
    }
  }, [filterStatus, repairs])

  const loadRepairs = async () => {
    try {
      const response = await fetch("/api/repairs")
      const data = await response.json()
      setRepairs(data)
      setFilteredRepairs(data)
    } catch (error) {
      console.error("Error loading repairs:", error)
    }
    setLoading(false)
  }

  const updateRepair = async (repairId: string, updates: any) => {
    try {
      const response = await fetch("/api/repairs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: repairId, ...updates })
      })

      if (response.ok) {
        loadRepairs()
        setSelectedRepair(null)
        alert("Réparation mise à jour")
      }
    } catch (error) {
      console.error("Error updating repair:", error)
      alert("Erreur lors de la mise à jour")
    }
  }

  const statusLabels: Record<string, string> = {
    PENDING: "En attente",
    DIAGNOSED: "Diagnostiqué",
    WAITING_PARTS: "Attente pièces",
    IN_PROGRESS: "En cours",
    COMPLETED: "Terminé",
    READY_FOR_PICKUP: "Prêt pour retrait",
    DELIVERED: "Livré",
    CANCELLED: "Annulé",
  }

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    DIAGNOSED: "bg-blue-100 text-blue-800",
    WAITING_PARTS: "bg-orange-100 text-orange-800",
    IN_PROGRESS: "bg-purple-100 text-purple-800",
    COMPLETED: "bg-green-100 text-green-800",
    READY_FOR_PICKUP: "bg-green-100 text-green-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  }

  if (loading) {
    return <div>Chargement...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des Réparations</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des réparations */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Réparations ({filteredRepairs.length})</CardTitle>
                <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="">Tous les statuts</option>
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[700px] overflow-y-auto">
                {filteredRepairs.map((repair) => (
                  <div
                    key={repair.id}
                    onClick={() => setSelectedRepair(repair)}
                    className={`p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors ${
                      selectedRepair?.id === repair.id ? "border-primary bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold text-lg">{repair.repairNumber}</div>
                        <div className="text-sm text-gray-600">
                          {repair.customer.firstName} {repair.customer.lastName}
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${statusColors[repair.status]}`}>
                        {statusLabels[repair.status]}
                      </span>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="text-gray-700">
                        {repair.model.brand.deviceType.name} - {repair.model.brand.name} {repair.model.name}
                      </div>
                      <div className="text-gray-600">
                        {repair.fault.faultType.name}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-primary">{formatPrice(repair.price)}</span>
                        <span className="text-xs text-gray-500">{formatDate(repair.receivedDate)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Détails de la réparation */}
        <div>
          {selectedRepair ? (
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Détails & Mise à Jour</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    updateRepair(selectedRepair.id, {
                      status: formData.get("status"),
                      diagnosticNotes: formData.get("diagnosticNotes"),
                      depositPaid: parseFloat(formData.get("depositPaid") as string) || 0,
                    })
                  }}
                  className="space-y-4"
                >
                  <div>
                    <Label>Numéro</Label>
                    <div className="font-bold text-lg">{selectedRepair.repairNumber}</div>
                  </div>

                  <div>
                    <Label>Client</Label>
                    <div>
                      {selectedRepair.customer.firstName} {selectedRepair.customer.lastName}
                    </div>
                    <div className="text-sm text-gray-600">{selectedRepair.customer.email}</div>
                    <div className="text-sm text-gray-600">{selectedRepair.customer.phone}</div>
                  </div>

                  <div>
                    <Label>Appareil</Label>
                    <div className="text-sm">
                      {selectedRepair.model.brand.deviceType.name} - {selectedRepair.model.brand.name} {selectedRepair.model.name}
                    </div>
                  </div>

                  <div>
                    <Label>Panne</Label>
                    <div>{selectedRepair.fault.faultType.name}</div>
                  </div>

                  <div>
                    <Label>Prix</Label>
                    <div className="font-bold text-primary">{formatPrice(selectedRepair.price)}</div>
                  </div>

                  <div>
                    <Label htmlFor="status">Statut</Label>
                    <Select id="status" name="status" defaultValue={selectedRepair.status}>
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="diagnosticNotes">Notes du technicien</Label>
                    <Textarea
                      id="diagnosticNotes"
                      name="diagnosticNotes"
                      defaultValue={selectedRepair.diagnosticNotes || ""}
                      rows={4}
                      placeholder="Notes et observations..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="depositPaid">Acompte versé</Label>
                    <Input
                      id="depositPaid"
                      name="depositPaid"
                      type="number"
                      step="0.01"
                      defaultValue={selectedRepair.depositPaid}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Mettre à jour
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                Sélectionnez une réparation pour voir les détails
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
