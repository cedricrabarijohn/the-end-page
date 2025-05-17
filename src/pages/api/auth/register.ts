import { decryptObject } from "@/utils/encryption";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { body } = req;
    if (!body || !body?.data) res.status(400).json({ error: "No data provided" });
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    const { firstname, lastname, email, password } = decryptObject(body?.data);
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("Registering user:", { firstname, lastname, email, password });

    return res.status(200).json({ message: "Hello from the register API!" });
}

export default handler;