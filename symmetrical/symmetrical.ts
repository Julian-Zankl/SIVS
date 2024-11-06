/**
 * Symmetrischer Verschlüsselungsalgorithmus - AES
 **/
import * as crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text: string): string {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(encryptedText: string): string {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

const originalText = 'Sensitive information';
const encryptedText = encrypt(originalText);
const decryptedText = decrypt(encryptedText);

console.log('Original:', originalText);
console.log('Encrypted:', encryptedText);
console.log('Decrypted:', decryptedText);

/** Funktionsweise */


/**  Potenzielle Angriffsmethoden */


/** Unterschiede zu asymmetrischer Verschlüsselung */