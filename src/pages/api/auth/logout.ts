
import { COOKIES } from "@/globals";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Set-Cookie", [
        `${COOKIES.TOKEN}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=None`,
        `${COOKIES.CHECK_AUTH}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=None`,
    ]);
    return res.status(200).json({ message: "Logout successful" });
};

export default handler;