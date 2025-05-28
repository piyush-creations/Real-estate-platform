import { PrismaClient } from '@prisma/client';
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();

export const createProperty = async (req, res) => {
  try {
    const newProperty = await prisma.property.create({
      data: req.body
    });
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  const { id } = req.params;

  // Validate ID format (MongoDB ObjectId check)
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid property ID format" });
  }

  try {
    const property = await prisma.property.findUnique({
      where: { id: id } // Ensure the ID is passed correctly
    });

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    if (req.session.isloggedIn) {
      // Initialize visited properties if not already done
      const found = req.session.visitedProperties.find(element => element === property.id)
      if (!found) {
        req.session.visitedProperties.push(property.id); // Add property to visited list
      }
    }

    res.json(property);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const updatedProperty = await prisma.property.update({
      where: { id: (req.params.id) },
      data: req.body
    });
    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  console.log('DELETE route hit with ID:', req.params.id); // Debug log

  try {
    const propertyId = req.params.id;

    await prisma.savedProperty.deleteMany({
      where: { propertyId },
    });

    await prisma.property.delete({
      where: { id: propertyId },
    });

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};



export const saveProperty = async (req, res) => {
  const userId = req.session.userId;
  const { propertyId } = req.params;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    // Check if already saved
    const alreadySaved = await prisma.savedProperty.findFirst({
      where: {
        userId,
        propertyId
      }
    });

    if (alreadySaved) {
      return res.status(400).json({ message: "Property already saved." });
    }

    // Save property
    await prisma.savedProperty.create({
      data: {
        userId,
        propertyId
      }
    });

    res.status(201).json({ message: "Property saved successfully." });
  } catch (err) {
    console.error("Error saving property:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSavedProperties = async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const savedProps = await prisma.savedProperty.findMany({
      where: { userId },
      include: {
        property: true,
      },
      orderBy: {
        savedAt: 'desc'
      }
    });

    const properties = savedProps.map((entry) => entry.property);

    res.status(200).json(properties);
  } catch (err) {
    console.error("Error fetching saved properties:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};




export const unsaveProperty = async (req, res) => {
  const userId = req.session.userId;
  const { propertyId } = req.params;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const existingSave = await prisma.savedProperty.findFirst({
      where: {
        userId,
        propertyId,
      },
    });

    if (!existingSave) {
      return res.status(404).json({ message: "Property not saved" });
    }

    await prisma.savedProperty.delete({
      where: {
        id: existingSave.id
      }
    });

    res.status(200).json({ message: "Property unsaved successfully" });

  } catch (err) {
    console.error("Error unsaving property:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getVisitedProperties = async (req, res) => {
  console.log("Fetching visited properties. Current session:", req.session);

  if (!req.session.visitedProperties) {
    return res.status(200).json({ visitedProperties: [] });
  }

  res.status(200).json({ visitedProperties: req.session.visitedProperties });
};



export const clearVisitedProperties = (req, res) => {
  req.session.visitedProperties = [];
  res.json({ message: "Visited properties cleared" });
};

export const getRecommendations = async (req, res) => {
  try {
    // Check if user has viewed any properties
    if (!req.session.visitedProperties || req.session.visitedProperties.length === 0) {
      return res.status(200).json({ message: "No recommendations available. Visit some properties first!", recommendations: [] });
    }

    console.log("Generating recommendations based on:", req.session.visitedProperties);

    // Extract user preferences from visited properties
    const viewedLocations = [...new Set(req.session.visitedProperties.map(p => p.location))]; // Unique locations
    const viewedPriceRange = req.session.visitedProperties.map(p => p.price); // Get all price points
    const avgPrice = viewedPriceRange.reduce((a, b) => a + b, 0) / viewedPriceRange.length; // Calculate average price

    // Fetch recommended properties similar to visited ones
    const recommendedProperties = await prisma.property.findMany({
      where: {
        AND: [
          { location: { in: viewedLocations } }, // Match location
          { price: { gte: avgPrice * 0.8, lte: avgPrice * 1.2 } } // ±20% of avg price
        ]
      },
      take: 5 // Limit to 5 recommendations
    });

    res.status(200).json({ recommendations: recommendedProperties });

  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
};



