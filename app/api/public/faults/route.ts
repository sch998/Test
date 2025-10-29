import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Liste les pannes disponibles pour un modèle
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const modelId = searchParams.get('modelId')

    if (!modelId) {
      return NextResponse.json(
        { error: 'modelId est requis' },
        { status: 400 }
      )
    }

    const faults = await prisma.fault.findMany({
      where: {
        modelId,
        active: true,
      },
      include: {
        faultType: {
          select: {
            name: true,
            description: true,
            icon: true,
          }
        }
      },
      orderBy: {
        faultType: {
          name: 'asc'
        }
      }
    })

    return NextResponse.json(faults)
  } catch (error) {
    console.error('Error fetching faults:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des pannes' },
      { status: 500 }
    )
  }
}
