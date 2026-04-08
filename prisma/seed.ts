import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const passwordHash = await hash('changeme123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@symphony.com' },
    update: {},
    create: {
      email: 'admin@symphony.com',
      name: 'Admin',
      passwordHash,
      role: 'ADMIN',
    },
  })
  console.log('Created admin user:', admin.email)

  // Create slides matching the existing pitch deck
  const slides = [
    {
      title: 'Symphony Hero',
      slug: 'symphony-hero',
      category: 'Introduction',
      componentType: 'hero',
      contentData: {
        heading: 'Your Integrated HV Infrastructure Partner',
        subheading: 'Business Overview Prepared for Client A',
        clientName: 'Client A',
        logoUrl: '/Symphony_Logo_White.png',
      },
    },
    {
      title: 'Energy Value Chain',
      slug: 'energy-value-chain',
      category: 'Value Chain',
      componentType: 'value-chain',
      contentData: {},
      description: 'Interactive 5-phase animated infographic showing Australia\'s energy transformation and Symphony\'s role in the value chain.',
    },
    {
      title: 'Our Products',
      slug: 'our-products',
      category: 'Products',
      componentType: 'products-grid',
      contentData: {
        title: 'Our Products',
        subtitle: 'End-to-end connection solutions for every asset class',
      },
    },
    {
      title: 'Partnership Models',
      slug: 'partnership-models',
      category: 'Partnerships',
      componentType: 'partnership-overview',
      contentData: {},
      description: 'Three partnership models across the project lifecycle: Development, Delivery, and Operations partnerships.',
    },
    {
      title: 'Partnership Configurator',
      slug: 'partnership-configurator',
      category: 'Partnerships',
      componentType: 'partnership-configurator',
      contentData: {
        title: 'Our partnership product',
        subtitle: 'Configure your connection infrastructure engagement',
      },
      description: 'Interactive 4-step wizard for configuring partnership model, technology, and scope.',
    },
    {
      title: 'Why We Exist',
      slug: 'why-we-exist',
      category: 'Company',
      componentType: 'why-we-exist',
      contentData: {
        title: 'Why Do We Exist?',
        subtitle: 'Future project connections hinge on execution capability and capacity. Symphony provides certainty of delivery for our partners.',
        footerNote: 'Note: This excludes capacity needed to service regulated transmission substations and switchyards.',
      },
    },
  ]

  for (const slideData of slides) {
    await prisma.slide.upsert({
      where: { slug: slideData.slug },
      update: {},
      create: {
        ...slideData,
        createdBy: admin.id,
      },
    })
  }
  console.log(`Created ${slides.length} slides`)

  // Create the default deck
  const allSlides = await prisma.slide.findMany({
    where: { slug: { in: slides.map((s) => s.slug) } },
    orderBy: { createdAt: 'asc' },
  })

  const deck = await prisma.deck.upsert({
    where: { slug: 'symphony-business-overview-client-a' },
    update: {},
    create: {
      title: 'Symphony Business Overview — Client A',
      slug: 'symphony-business-overview-client-a',
      clientName: 'Client A',
      description: 'Full Symphony pitch deck with all core sections.',
      isPublished: true,
      createdBy: admin.id,
    },
  })

  // Add slides to deck
  const existingDeckSlides = await prisma.deckSlide.count({ where: { deckId: deck.id } })
  if (existingDeckSlides === 0) {
    for (let i = 0; i < allSlides.length; i++) {
      await prisma.deckSlide.create({
        data: {
          deckId: deck.id,
          slideId: allSlides[i].id,
          position: i,
        },
      })
    }
  }
  console.log('Created default deck with', allSlides.length, 'slides')

  console.log('Seed complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
