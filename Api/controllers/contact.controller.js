import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createContactMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const savedMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        message
      }
    });

    res.status(201).json({ message: 'Contact message received!', data: savedMessage });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
