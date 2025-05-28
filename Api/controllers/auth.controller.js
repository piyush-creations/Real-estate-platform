import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';
export const register = async (req, res) => {
    //db opreations
    const { username, email, password } = req.body;

    try {
        //password hasing
        const hasedpassword = await bcrypt.hash(password, 10);

        console.log("password:", hasedpassword);
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hasedpassword,
            },
        });
        console.log(newUser);

        res.status(201).json({ message: "User created sucessfully" });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "failed to create user" })
    }
};


export const login = async (req, res) => {
    //db opreations

    const { email, password } = req.body;

    try {

        //check if user exists
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) return res.status(401).json({ message: "Invalid credentials" })

        //check if password is correct
        const isPasswordvaild = await bcrypt.compare(password, user.password)

        if (!isPasswordvaild) return res.status(401).json({ message: "Invalid credentials" })

        //genrate cokokie taoken and send it to the user
        // res.setHeader("set-cookie", "test" + "myvalue").json({message: "success"})
        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET_KEY)
        const age = 1000 * 60 * 60 * 24 * 7;
        const { password: userPassword, ...userInfo } = user

        req.session.userId = user.id;
        req.session.isloggedIn = true; // Initialize loggedIn status
        req.session.visitedProperties = [];

        res.status(200).json(userInfo)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "failed to login!" })

    }
}
export const logout = (req, res) => {
    //db opreations
    res.clearCookie("token").status(200).json({ message: "logout Successful!" })
}