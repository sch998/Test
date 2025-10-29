import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Liste tous les types d'appareils actifs
export async function GET() {
  try {
    const deviceTypes = await prisma.deviceType.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        icon: true,
      }
    })

    return NextResponse.json(deviceTypes)
  } catch (error) {
    console.error('Error fetching device types:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des types d\'appareils' },
      { status: 500 }
    )
  }
}
