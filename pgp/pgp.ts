/**
 * Pretty Good Privacy - PGP - 
 */
const openpgp = require("openpgp");
const fs = require("fs");

// Generate Keys
generate();

// Encrypt
const publicKeyArmored = '';
encrypt(publicKeyArmored);


// Decrypt
const privateKeyArmored = '';
const passphrase = 'qwerty';

decrypt(privateKeyArmored, passphrase);

/** Art von Verschlüsselung
 * - hybride Verschlüsselung
 * - eigentliche Nachricht wird symmetrisch verschlüsselt
 * - verwendeter Schlüssel wird asymmetrisch verschlüsselt
 * - ein symmetrischer Schlüssel (Session Key) wird stets zufällig erzeugt
 */ 

/** Vorteile
 * - verringert das Risiko der Verhinderung von Datenverlusten
 * - verhindert, dass Informationen während der Übertragung verändert werden
 * - schützt sensible Informationen vor unbefugtem Zugriff
 * - ermöglicht den sicheren Austausch von Informationen mit mehreren Parteien
 * - überprüft die Authentizität von E-Mail-Absendern
 */