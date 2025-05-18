import { COOKIES } from "@/globals";
import { verifyJwt } from "@/services/userServices";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const jwtCookie = req.cookies[COOKIES.TOKEN];
    if (!jwtCookie) {
        return res.status(401).json({ error: "Unauthorized" });
    };
    const verifiedJwt = await verifyJwt(jwtCookie);
    if (!verifiedJwt) {
        return res.status(401).json({ error: "Unauthorized" });
    };
    const user = verifiedJwt;
    res.status(200).json({
        message: "User data retrieved successfully",
        user
    });
};

export default handler;