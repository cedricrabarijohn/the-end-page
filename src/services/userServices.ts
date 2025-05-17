import pool from "@/lib/db";
import { sha256 } from "js-sha256";
const jwt = require("jsonwebtoken");
// js-sha256

const jwtSecret = process.env.JWT || 'your-secret-key';

export async function generateJwt(datas: any, expiration = '24h') {
    const token = jwt.sign(datas, jwtSecret, { expiresIn: expiration });
    return token;
}

export async function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, jwtSecret);
        return decoded;
    } catch (error) {
        console.error("JWT verification error:", error);
        return null;
    }
}

export async function hashPassword(password: string) {
    const hashedPassword = sha256(password);
    return hashedPassword;
}

export async function findUserByEmail(email: string) {
    const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    return rows as any[];
}

export async function findUserById(id: string) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows as any[];
}
export async function findUserByEmailAndPassword(email: string, password: string) {
    const hashedPassword = await hashPassword(password);
    const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ? AND hashed_password = ?",
        [email, hashedPassword]
    );
    return rows as any[];
}

export async function createUser({
    firstname,
    lastname,
    email,
    password,
}: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}) {
    const randomAvatar = `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`;
    console.log("Creating user", { firstname, lastname, email, password });
    const hashed_password = await hashPassword(password);
    await pool.query(
        "INSERT INTO users (firstname, lastname, email, hashed_password, avatar) VALUES (?, ?, ?, ?, ?)",
        [firstname, lastname, email, hashed_password, randomAvatar]
    );
}
