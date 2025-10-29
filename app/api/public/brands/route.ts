import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Liste les marques d'un type d'appareil
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const deviceTypeId = searchParams.get('deviceTypeId')

    if (!deviceTypeId) {
      return NextResponse.json(
        { error: 'deviceTypeId est requis' },
        { status: 400 }
      )
    }

    const brands = await prisma.brand.findMany({
      where: {
        deviceTypeId,
        active: true,
      },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        logo: true,
      }
    })

    return NextResponse.json(brands)
  } catch (error) {
    console.error('Error fetching brands:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des marques' },
      { status: 500 }
    )
  }
}
