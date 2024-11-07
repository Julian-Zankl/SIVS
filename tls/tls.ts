/**
 * Transport Layer Security - TLS
 */
import express, { Application, Request, Response } from 'express';
import path from 'path';
import * as https from 'https';
import * as fs from 'fs';


const app: Application = express(); 
  
app.get("/", (req: Request, res: Response) => { 
    res.send("I am running on https!") 
});

const __dirname = path.resolve();
const httpsServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'tls', "key.pem")), 
    cert: fs.readFileSync(path.join(__dirname, 'tls', "cert.pem")),
}, app) ;
  
httpsServer.listen(3000, () => { 
    console.log("HTTPS server up and running on port 3000") 
});

/** Befehle
 * openssl genrsa --out C:\Users\julia\Documents\Projekte\SIVS\tls\key.pem
 * 
 * openssl req -new -key C:\Users\julia\Documents\Projekte\SIVS\tls\key.pem -out C:\Users\julia\Documents\Projekte\SIVS\tls\csr.pem
 * 
 * openssl x509 -req -days 365 -in C:\Users\julia\Documents\Projekte\SIVS\tls\csr.pem -signkey C:\Users\julia\Documents\Projekte\SIVS\tls\key.pem -out C:\Users\julia\Documents\Projekte\SIVS\tls\cert.pem
 */

/** Nutzen von TLS
 * - fundamentales Protokoll für die sichere Datenübertragung im Internet
 * - sorgt dafür, dass die Kommunikation zwischen einem Client (z.B. Ihrem Browser) und einem Server (z.B. einer Website) verschlüsselt wird
 * - sorgt dafür, dass diese Kommunikation vor unbefugtem Zugriff geschützt wird
 */