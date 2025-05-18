import { deletePage } from "@/services/pagesServices";
import { NextApiRequest, NextApiResponse } from "next";

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "DELETE") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    const { body } = req;
    if (!body || !body?.data) return res.status(400).json({ error: "No data provided" });
    const { pageId } = body?.data;
    if (!pageId) {
        return res.status(400).json({ error: "Missing required fields" });
    };
    const deleted = await deletePage(pageId);
    if (!deleted) {
        return res.status(500).json({ error: "Internal server error" });
    };
    return res.status(200).json({
        message: "Page deleted successfully",
        pageId: pageId
    });
}

export default deleteHandler;