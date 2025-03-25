import admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";

// 🔥 Ensure firebase.json path is correct
const serviceAccountPath = path.join(__dirname, "firebase.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ Firebase service account file not found:", serviceAccountPath);
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// ✅ Export admin instance
export default admin;
