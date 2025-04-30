import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.get('/items', async (req, res) => {
  const items = await prisma.item.findMany()
  res.json(items)
})

app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000')
})
