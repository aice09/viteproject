import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.item.create({
    data: {
      name: 'Test',
      value: '123'
    }
  })
}

main().finally(() => prisma.$disconnect())
