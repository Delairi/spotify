import admin from "firebase-admin";
import path,{ dirname } from 'path'
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url))

const serviceAccount = path.join(__dirname, "../service_account.json")

export const initializeApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});