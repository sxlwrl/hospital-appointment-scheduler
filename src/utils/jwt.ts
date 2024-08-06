import crypto from 'crypto';
import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../../.env') });

const SECRET_KEY = process.env.JWT_KEY as string;

const getSignature = function (header: string, payload: string) {
  return crypto
    .createHmac('sha256', SECRET_KEY)
    .update(`${header}.${payload}`)
    .digest('base64');
};

/**
 *
 * @param payload - information that should be encoded in token
 * @param expiresIn - time in seconds during which the token will be valid
 * @param alg - hashing algorithm
 */

export const generateToken = function (
  payload: object,
  expiresIn: number,
  alg: string,
): string {
  const header = JSON.stringify({ alg: alg, typ: 'JWT' });
  const encodedHeader = Buffer.from(header).toString('base64');

  const fullPayload = JSON.stringify({
    ...payload,
    exp: Math.floor(Date.now() / 1000) + expiresIn,
  });

  const encodedPayload = Buffer.from(fullPayload).toString('base64');

  const signature = getSignature(encodedHeader, encodedPayload);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

/**
 *
 * @param token - jwt token
 */

export const verifyToken = function (token: string): boolean {
  const [header, payload, signature] = token.split('.');

  const expectedSignature = getSignature(header, payload);

  if (expectedSignature !== signature) {
    return false;
  }

  const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString());
  return decodedPayload.exp > Math.floor(Date.now() / 1000);
};

// const token = generateToken({ userId: 2, role: 'user' }, 2, 'HS384');
// console.log(token);
//
// setTimeout(() => console.log(verifyToken(token)), 3000);
