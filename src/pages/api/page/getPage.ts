import { getPageByUrl } from "@/services/pagesServices";
import { NextApiRequest, NextApiResponse } from "next";

const getPageHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    const { slug } = req.query;
    if (!slug || !slug.length) {
        return res.status(400).json({ error: "Missing query fields : slug" });
    };
    const page = await getPageByUrl(slug[0]);
    return res.status(200).json({
        message: "Page fetched successfully",
        page: page
    });
}

export default getPageHandler;