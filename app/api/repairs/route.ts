import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Liste toutes les réparations (admin)
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const serviceType = searchParams.get('serviceType')

    const where: any = {}
    if (status) where.status = status
    if (serviceType) where.serviceType = serviceType

    const repairs = await prisma.repair.findMany({
      where,
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
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(repairs)
  } catch (error) {
    console.error('Error fetching repairs:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour une réparation
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, status, diagnosticNotes, estimatedDate, completedDate, depositPaid } = body

    const repair = await prisma.repair.update({
      where: { id },
      data: {
        status,
        diagnosticNotes,
        estimatedDate: estimatedDate ? new Date(estimatedDate) : undefined,
        completedDate: completedDate ? new Date(completedDate) : undefined,
        depositPaid,
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

    // Ajouter à l'historique si le statut a changé
    if (status) {
      await prisma.repairStatusHistory.create({
        data: {
          repairId: id,
          status,
          notes: diagnosticNotes,
          createdBy: session.user.email,
        }
      })
    }

    return NextResponse.json(repair)
  } catch (error) {
    console.error('Error updating repair:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    )
  }
}
