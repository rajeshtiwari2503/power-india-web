/**
 * AES-256-GCM encryption for sensitive fields (e.g. govPortalLogin).
 *
 * Requires env var: ENCRYPTION_KEY (64 hex chars = 32 bytes)
 * Generate with:  openssl rand -hex 32
 *
 * Usage in models/index.ts:
 *   import { encrypt, decrypt } from "@/lib/encryption";
 *
 *   certificationSchema.pre("save", function () {
 *     if (this.isModified("govPortalLogin") && this.govPortalLogin) {
 *       this.govPortalLogin = encrypt(this.govPortalLogin);
 *     }
 *   });
 *
 *   // In your API route after .lean():
 *   cert.govPortalLogin = decrypt(cert.govPortalLogin);
 */

import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const ALGO       = "aes-256-gcm";
const KEY_HEX    = process.env.ENCRYPTION_KEY || "";

function getKey(): Buffer {
  if (!KEY_HEX || KEY_HEX.length !== 64) {
    throw new Error(
      "ENCRYPTION_KEY env var is missing or invalid. " +
      "Generate with: openssl rand -hex 32"
    );
  }
  return Buffer.from(KEY_HEX, "hex");
}

/**
 * Encrypts a plaintext string.
 * Returns a base64 string in format: iv:authTag:ciphertext
 */
export function encrypt(plaintext: string): string {
  const key    = getKey();
  const iv     = randomBytes(12); // 96-bit IV for GCM
  const cipher = createCipheriv(ALGO, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return [
    iv.toString("base64"),
    authTag.toString("base64"),
    encrypted.toString("base64"),
  ].join(":");
}

/**
 * Decrypts a string produced by encrypt().
 * Returns original plaintext, or the input unchanged if it doesn't look encrypted.
 */
export function decrypt(ciphertext: string): string {
  if (!ciphertext || !ciphertext.includes(":")) return ciphertext; // not encrypted yet

  const [ivB64, tagB64, dataB64] = ciphertext.split(":");
  const key     = getKey();
  const iv      = Buffer.from(ivB64,  "base64");
  const authTag = Buffer.from(tagB64, "base64");
  const data    = Buffer.from(dataB64,"base64");

  const decipher = createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(authTag);

  return Buffer.concat([
    decipher.update(data),
    decipher.final(),
  ]).toString("utf8");
}
