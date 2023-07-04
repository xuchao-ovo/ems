const crypto = require('crypto');
const key = '1234567890123456';
const iv = '1234567890123456';

export class mcrypto {
  // 加密
  async encrypt(data: string) {
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    let encrypted: string = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }

  // 解密
  async decrypt(encrypted: string) {
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    let decrypted: string = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}