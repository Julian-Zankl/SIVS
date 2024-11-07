/**
 * Hashing mit Salting und Peppering
 */
import * as crypto from 'crypto';

/**
 * The information about the password that is stored in the database
 */
interface PersistedPassword {
    salt: string;
    hash: string;
    iterations: number;
}

const PASSWORD_LENGTH = 256;
const SALT_LENGTH = 64;
const ITERATIONS = 10000;
const DIGEST = "sha256";
const BYTE_TO_STRING_ENCODING = "hex"; // this could also be base64, for instance

/**
 * Generates a PersistedPassword given the password provided by the user.
 * This should be called when creating a user or redefining the password
 */
export function generateHashPassword(
    password: string
  ): Promise<PersistedPassword> {
    return new Promise<PersistedPassword>((accept, reject) => {
      const salt = crypto
        .randomBytes(SALT_LENGTH)
        .toString(BYTE_TO_STRING_ENCODING);
      crypto.pbkdf2(
        password,
        salt,
        ITERATIONS,
        PASSWORD_LENGTH,
        DIGEST,
        (error, hash) => {
          if (error) {
            return reject(error);
          }
  
          accept({
            salt,
            hash: hash.toString(BYTE_TO_STRING_ENCODING),
            iterations: ITERATIONS,
          });
        }
      );
    });
}

/**
 * Verifies the attempted password against the password information saved in
 * the database. This should be called when
 * the user tries to log in.
 */
export function verifyPassword(
    persistedPassword: PersistedPassword,
    passwordAttempt: string
  ): Promise<boolean> {
    return new Promise<boolean>((accept, reject) => {
      crypto.pbkdf2(
        passwordAttempt,
        persistedPassword.salt,
        persistedPassword.iterations,
        PASSWORD_LENGTH,
        DIGEST,
        (error, hash) => {
          if (error) {
            return reject(error);
          }
  
          accept(
            persistedPassword.hash === hash.toString(BYTE_TO_STRING_ENCODING)
          );
        }
      );
    });
}

/**
 * Example
 */
generateHashPassword('very secret password').then((pwd: PersistedPassword) => {
    const hashPassword = pwd;

    // Check if Password is valid
    verifyPassword(hashPassword, 'very secret password').then((isValid: boolean) => {
        isValid ? console.log('Password is valid') : console.error('Password is invalid')
    })
})

/** Kollision
 * - zwei unterschiedliche Daten in einer Hash-Tabelle haben denselben Hash-Wert
 */

/** Rainbow-Tabellen
 * - Datenstruktur, die speziell für das Knacken von Passwörtern entwickelt wurde
 * - nutzen eine bestimmte Eigenschaft von Hashfunktionen aus: dieselbe Eingabe (z.B. ein Passwort) erzeugt immer denselben Hashwert
 */

/** Wie können Kollisionen oder Rainbow-Tabellen für einen Angriff verwendet werden?
 * - Direkte Suche: 
 *   Wenn ein Angreifer den Hash eines gestohlenen Passworts hat, sucht er in einer vorberechneten Rainbow-Tabelle nach diesem Hash. 
 *   Findet er ihn, kann er das zugehörige Klartext-Passwort ablesen.
 * 
 * - Generierung von Kollisionen
 *   Durch geschickte Manipulation der Eingabedaten können Angreifer zwei verschiedene Eingaben finden, die denselben Hashwert erzeugen.
 * 
 * - Vorberechnung
 *   Rainbow-Tabellen können verwendet werden, um einen Teil des Suchraums bei Brute-Force-Angriffen vorzuberechnen.
 */

/** Salting und Peppering
 *  - Salting --> zufällige Zeichenfolge, die einem Passwort hinzugefügt wird, bevor es gehasht wird
 *  - Peppering --> vor dem Hashing wird dem Passwort ein geheimer Schlüssel hinzugefügt, ähnlich wie beim Salting
 */