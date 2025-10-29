import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/utils'

// GET - Liste tous les types d'appareils (admin)
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const deviceTypes = await prisma.deviceType.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { brands: true }
        }
      }
    })

    return NextResponse.json(deviceTypes)
  } catch (error) {
    console.error('Error fetching device types:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération' },
      { status: 500 }
    )
  }
}

// POST - Créer un nouveau type d'appareil
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { name, icon, order, active } = body

    const deviceType = await prisma.deviceType.create({
      data: {
        name,
        slug: slugify(name),
        icon,
        order: order || 0,
        active: active !== undefined ? active : true,
      }
    })

    return NextResponse.json(deviceType, { status: 201 })
  } catch (error) {
    console.error('Error creating device type:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour un type d'appareil
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, name, icon, order, active } = body

    const deviceType = await prisma.deviceType.update({
      where: { id },
      data: {
        name,
        slug: slugify(name),
        icon,
        order,
        active,
      }
    })

    return NextResponse.json(deviceType)
  } catch (error) {
    console.error('Error updating device type:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer un type d'appareil
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    await prisma.deviceType.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting device type:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression' },
      { status: 500 }
    )
  }
}
