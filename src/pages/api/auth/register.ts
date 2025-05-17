import { createUser, findUserByEmail } from "@/services/userServices";
import { decryptObject } from "@/utils/encryption";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
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
        const checkExistingUser = await findUserByEmail(email);
        if (checkExistingUser.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        };
        const user = await createUser({
            firstname,
            lastname,
            email,
            password,
        });
        return res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.log("Error creating user:", error);
        return res.status(500).json({ error: "Internal server error", verbose: error });
    }
}

export default handler;