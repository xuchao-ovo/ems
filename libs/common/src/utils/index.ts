const { subtle } = require('node:crypto').webcrypto;

export class mcrypto{
    constructor(){}
    async digest(data: string, algorithm = 'SHA-512'): Promise<string> {
    const ec = new TextEncoder();
    const digest: string = await subtle.digest(algorithm, ec.encode(data));
    return digest;
    }
}