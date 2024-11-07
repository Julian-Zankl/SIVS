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

/** Funktionsweise - AES
 * - Unterteilung in Blöcke: Die zu verschlüsselnden Daten werden in Blöcke fester Größe unterteilt (z.B. 128 Bit)
 * - Anfangspermutation: Der Block wird einer anfänglichen Permutation unterzogen, um die Daten zu vermischen
 * - Transformationen: Es folgen mehrere Runden von Transformationen (Ersetzen, Verschieben, Kombinieren, Verknüpfen)
 * - Endrunde: Die letzte Runde unterscheidet sich geringfügig von den vorherigen, da die MixColumns-Transformation entfällt
 * - Endpermutation: Eine inverse Anfangspermutation wird angewendet
 */


/**  Potenzielle Angriffsmethoden
 * - Brute-Force-Angriff --> Systematisches Ausprobieren aller möglichen Schlüssel
 * - Lineare und differentielle Kryptoanalyse --> Nutzung von statistischen Eigenschaften der Verschlüsselung, um den Schlüssel zu finden
 * - Integral-Angriffe --> Viele verschlüsselte Texte mit leicht veränderten Klartexten analysieren, um Informationen über den Schlüssel zu gewinnen
 */


/** Unterschiede zu asymmetrischer Verschlüsselung
 * - ein einziger Schlüssel zum Veschlüsseln und Entschlüsseln
 * - schnelle Verschlüsselung (in der Regel)
 * - Schlüsselverteilung -  Herausforderung, den Schlüssel sicher an den Kommunikationspartner zu übermitteln, ohne dass er abgefangen wird
 * - Anwendung in VPNs, Festplattenverschlüsselung und Verschlüsselung von großen Datenmengen
 */