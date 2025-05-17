const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'your-encryption-key';

export const encryptObject = (obj: object): string => {
    try {
        const jsonString = JSON.stringify(obj);
        let encryptedString = '';
        for (let i = 0; i < jsonString.length; i++) {
            encryptedString += String.fromCharCode(jsonString.charCodeAt(i) ^ encryptionKey.charCodeAt(i % encryptionKey.length));
        }
        return btoa(encryptedString);
    }
    catch (error) {
        console.error('Error during encryption:', error);
        return '';
    }
};

export const decryptObject = (encryptedString: string): any => {
    try {
        const decodedString = atob(encryptedString);
        let decryptedString = '';
        for (let i = 0; i < decodedString.length; i++) {
            decryptedString += String.fromCharCode(decodedString.charCodeAt(i) ^ encryptionKey.charCodeAt(i % encryptionKey.length));
        }
        return JSON.parse(decryptedString);
    } catch (error) {
        console.error('Error during decryption:', error);
        return {};
    }
};