import express from "express";
import multer from "multer";
import { PrismaClient } from "@prisma/client"; // ✅ Import Prisma Client
import { getPropertyById, getRecommendations, updateProperty, deleteProperty } from "../controllers/property.controller.js";
import { getVisitedProperties, saveProperty, getSavedProperties, unsaveProperty } from "../controllers/property.controller.js";
import isAuthenticated from "../Middleware/isAuthenticated.js"; // ✅ Import authentication middleware

const prisma = new PrismaClient();
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files in the 'uploads/' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique filename
    },
});
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Invalid file type. Only JPEG and PNG are allowed."), false);
        }
        cb(null, true);
    },
});

router.post("/properties", upload.array("photos", 10), async (req, res) => {
    try {
        // ✅ Get the user ID from session
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized. Please login to post a property." });
        }

        console.log("📥 Received request:", req.body);

        const data = {
            propertyFor: req.body.propertyFor,
            propertyType: req.body.propertyType,
            Location: req.body.Location,
            Bedrooms: req.body.Bedrooms ? Number(req.body.Bedrooms) : null,
            Bathrooms: req.body.Bathrooms ? Number(req.body.Bathrooms) : null,
            Price: req.body.Price ? Number(req.body.Price) : null,
            Area: req.body.Area ? Number(req.body.Area) : null,
            SecurityDeposit: isNaN(req.body.SecurityDeposit) ? null : Number(req.body.SecurityDeposit),
            MaintenanceCharges: isNaN(req.body.MaintenanceCharges) ? null : Number(req.body.MaintenanceCharges),
            LeaseDuration: isNaN(req.body.LeaseDuration) ? null : Number(req.body.LeaseDuration),
            Floors: isNaN(req.body.Floors) ? null : Number(req.body.Floors),
            Age: isNaN(req.body.Age) ? null : Number(req.body.Age),
            FurnishedStatus: req.body.FurnishedStatus || "Unfurnished",
            Negotiable: req.body.Negotiable === "true",
            Garden: req.body.Garden === "true",
            Parking: req.body.Parking === "true",
            description: Array.isArray(req.body.description)
                ? req.body.description.join(', ')
                : req.body.description || null,
        
            Water: req.body.water === "true",  // Corrected casing to 'Water'
            Pool: req.body.pool === "true",    // Corrected casing to 'Pool'
            Security: req.body.Security === "true",
            Power: req.body.Power === "true",
            FireSafety: req.body.FireSafety === "true",
            Air: req.body.Air === "true",
            Wifi: req.body.Wifi === "true",
            Mattress: req.body.Mattress === "true",  // Corrected spelling to 'Mattress'
            Meals: req.body.Meals === "true",
            Fridge: req.body.Fridge === "true",
            Balcony: req.body.Balcony === "true",
        
            Features: req.body.Features ? JSON.parse(req.body.Features) : {},
            photos: req.files.length > 0 ? req.files.map((file) => file.path) : [],
        
            railwayAvailability: req.body.railwayAvailability || null,
            railwayDistance: req.body.railwayDistance || null,
            railwayDistanceUnit: req.body.railwayDistanceUnit || null,
        
            busStandAvailability: req.body.busStandAvailability || null,
            busStandDistance: req.body.busStandDistance || null,
            busStandDistanceUnit: req.body.busStandDistanceUnit || null,
        
            hospitalAvailability: req.body.hospitalAvailability || null,
            hospitalDistance: req.body.hospitalDistance || null,
            hospitalDistanceUnit: req.body.hospitalDistanceUnit || null,
        
            schoolAvailability: req.body.schoolAvailability || null,
            schoolDistance: req.body.schoolDistance || null,
            schoolDistanceUnit: req.body.schoolDistanceUnit || null,
        
            restaurantAvailability: req.body.restaurantAvailability || null,  // Corrected spelling to 'restaurantAvailability'
            restaurantDistance: req.body.restaurantDistance || null,
            restaurantDistanceUnit: req.body.restaurantDistanceUnit || null,
        };

        // ✅ Attach the owner relationship here
        const property = await prisma.property.create({
            data: {
                ...data,
                owner: {
                    connect: { id: userId },
                },
            },
        });

        res.status(201).json({ message: "✅ Property created successfully!", property });
    } catch (error) {
        console.error("❌ Error creating property:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

router.post("/save/:propertyId", isAuthenticated, saveProperty);

router.get("/saved", isAuthenticated, getSavedProperties);

router.delete("/saved/:propertyId", isAuthenticated, unsaveProperty);


// ✅ Get all properties posted by the currently logged-in user
router.get('/my-properties', isAuthenticated, async (req, res) => {
    const userId = req.session.userId; // 🧠 Grab user ID from session

    try {
        const myProperties = await prisma.property.findMany({
            where: {
                ownerId: userId, // 🔍 Only fetch properties where ownerId matches logged-in user
            },
            orderBy: {
                dateposted: 'desc' // Optional: latest listed properties first
            }
        });

        res.status(200).json({ success: true, properties: myProperties });
    } catch (error) {
        console.error("❌ Error fetching user's properties:", error);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
});


router.post('/view/:propertyId', isAuthenticated, async (req, res) => {
    const userId = req.session.userId;
    const { propertyId } = req.params;

    try {
        const existing = await prisma.recentlyViewedProperty.findFirst({
            where: { userId, propertyId }
        });

        if (existing) {
            // Update viewedAt timestamp
            await prisma.recentlyViewedProperty.update({
                where: { id: existing.id },
                data: { viewedAt: new Date() }
            });
        } else {
            // Add new viewed entry
            await prisma.recentlyViewedProperty.create({
                data: {
                    userId,
                    propertyId
                }
            });
        }

        res.status(200).json({ message: 'View recorded successfully' });
    } catch (error) {
        console.error('Error adding recently viewed:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ✅ Get recently viewed properties for a user
router.get('/recently-viewed', isAuthenticated, async (req, res) => {
    const userId = req.session.userId;

    try {
        const views = await prisma.recentlyViewedProperty.findMany({
            where: { userId },
            orderBy: { viewedAt: 'desc' },
            take: 10,
            include: {
                property: true
            }
        });

        res.status(200).json(views.map(entry => entry.property));
    } catch (error) {
        console.error('Error fetching recently viewed:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ✅ Filter properties
router.get("/search", async (req, res) => {
    try {
        const { Location, propertyType, minPrice, maxPrice, Bedrooms, propertyFor } = req.query;

        const filters = {};

        if (Location) filters.Location = { equals: Location, mode: "insensitive" };
        if (propertyType && propertyType !== "Any") filters.propertyType = { equals: propertyType, mode: "insensitive" };
        if (propertyFor) filters.propertyFor = { equals: propertyFor, mode: "insensitive" }; // ✅ This line is missing in your code
        if (minPrice) filters.Price = { gte: Number(minPrice) };
        if (maxPrice) filters.Price = { ...(filters.Price || {}), lte: Number(maxPrice) };
        if (Bedrooms) filters.Bedrooms = { gte: Number(Bedrooms) };

        console.log("🧪 Filters being applied:", filters); // Debug log

        const properties = await prisma.property.findMany({
            where: filters,
            select: {
                id: true,
                Location: true,
                propertyType: true,
                propertyFor: true,
                Price: true,
                Bedrooms: true,
                photos: true
            }
        });

        res.json({ success: true, properties });
    } catch (error) {
        console.error("❌ Error fetching properties:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

router.get("/visited", getVisitedProperties);
router.get('/recommendations', getRecommendations);
router.put('/property/:id', updateProperty);  // For update
router.delete('/property/:id', deleteProperty); // For delete
router.get("/:id", getPropertyById);


export default router;
