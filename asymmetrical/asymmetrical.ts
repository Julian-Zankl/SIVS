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

/** Funktionsweise - RSA
 * - basiert auf der mathematischen Schwierigkeit, große Zahlen in ihre Primfaktoren zu zerlegen
 * - Verfahren nutzt ein Schlüsselpaar:
 *      Öffentlicher Schlüssel --> kann frei verteilt werden und wird zum Verschlüsseln von Nachrichten verwendet
 *      Privater Schlüssel --> muss geheim gehalten werden und wird zum Entschlüsseln der Nachrichten verwendet
 */


/** Potenzielle Angriffsmethoden
 * - Faktorisierung von n --> Ziel ist es, die beiden großen Primzahlen p und q zu finden, aus denen der Modul n besteht
 * 
 * - Chosen-Ciphertext-Angriff
 *      Angreifer kann beliebige Chiffretexte wählen und sich die entsprechenden Klartexte geben lassen
 *      Durch geschickte Wahl der Chiffretexte kann er Informationen über den privaten Schlüssel gewinnen.
 */


/** Unterschiede zu symmetrischer Verschlüsselung
 * - öffentlicher und privater Schlüssel
 * - langsam
 * - einfache Schlüsselverteilung (Public Key kann verteilt werden)
 * - Anwendung für digitale Signaturen und Schlüsselaustausch
 */