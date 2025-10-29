import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Suivre une réparation par son numéro
export async function GET(
  request: NextRequest,
  { params }: { params: { repairNumber: string } }
) {
  try {
    const { repairNumber } = params

    const repair = await prisma.repair.findUnique({
      where: { repairNumber },
      include: {
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
        },
        statusHistory: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!repair) {
      return NextResponse.json(
        { error: 'Réparation non trouvée' },
        { status: 404 }
      )
    }

    // Ne pas exposer les informations sensibles
    const { customer, ...safeRepair } = repair

    return NextResponse.json(safeRepair)
  } catch (error) {
    console.error('Error fetching repair:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la réparation' },
      { status: 500 }
    )
  }
}
