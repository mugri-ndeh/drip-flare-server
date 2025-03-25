import jwt, { JwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const secretKey = Buffer.from(process.env.ENCRYPTION_KEY!.slice(0, 64), 'hex');

/**
 * Generates a JWT token.
 *
 * @param payload - The payload to encode in the JWT token.
 * @returns The generated JWT token.
 */
export function generateToken(payload: object): string {
  const now = Math.floor(Date.now() / 1000);
  const hours = parseInt(process.env.JWT_TOKEN_EXPIRY_TIME_INHOURS!.replace('h', ''), 10);

  return jwt.sign(
    {
      ...payload,
      iat: now,
      nbf: now,
      exp: now + 3600 * hours,
      iss: 'DTS LLC Security',
    },
    process.env.JWT_PRIVATE_KEY!,
  );
}

/**
 * Decodes a JWT token.
 *
 * @param token - The JWT token to decode.
 * @returns The decoded payload if the token is valid, otherwise throws an error.
 */
export function decodeToken(token: string): string | Object {
  try {
    console.log(jwt.verify(token, process.env.JWT_PRIVATE_KEY!) as string);

    return jwt.verify(token, process.env.JWT_PRIVATE_KEY!) as string;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

/**
 * Function to encrypt data
 * @param text - The text to encrypt
 * @returns The encrypted text, including the IV
 */
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

/**
 * Function to decrypt data
 * @param encryptedText - The encrypted text to decrypt, including the IV
 * @returns The decrypted text
 */
export function decrypt(encryptedText: string): string {
  const [ivHex, encrypted] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
