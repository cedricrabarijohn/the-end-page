import { findUserByEmailAndPassword, generateJwt } from "@/services/userServices";
import { decryptObject } from "@/utils/encryption";
import { NextApiRequest, NextApiResponse } from "next";
import { addCookie } from "@/utils/api-cookies-setting";
import { COOKIES } from "@/globals";

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
    const loggedUserWHash = user[0];
    const { hashed_password, ...loggedUser } = loggedUserWHash;
    const token = await generateJwt(loggedUser);
    if (!token) {
        return res.status(500).json({ error: "Internal server error" });
    };
    res.setHeader("Set-Cookie", [
        addCookie(COOKIES.TOKEN, token, 86400, true),
        addCookie(COOKIES.CHECK_AUTH,'true', 86400, false),
    ]);
    return res.status(200).json({
        message: "Login successful",
        user: loggedUser
    });
}

export default handler;