import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateRepairNumber } from '@/lib/utils'

// POST - Créer une nouvelle demande de réparation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      customer,
      modelId,
      faultId,
      serviceType,
      description,
      imei,
    } = body

    // Validation
    if (!customer?.firstName || !customer?.lastName || !customer?.email || !customer?.phone) {
      return NextResponse.json(
        { error: 'Informations client incomplètes' },
        { status: 400 }
      )
    }

    if (!modelId || !faultId || !serviceType) {
      return NextResponse.json(
        { error: 'Informations de réparation incomplètes' },
        { status: 400 }
      )
    }

    // Récupérer le prix de la panne
    const fault = await prisma.fault.findUnique({
      where: { id: faultId }
    })

    if (!fault) {
      return NextResponse.json(
        { error: 'Panne non trouvée' },
        { status: 404 }
      )
    }

    // Créer ou récupérer le client
    let existingCustomer = await prisma.customer.findUnique({
      where: { email: customer.email }
    })

    if (!existingCustomer) {
      existingCustomer = await prisma.customer.create({
        data: {
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          city: customer.city,
          postalCode: customer.postalCode,
        }
      })
    }

    // Créer la réparation
    const repair = await prisma.repair.create({
      data: {
        repairNumber: generateRepairNumber(),
        customerId: existingCustomer.id,
        modelId,
        faultId,
        serviceType,
        description,
        imei,
        price: fault.price,
        status: 'PENDING',
      },
      include: {
        customer: true,
        model: {
          include: {
            brand: {
              include: {
                deviceType: true
              }
            }
          }
        },
        fault: {
          include: {
            faultType: true
          }
        }
      }
    })

    // Créer l'historique de statut
    await prisma.repairStatusHistory.create({
      data: {
        repairId: repair.id,
        status: 'PENDING',
        notes: 'Demande de réparation créée',
      }
    })

    return NextResponse.json(repair, { status: 201 })
  } catch (error) {
    console.error('Error creating repair:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la réparation' },
      { status: 500 }
    )
  }
}
