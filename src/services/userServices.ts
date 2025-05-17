import pool from "@/lib/db";
import { sha256 } from "js-sha256";
// js-sha256

export async function hashPassword(password: string) {
    const hashedPassword = sha256(password);
    console.log("Hashed password:", hashedPassword);
    return hashedPassword;
}

export async function findUserByEmail(email: string) {
    const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
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
