import crypto, { createHash, randomBytes } from 'crypto';

const ALGORITHM: crypto.CipherGCMTypes = 'aes-256-gcm';
const ENCRYPTION_ENCODING = 'base64';
const IV_SIZE = 12;
const authTagLength = 16;

const createBase64Key = (key: string): string => {
  return createHash('sha256').update(key).digest('base64');
};

export const encryptJson = <T = any>(
  data: T, // any valid JSON value
  key: string, // should be a normal utf8 string
  alg = ALGORITHM, // defaults to AES-256-GCM
): string => {
  const keyBuffer = Buffer.from(createBase64Key(key), 'base64');
  const ivBuffer = randomBytes(IV_SIZE);

  const cipher = crypto.createCipheriv(alg, keyBuffer, ivBuffer);

  const cipherBuffer = Buffer.concat([
    cipher.update(JSON.stringify(data), 'utf8'),
    cipher.final(),
  ]);
  const authTagBuffer = cipher.getAuthTag();

  return Buffer.concat([ivBuffer, cipherBuffer, authTagBuffer]).toString(
    ENCRYPTION_ENCODING,
  );
};

export const decryptJson = <T = any>(
  cipherTextAndTag: string, // base64 string of encrypted data
  key: string,
  alg = ALGORITHM,
): T => {
  const keyBuffer = Buffer.from(createBase64Key(key), 'base64');

  // we assume that the ciphertext is like: iv + ciphertext + authtag
  const textAndTagBuffer = Buffer.from(cipherTextAndTag, ENCRYPTION_ENCODING);
  const ivBuffer = textAndTagBuffer.slice(0, IV_SIZE);
  const cipherText = textAndTagBuffer
    .slice(IV_SIZE, textAndTagBuffer.length - authTagLength)
    .toString(ENCRYPTION_ENCODING);
  const authTagBuffer = textAndTagBuffer.slice(textAndTagBuffer.length - authTagLength);

  const decipher = crypto.createDecipheriv(alg, keyBuffer, ivBuffer);

  decipher.setAuthTag(authTagBuffer);
  const data = Buffer.concat([
    decipher.update(cipherText, ENCRYPTION_ENCODING),
    decipher.final(),
  ]);

  const decryptedDataString = data.toString('utf8');

  return JSON.parse(decryptedDataString);
};
