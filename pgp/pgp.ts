import { generate } from "./generate";
import { decrypt } from "./decrypt";
import { encrypt } from "./encrypt";

/**
 * Pretty Good Privacy - PGP - 
 */

const passphrase = 'super secret stuff';

// Generate Keys
const keys = await generate(passphrase);

// Encrypt
const encryptedMessage = await encrypt(keys.publicKey);

// Decrypt
const decryptedMessage = await decrypt(encryptedMessage, keys.privateKey, passphrase);

console.log('Entschlüsselte Nachricht: ' + `'${decryptedMessage}'`);


/** Art von Verschlüsselung
 * - hybride Verschlüsselung
 * - eigentliche Nachricht wird symmetrisch verschlüsselt (üblich)
 * - verwendeter Schlüssel wird asymmetrisch verschlüsselt (üblich)
 * - ein symmetrischer Schlüssel (Session Key) wird stets zufällig erzeugt
 */ 

/** Vorteile
 * - verringert das Risiko der Verhinderung von Datenverlusten
 * - verhindert, dass Informationen während der Übertragung verändert werden
 * - schützt sensible Informationen vor unbefugtem Zugriff
 * - ermöglicht den sicheren Austausch von Informationen mit mehreren Parteien
 * - überprüft die Authentizität von E-Mail-Absendern
 */