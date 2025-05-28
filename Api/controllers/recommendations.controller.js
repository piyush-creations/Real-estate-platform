import express from "express"
import { PrismaClient } from "@prisma/client";


const recomms = express.Router()

recomms.get("/properties", async (req, res) => {
    if (!req.session.isloggedIn) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const visitedProperties = req.session.visitedProperties;
    console.log(visitedProperties)
    // Clear visited properties from session
    req.session.visitedProperties = []

    const prisma = new PrismaClient()

    const properties = await prisma.property.findMany({
        where: {
            id: {
                in: visitedProperties,
            },
        },
        take: 5, // Limit to 5 recommendations
    });

    const locProperties = await prisma.property.findMany({
        where: {
            AND: [
                {
                    id: {
                        notIn: properties.map(property => property.id),
                    },
                },
                {
                    OR: [
                        { Location: { in: properties.map(property => property.Location) } },
                        { propertyFor: { in: properties.map(property => property.propertyFor) } }
                    ]
                }
            ]
        },
        take: 10,
    });

    const featured = properties.concat(locProperties)

    const response = await fetch("http://localhost:5000/recommendation", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(featured.map((property) => {
            return {
                id: property.id,
                Price: property.Price,
                Area: property.Area,
                Location: property.Location,
                propertyFor: property.propertyFor,
            }
        })),
    })

    if (response.status !== 200) {
        return res.status(204).json({ message: "Failed to fetch recommendations", error: await response.json() });
    }

    const recommendations = await response.json();

    const resData = await prisma.property.findMany({
        where: {
            id: {
                in: recommendations,
            },
        },
        take: 5, // Limit to 5 recommendations
    });

    return res.json(resData).status(200)
})


export default recomms