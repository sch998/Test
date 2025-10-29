import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Liste toutes les pièces
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const parts = await prisma.part.findMany({
      orderBy: { name: 'asc' }
    })

    return NextResponse.json(parts)
  } catch (error) {
    console.error('Error fetching parts:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération' },
      { status: 500 }
    )
  }
}

// POST - Créer une nouvelle pièce
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      name,
      reference,
      description,
      purchasePrice,
      sellingPrice,
      stock,
      minStock,
      supplierName,
      supplierRef,
    } = body

    const part = await prisma.part.create({
      data: {
        name,
        reference,
        description,
        purchasePrice,
        sellingPrice,
        stock: stock || 0,
        minStock: minStock || 5,
        supplierName,
        supplierRef,
      }
    })

    return NextResponse.json(part, { status: 201 })
  } catch (error) {
    console.error('Error creating part:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour une pièce
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, ...data } = body

    const part = await prisma.part.update({
      where: { id },
      data
    })

    return NextResponse.json(part)
  } catch (error) {
    console.error('Error updating part:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    )
  }
}
