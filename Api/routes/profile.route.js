import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @route GET /api/profile
 * @desc Get user profile
 */
router.get('/', async (req, res) => {
    try {
        const email = req.query.email; // Or get from req.user if using auth middleware
        if (!email) return res.status(400).json({ error: "Email is required" });

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return res.status(404).json({ error: "User not found" });

        // Ensure all nullable fields return empty strings instead of null
        const sanitizedUser = {
            ...user,
            contact: user.contact || "", 
            gender: user.gender || "",
            dob: user.dob || "",
            occupation: user.occupation || "",
            profilePicture: user.profilePicture || "",
        };

        res.status(200).json(sanitizedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

/**
 * @route PUT /api/profile
 * @desc Update user profile
 */
router.put('/', async (req, res) => {
    try {
        const { email, username, contact, gender, dob, occupation, profilePicture } = req.body;

        if (!email) return res.status(400).json({ error: "Email is required" });

        const user = await prisma.user.update({
            where: { email },
            data: {
                username: username || undefined,
                contact: contact || undefined, // Handle empty values
                gender: gender || undefined,
                dob: dob || undefined,
                occupation: occupation || undefined,
                profilePicture: profilePicture || undefined
            }
        });

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update profile" });
    }
});

export default router;
