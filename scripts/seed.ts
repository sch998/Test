import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Début du seeding de la base de données...')

  // Créer un utilisateur admin
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@reparation-express.fr' },
    update: {},
    create: {
      email: 'admin@reparation-express.fr',
      password: hashedPassword,
      name: 'Administrateur',
      role: 'admin',
    },
  })

  console.log('✅ Utilisateur admin créé:', admin.email)

  // Créer des types d'appareils
  const phoneType = await prisma.deviceType.upsert({
    where: { slug: 'telephone' },
    update: {},
    create: {
      name: 'Téléphone',
      slug: 'telephone',
      icon: '📱',
      order: 1,
    },
  })

  const computerType = await prisma.deviceType.upsert({
    where: { slug: 'ordinateur' },
    update: {},
    create: {
      name: 'Ordinateur',
      slug: 'ordinateur',
      icon: '💻',
      order: 2,
    },
  })

  const tabletType = await prisma.deviceType.upsert({
    where: { slug: 'tablette' },
    update: {},
    create: {
      name: 'Tablette',
      slug: 'tablette',
      icon: '📱',
      order: 3,
    },
  })

  const consoleType = await prisma.deviceType.upsert({
    where: { slug: 'console' },
    update: {},
    create: {
      name: 'Console de jeux',
      slug: 'console',
      icon: '🎮',
      order: 4,
    },
  })

  console.log('✅ Types d\'appareils créés')

  // Créer des marques
  const apple = await prisma.brand.upsert({
    where: {
      deviceTypeId_name: {
        deviceTypeId: phoneType.id,
        name: 'Apple'
      }
    },
    update: {},
    create: {
      name: 'Apple',
      slug: 'apple',
      deviceTypeId: phoneType.id,
    },
  })

  const samsung = await prisma.brand.upsert({
    where: {
      deviceTypeId_name: {
        deviceTypeId: phoneType.id,
        name: 'Samsung'
      }
    },
    update: {},
    create: {
      name: 'Samsung',
      slug: 'samsung',
      deviceTypeId: phoneType.id,
    },
  })

  console.log('✅ Marques créées')

  // Créer des modèles
  const iphone12 = await prisma.model.upsert({
    where: {
      brandId_name: {
        brandId: apple.id,
        name: 'iPhone 12'
      }
    },
    update: {},
    create: {
      name: 'iPhone 12',
      slug: 'iphone-12',
      brandId: apple.id,
      year: 2020,
    },
  })

  const iphone13 = await prisma.model.upsert({
    where: {
      brandId_name: {
        brandId: apple.id,
        name: 'iPhone 13'
      }
    },
    update: {},
    create: {
      name: 'iPhone 13',
      slug: 'iphone-13',
      brandId: apple.id,
      year: 2021,
    },
  })

  const galaxyS21 = await prisma.model.upsert({
    where: {
      brandId_name: {
        brandId: samsung.id,
        name: 'Galaxy S21'
      }
    },
    update: {},
    create: {
      name: 'Galaxy S21',
      slug: 'galaxy-s21',
      brandId: samsung.id,
      year: 2021,
    },
  })

  console.log('✅ Modèles créés')

  // Créer des types de pannes
  const screenFault = await prisma.faultType.upsert({
    where: { name: 'Écran cassé' },
    update: {},
    create: {
      name: 'Écran cassé',
      description: 'Remplacement de l\'écran',
      icon: '📱',
    },
  })

  const batteryFault = await prisma.faultType.upsert({
    where: { name: 'Batterie' },
    update: {},
    create: {
      name: 'Batterie',
      description: 'Remplacement de la batterie',
      icon: '🔋',
    },
  })

  const chargingFault = await prisma.faultType.upsert({
    where: { name: 'Problème de charge' },
    update: {},
    create: {
      name: 'Problème de charge',
      description: 'Réparation du connecteur de charge',
      icon: '🔌',
    },
  })

  console.log('✅ Types de pannes créés')

  // Créer des pannes pour les modèles
  await prisma.fault.upsert({
    where: {
      modelId_faultTypeId: {
        modelId: iphone12.id,
        faultTypeId: screenFault.id
      }
    },
    update: {},
    create: {
      modelId: iphone12.id,
      faultTypeId: screenFault.id,
      price: 149.99,
      duration: 60,
      description: 'Remplacement de l\'écran iPhone 12',
    },
  })

  await prisma.fault.upsert({
    where: {
      modelId_faultTypeId: {
        modelId: iphone12.id,
        faultTypeId: batteryFault.id
      }
    },
    update: {},
    create: {
      modelId: iphone12.id,
      faultTypeId: batteryFault.id,
      price: 69.99,
      duration: 30,
      description: 'Remplacement de la batterie iPhone 12',
    },
  })

  await prisma.fault.upsert({
    where: {
      modelId_faultTypeId: {
        modelId: iphone13.id,
        faultTypeId: screenFault.id
      }
    },
    update: {},
    create: {
      modelId: iphone13.id,
      faultTypeId: screenFault.id,
      price: 179.99,
      duration: 60,
      description: 'Remplacement de l\'écran iPhone 13',
    },
  })

  await prisma.fault.upsert({
    where: {
      modelId_faultTypeId: {
        modelId: galaxyS21.id,
        faultTypeId: screenFault.id
      }
    },
    update: {},
    create: {
      modelId: galaxyS21.id,
      faultTypeId: screenFault.id,
      price: 129.99,
      duration: 60,
      description: 'Remplacement de l\'écran Galaxy S21',
    },
  })

  console.log('✅ Pannes créées pour les modèles')

  console.log('🎉 Seeding terminé avec succès!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
