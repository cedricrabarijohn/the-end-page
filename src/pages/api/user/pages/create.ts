// Backend
// @ts-ignore
import formidable from 'formidable-serverless';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import { COOKIES } from '@/globals';
import { createPage } from '@/services/pagesServices';

const uploadDir = process.env.UPLOAD_DEST || path.join(process.cwd(), 'public/uploads');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

export const config = {
    api: {
        bodyParser: false,
    },
};

const getNameFromPath = (path: string) => {
    const pathParts = path.split("/");
    const fileName = pathParts[pathParts.length - 1];
    return fileName;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Get JWT token from cookies
    const token = req.cookies[COOKIES.TOKEN];
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    // Configure formidable to handle multiple files
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;
    form.multiples = true;
    form.maxFileSize = 3 * 1024 * 1024; // 3MB limit

    return new Promise((resolve, reject) => {
        // @ts-ignore
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing form:', err);
                res.status(500).json({ error: 'Error parsing form data' });
                return resolve(true);
            }
            
            try {
                // Extract form data
                const { title, message, tone, theme, status } = fields;
                
                // Handle media files
                const mediaFiles = {
                    image: files.image ? getNameFromPath(files.image.path) : null,
                    video: files.video ? getNameFromPath(files.video.path) : null,
                    audio: files.audio ? getNameFromPath(files.audio.path) : null,
                };
                
                // Prepare page data
                const pageData = {
                    title,
                    message,
                    tone,
                    theme,
                    status,
                    media: mediaFiles
                };

                // Create page using the service
                const newPage = await createPage(token, pageData);
                
                return res.status(201).json({ 
                    success: true, 
                    message: 'Page created successfully',
                    page: newPage
                });
                // return resolve(true);
                
            } catch (error) {
                console.error('Error creating page:', error);
                // @ts-ignore
                res.status(error.message.includes('token') ? 401 : 500).json({ error: error.message || 'Error creating page' });
                return resolve(true);
            }
        });
    });
};
