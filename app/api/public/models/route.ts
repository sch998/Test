import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Liste les modèles d'une marque
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const brandId = searchParams.get('brandId')

    if (!brandId) {
      return NextResponse.json(
        { error: 'brandId est requis' },
        { status: 400 }
      )
    }

    const models = await prisma.model.findMany({
      where: {
        brandId,
        active: true,
      },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        year: true,
      }
    })

    return NextResponse.json(models)
  } catch (error) {
    console.error('Error fetching models:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des modèles' },
      { status: 500 }
    )
  }
}
