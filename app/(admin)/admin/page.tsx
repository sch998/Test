"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Wrench, Users, Package, DollarSign, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { formatPrice } from "@/lib/utils"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRepairs: 0,
    pendingRepairs: 0,
    inProgressRepairs: 0,
    completedRepairs: 0,
    totalCustomers: 0,
    lowStockParts: 0,
    totalRevenue: 0,
  })
  const [recentRepairs, setRecentRepairs] = useState<any[]>([])

  useEffect(() => {
    // Charger les statistiques
    fetch("/api/repairs")
      .then(res => res.json())
      .then((repairs: any[]) => {
        const pending = repairs.filter(r => r.status === "PENDING").length
        const inProgress = repairs.filter(r => r.status === "IN_PROGRESS").length
        const completed = repairs.filter(r => r.status === "COMPLETED" || r.status === "DELIVERED").length
        const revenue = repairs.reduce((sum, r) => sum + r.price, 0)

        setStats(prev => ({
          ...prev,
          totalRepairs: repairs.length,
          pendingRepairs: pending,
          inProgressRepairs: inProgress,
          completedRepairs: completed,
          totalRevenue: revenue,
        }))

        setRecentRepairs(repairs.slice(0, 5))
      })
      .catch(console.error)
  }, [])

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    DIAGNOSED: "bg-blue-100 text-blue-800",
    IN_PROGRESS: "bg-purple-100 text-purple-800",
    COMPLETED: "bg-green-100 text-green-800",
    READY_FOR_PICKUP: "bg-green-100 text-green-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  }

  const statusLabels: Record<string, string> = {
    PENDING: "En attente",
    DIAGNOSED: "Diagnostiqué",
    WAITING_PARTS: "Attente pièces",
    IN_PROGRESS: "En cours",
    COMPLETED: "Terminé",
    READY_FOR_PICKUP: "Prêt",
    DELIVERED: "Livré",
    CANCELLED: "Annulé",
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Tableau de Bord</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Réparations
            </CardTitle>
            <Wrench className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRepairs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              En Attente
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pendingRepairs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              En Cours
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.inProgressRepairs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Chiffre d'Affaires
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatPrice(stats.totalRevenue)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Repairs */}
      <Card>
        <CardHeader>
          <CardTitle>Réparations Récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRepairs.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Aucune réparation pour le moment</p>
            ) : (
              recentRepairs.map((repair) => (
                <div key={repair.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-semibold">{repair.repairNumber}</div>
                    <div className="text-sm text-gray-600">
                      {repair.customer.firstName} {repair.customer.lastName} - {repair.model.brand.name} {repair.model.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {repair.fault.faultType.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">{formatPrice(repair.price)}</div>
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[repair.status]}`}>
                      {statusLabels[repair.status]}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
