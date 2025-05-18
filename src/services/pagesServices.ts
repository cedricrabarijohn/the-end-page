import pool from "@/lib/db";
import { verifyJwt } from "./userServices";

/**
 * Generate a URL-friendly string from the title with a unique ID
 */
function generatePageUrl(title: string): string {
    // Convert to lowercase, replace spaces with hyphens, remove special characters
    const baseSlug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '');

    // Add timestamp and random string to ensure uniqueness
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8); // 6 character random string

    return `${baseSlug}-${timestamp}-${randomString}`;
}

/**
 * Creates a new page in the database
 * @param token JWT token containing user information
 * @param pageData Page data to be saved
 * @returns Created page with ID
 */
export async function createPage(
    token: string,
    pageData: {
        title: string;
        message: string;
        tone: string;
        theme: string;
        status: 'draft' | 'published' | 'archived';
        media: {
            image: string | null;
            video: string | null;
            audio: string | null;
        };
    }
) {
    // Verify JWT token and extract user ID
    const decoded = await verifyJwt(token);
    if (!decoded || !decoded.id) {
        throw new Error("Invalid or expired authentication token");
    }

    const userId = decoded.id;
    const uploadUrl = process.env.UPLOAD_STATIC_URL;
    if (!uploadUrl) {
        throw new Error("UPLOAD_STATIC_URL is not configured");
    };

    // Format media data for database storage
    const images = pageData.media.image ? JSON.stringify([`${uploadUrl}/${pageData.media.image}`]) : JSON.stringify([]);
    const videos = pageData.media.video ? JSON.stringify([`${uploadUrl}/${pageData.media.video}`]) : JSON.stringify([]);
    const audio = pageData.media.audio ? JSON.stringify([`${uploadUrl}/${pageData.media.audio}`]) : JSON.stringify([]);

    // Generate a unique URL for the page
    const pageUrl = `/${userId}/${generatePageUrl(pageData.title)}`;

    try {
        // Insert page into database
        const [result] = await pool.query(
            `INSERT INTO user_pages 
       (user_id, page_title, page_url, page_content, page_confidentiality, page_status, 
        page_tags, images, videos, audio) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                userId,
                pageData.title,
                pageUrl,
                pageData.message, // Using message as the content
                'public', // Default confidentiality
                pageData.status,
                pageData.tone, // Using tone as tags
                images,
                videos,
                audio,
            ]
        );

        // @ts-ignore
        const pageId = result.insertId;

        // Return created page with ID
        return {
            id: pageId,
            userId,
            title: pageData.title,
            url: pageUrl,
            content: pageData.message,
            confidentiality: 'public',
            status: pageData.status,
            tone: pageData.tone,
            theme: pageData.theme,
            media: pageData.media,
            createdAt: new Date().toISOString(),
        };
    } catch (error) {
        console.error('Error creating page:', error);
        throw new Error('Failed to create page in database');
    }
}

/**
 * Get all pages for a specific user
 */
export async function getUserPages(token: string) {
    // Verify JWT token and extract user ID
    const decoded = await verifyJwt(token);
    if (!decoded || !decoded.id) {
        throw new Error("Invalid or expired authentication token");
    }

    const userId = decoded.id;

    try {
        // Query database for user's pages
        const [rows] = await pool.query(
            `SELECT * FROM user_pages WHERE user_id = ? ORDER BY created_at DESC`,
            [userId]
        );

        // Format returned pages
        return (rows as any[]).map(row => ({
            id: row.id,
            title: row.page_title,
            url: row.page_url,
            content: row.page_content,
            confidentiality: row.page_confidentiality,
            status: row.page_status,
            tags: row.page_tags,
            media: {
                image: JSON.parse(row.images),
                video: JSON.parse(row.videos),
                audio: JSON.parse(row.audio),
            },
            views: row.views,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        }));
    } catch (error) {
        console.error('Error fetching user pages:', error);
        throw new Error('Failed to fetch pages from database');
    }
}

/**
 * Get page by ID
 */
export async function getPageById(pageId: number) {
    try {
        // Query database for specific page
        const [rows] = await pool.query(
            `SELECT * FROM user_pages WHERE id = ?`,
            [pageId]
        );

        if (!(rows as any[]).length) {
            return null;
        }

        const page = (rows as any[])[0];

        return {
            id: page.id,
            userId: page.user_id,
            title: page.page_title,
            url: page.page_url,
            content: page.page_content,
            confidentiality: page.page_confidentiality,
            status: page.page_status,
            tags: page.page_tags,
            media: {
                image: JSON.parse(page.images),
                video: JSON.parse(page.videos),
                audio: JSON.parse(page.audio),
            },
            views: page.views,
            createdAt: page.created_at,
            updatedAt: page.updated_at,
        };
    } catch (error) {
        console.error('Error fetching page:', error);
        throw new Error('Failed to fetch page from database');
    }
}

export async function   getPageByUrl(pageUrl: string) {
    try {
        console.log("Fetching page by URL:", pageUrl);
        // Query database for specific page
        const [rows] = await pool.query(
            `SELECT * FROM user_pages WHERE page_url = ?`,
            [pageUrl]
        );

        if (!(rows as any[]).length) {
            return null;
        }

        const page = (rows as any[])[0];

        return {
            id: page.id,
            userId: page.user_id,
            title: page.page_title,
            url: page.page_url,
            content: page.page_content,
            confidentiality: page.page_confidentiality,
            status: page.page_status,
            tags: page.page_tags,
            media: {
                image: JSON.parse(page.images),
                video: JSON.parse(page.videos),
                audio: JSON.parse(page.audio),
            },
            views: page.views,
            // createdAt: page.created_at,
            // updatedAt: page.updated_at,
        };
    } catch (error) {
        console.error('Error fetching page:', error);
        throw new Error('Failed to fetch page from database');
    }
}

/**
 * Increment page view count
 */
export async function incrementPageViews(pageId: number) {
    try {
        await pool.query(
            `UPDATE user_pages SET views = views + 1 WHERE id = ?`,
            [pageId]
        );

        return true;
    } catch (error) {
        console.error('Error incrementing page views:', error);
        return false;
    }
}

export async function deletePage(pageId: number) {
    try {
        await pool.query(
            `DELETE FROM user_pages WHERE id = ?`,
            [pageId]
        );

        return true;
    } catch (error) {
        console.error('Error deleting page:', error);
        return false;
    }
}
