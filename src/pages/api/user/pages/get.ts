import { COOKIES } from "@/globals";
import { getUserPages } from "@/services/pagesServices";
import { NextApiRequest, NextApiResponse } from "next";

const getPagesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const token = req.cookies[COOKIES.TOKEN];
        if(!token) {
            return res.status(401).json({ error: "Unauthorized" });
        };

        const pages = await getUserPages(token);

        if (!pages || pages.length === 0) {
            return res.status(200).json({ message: "No pages found for this user", pages: [] });
        }

        return res.status(200).json(pages);
    } catch (error) {
        console.error("Error fetching pages:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export default getPagesHandler;