/**
 * Hashing - Integrität einer Datei prüfen
 */
import * as fs from 'fs';
import * as crypto from 'crypto';

// Function to calculate the hash of a file using a specific algorithm
function calculateHash(filePath: string, algorithm: string) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(algorithm);
    const stream = fs.createReadStream(filePath);

    stream.on('data', (data) => hash.update(data));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', (error) => reject(error));
  });
}

// File path and algorithms
const filePath = './hashing/example.txt';
const md5HashPromise = calculateHash(filePath, 'md5');
const sha256HashPromise = calculateHash(filePath, 'sha256');

// Valid hash values (you can change these values for testing)
const validMD5Hash = '6a3d3684a694d3fa461fb911ce95304f';
const validSHA256Hash = '076473f49eb236a2bf9cfd3a4f71c75434873e12c727a6a4e82b5c8bf2e01ceb';

Promise.all([md5HashPromise, sha256HashPromise])
  .then(([calculatedMD5Hash, calculatedSHA256Hash]) => {
    console.log(calculatedMD5Hash);
    
    if (calculatedMD5Hash === validMD5Hash && calculatedSHA256Hash === validSHA256Hash) {
      console.log('File is valid. Hashes match!');
    } else {
      console.log('File is not valid. Hashes do not match!');
    }
  })
  .catch((error) => {
    console.error('Error calculating hash:', error);
  });;

/** Bedeutung von Hash-Funktionen
 * - Prozess, der eine Eingabe in eine feste Länge konvertiert
 * - determenistisch - selbe Eingabe erzeugt stets denselben Hash-Wert
 * - Einwegfunktion - keine Möglichkeit, den ursprünglichen Klartext aus Hash-Wert zurückzurechnen
 * - Streuung - minimale Änderung der Eingabe führt zu erheblich unterschiedlichem Hash-Wert
 * - Schnelligkeit - schnelle Ausführung, die teilweise abgeschwächt wird (z.B. um Brute-Force Attacken zu erschweren)
 * - Kollisionsresistenz - Kollisionen sind zwar unvermeidbar, jedoch sollen diese nicht "einfach" berechenbar sein
 */

/** Anwendungsgebiete
 * - Passwortspeicherung - Hashes zur sicheren Speicherung von Passwörtern
 * - Integritätsprüfung - Überprüfung der Datenintegrität während der Übertragung
 * - Datenstrukturen - Hash-Tabellen für effiziente Datenabfrage und -speicherung
 */

/** Algorithmen
 * - SHA-256 - sehr häufig im Einsatz, z.B. Bitcoin BLockchain
 * - MD5 - ursprünglich zur Berechnung von Prüfsummen, stellte sich als unsicher heraus (Kollisionen wurden gefunden)
 */