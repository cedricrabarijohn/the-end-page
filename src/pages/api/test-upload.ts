// Backend
// @ts-ignore
import formidable from 'formidable-serverless';
import { NextApiRequest, NextApiResponse } from 'next';
const uploadDir = process.env.UPLOAD_DEST || '';

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
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;
    // @ts-ignore
    form.parse(req, (err, fields, files) => {
        const fileName = getNameFromPath(files?.file?.path);
        console.log('File name == ', fileName);
        if (err) {
            console.error('Error parsing the file:', err);
            return res.status(500).json({ error: 'Error parsing the file' });
        }
        if (!files?.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        return res.status(200).json({
            message: 'File uploaded successfully',
            fileName: fileName,
        });
    });
};
