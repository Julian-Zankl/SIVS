/**
 * Asymmetrischer Verschlüsselungsalgorithmus - RSA
 **/
import * as forge from 'node-forge';

const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });

function encryptWithPublicKey(text: string): string {
    const publicKey = keyPair.publicKey;
    const encrypted = publicKey.encrypt(text);
    return forge.util.encode64(encrypted);
}

function decryptWithPrivateKey(encryptedText: string): string {
    const privateKey = keyPair.privateKey;
    const encrypted = forge.util.decode64(encryptedText);
    const decrypted = privateKey.decrypt(encrypted);
    return decrypted;
}

const originalText = 'Confidential data';
const encryptedText = encryptWithPublicKey(originalText);
const decryptedText = decryptWithPrivateKey(encryptedText);

console.log('Original:', originalText);
console.log('Encrypted:', encryptedText);
console.log('Decrypted:', decryptedText);

/** Funktionsweise */


/**  Potenzielle Angriffsmethoden */


/** Unterschiede zu symmetrischer Verschlüsselung */