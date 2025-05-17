import { findUserByEmailAndPassword } from "@/services/userServices";
import { decryptObject } from "@/utils/encryption";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { body } = req;
    if (!body || !body?.data) return res.status(400).json({ error: "No data provided" });
    const { email, password } = decryptObject(body?.data);
    if (!email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    };
    const user = await findUserByEmailAndPassword(email, password);
    if (user.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    const { id, firstname, lastname, email: userEmail, avatar } = user[0];
    return res.status(200).json({
        message: "Login successful",
        user: {
            id,
            firstname,
            lastname,
            email: userEmail,
            avatar,
        },
    });
}

export default handler;