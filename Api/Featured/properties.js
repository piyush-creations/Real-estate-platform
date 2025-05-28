import express from 'express';
import { PrismaClient } from "@prisma/client";

const featured = express.Router()

const prisma = new PrismaClient();

featured.get("/properties", async (req,  res) => {
    try {
        const property = await prisma.property.findMany({ take: 50 })
        return res.status(200).json(property)
    } catch (error) {
        console.error("❌ Error fetching properties:", error);
    return res.status(500).json({ error: "Internal Server Error" });
    }
})

export default featured;