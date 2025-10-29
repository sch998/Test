"use client"

import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Select } from "@/app/components/ui/select"
import { Textarea } from "@/app/components/ui/textarea"
import { formatPrice } from "@/lib/utils"
import { CheckCircle } from "lucide-react"

type Step = 1 | 2 | 3 | 4 | 5 | 6

export default function RepairRequestPage() {
  const [step, setStep] = useState<Step>(1)
  const [deviceTypes, setDeviceTypes] = useState<any[]>([])
  const [brands, setBrands] = useState<any[]>([])
  const [models, setModels] = useState<any[]>([])
  const [faults, setFaults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [repairNumber, setRepairNumber] = useState("")

  const [formData, setFormData] = useState({
    deviceTypeId: "",
    brandId: "",
    modelId: "",
    faultId: "",
    serviceType: "ON_SITE",
    imei: "",
    description: "",
    customer: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    }
  })

  // Charger les types d'appareils
  useEffect(() => {
    fetch("/api/public/device-types")
      .then(res => res.json())
      .then(data => setDeviceTypes(data))
  }, [])

  // Charger les marques quand un type est sélectionné
  useEffect(() => {
    if (formData.deviceTypeId) {
      fetch(`/api/public/brands?deviceTypeId=${formData.deviceTypeId}`)
        .then(res => res.json())
        .then(data => setBrands(data))
    }
  }, [formData.deviceTypeId])

  // Charger les modèles quand une marque est sélectionnée
  useEffect(() => {
    if (formData.brandId) {
      fetch(`/api/public/models?brandId=${formData.brandId}`)
        .then(res => res.json())
        .then(data => setModels(data))
    }
  }, [formData.brandId])

  // Charger les pannes quand un modèle est sélectionné
  useEffect(() => {
    if (formData.modelId) {
      fetch(`/api/public/faults?modelId=${formData.modelId}`)
        .then(res => res.json())
        .then(data => setFaults(data))
    }
  }, [formData.modelId])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/public/repairs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        setRepairNumber(data.repairNumber)
        setSubmitted(true)
      } else {
        alert("Erreur lors de la création de la demande")
      }
    } catch (error) {
      alert("Erreur lors de la création de la demande")
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">Demande Enregistrée !</CardTitle>
            <CardDescription>
              Votre demande de réparation a été enregistrée avec succès
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-2">Votre numéro de suivi :</p>
              <p className="text-3xl font-bold text-primary">{repairNumber}</p>
            </div>
            <p className="text-gray-600 mb-6">
              Vous recevrez un email de confirmation à l'adresse {formData.customer.email}.
              Conservez votre numéro de suivi pour suivre l'avancement de votre réparation.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => window.location.href = `/suivi?num=${repairNumber}`}>
                Suivre ma réparation
              </Button>
              <Button variant="outline" onClick={() => window.location.href = "/"}>
                Retour à l'accueil
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const selectedFault = faults.find(f => f.id === formData.faultId)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Demande de Réparation</h1>
        <p className="text-gray-600 mb-8">
          Remplissez ce formulaire pour obtenir un devis et créer votre demande de réparation
        </p>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className={`flex-1 h-2 mx-1 rounded ${s <= step ? 'bg-primary' : 'bg-gray-200'}`} />
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">
            Étape {step} sur 5
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && "Type d'appareil"}
              {step === 2 && "Marque"}
              {step === 3 && "Modèle"}
              {step === 4 && "Type de panne"}
              {step === 5 && "Vos informations"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <Label>Sélectionnez le type d'appareil</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {deviceTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setFormData({ ...formData, deviceTypeId: type.id })
                        setStep(2)
                      }}
                      className="p-6 border-2 rounded-lg hover:border-primary hover:bg-gray-50 transition-all text-center"
                    >
                      <div className="text-4xl mb-2">{type.icon || "📱"}</div>
                      <div className="font-semibold">{type.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <Label htmlFor="brand">Sélectionnez la marque</Label>
                <Select
                  id="brand"
                  value={formData.brandId}
                  onChange={(e) => {
                    setFormData({ ...formData, brandId: e.target.value })
                  }}
                >
                  <option value="">Choisir une marque...</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                </Select>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(1)}>Retour</Button>
                  <Button onClick={() => setStep(3)} disabled={!formData.brandId}>Suivant</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <Label htmlFor="model">Sélectionnez le modèle</Label>
                <Select
                  id="model"
                  value={formData.modelId}
                  onChange={(e) => {
                    setFormData({ ...formData, modelId: e.target.value })
                  }}
                >
                  <option value="">Choisir un modèle...</option>
                  {models.map((model) => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                  ))}
                </Select>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(2)}>Retour</Button>
                  <Button onClick={() => setStep(4)} disabled={!formData.modelId}>Suivant</Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <Label>Sélectionnez le type de panne</Label>
                <div className="space-y-2">
                  {faults.map((fault) => (
                    <button
                      key={fault.id}
                      onClick={() => {
                        setFormData({ ...formData, faultId: fault.id })
                      }}
                      className={`w-full p-4 border-2 rounded-lg text-left hover:border-primary transition-all ${
                        formData.faultId === fault.id ? 'border-primary bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">{fault.faultType.name}</div>
                          {fault.description && (
                            <div className="text-sm text-gray-600">{fault.description}</div>
                          )}
                        </div>
                        <div className="text-lg font-bold text-primary">
                          {formatPrice(fault.price)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedFault && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Type de service :</div>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="ON_SITE"
                          checked={formData.serviceType === "ON_SITE"}
                          onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as any })}
                          className="mr-2"
                        />
                        Sur place (Angers)
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="MAIL_IN"
                          checked={formData.serviceType === "MAIL_IN"}
                          onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as any })}
                          className="mr-2"
                        />
                        Envoi postal
                      </label>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description">Description complémentaire (optionnel)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Décrivez plus en détail le problème..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(3)}>Retour</Button>
                  <Button onClick={() => setStep(5)} disabled={!formData.faultId}>Suivant</Button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={formData.customer.firstName}
                      onChange={(e) => setFormData({
                        ...formData,
                        customer: { ...formData.customer, firstName: e.target.value }
                      })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={formData.customer.lastName}
                      onChange={(e) => setFormData({
                        ...formData,
                        customer: { ...formData.customer, lastName: e.target.value }
                      })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.customer.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      customer: { ...formData.customer, email: e.target.value }
                    })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.customer.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      customer: { ...formData.customer, phone: e.target.value }
                    })}
                    required
                  />
                </div>

                {formData.serviceType === "MAIL_IN" && (
                  <>
                    <div>
                      <Label htmlFor="address">Adresse</Label>
                      <Input
                        id="address"
                        value={formData.customer.address}
                        onChange={(e) => setFormData({
                          ...formData,
                          customer: { ...formData.customer, address: e.target.value }
                        })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="postalCode">Code postal</Label>
                        <Input
                          id="postalCode"
                          value={formData.customer.postalCode}
                          onChange={(e) => setFormData({
                            ...formData,
                            customer: { ...formData.customer, postalCode: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">Ville</Label>
                        <Input
                          id="city"
                          value={formData.customer.city}
                          onChange={(e) => setFormData({
                            ...formData,
                            customer: { ...formData.customer, city: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedFault && (
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <div className="text-lg font-semibold mb-2">Récapitulatif</div>
                    <div className="space-y-1 text-sm">
                      <p><strong>Panne :</strong> {selectedFault.faultType.name}</p>
                      <p><strong>Prix :</strong> {formatPrice(selectedFault.price)}</p>
                      <p><strong>Service :</strong> {formData.serviceType === "ON_SITE" ? "Sur place" : "Envoi postal"}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(4)}>Retour</Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={loading || !formData.customer.firstName || !formData.customer.lastName || !formData.customer.email || !formData.customer.phone}
                  >
                    {loading ? "Envoi en cours..." : "Valider ma demande"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
