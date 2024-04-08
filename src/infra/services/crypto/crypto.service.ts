import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

// TODO: implementation to complete or replace?
@Injectable()
export class CryptoService {
  private algorithm = 'aes-256-cbc';

  // Generate a secure, random key
  private key = crypto.randomBytes(32);

  // Generate an initialization vector
  private iv = crypto.randomBytes(16);

  encryptData(data: string) {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decryptData(encryptedData: string) {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
