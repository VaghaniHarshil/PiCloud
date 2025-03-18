import crypto from "crypto";

const algorithm = "aes-256-ctr";
let key = process.env.ENCRYPTION_KEY;

key = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);



export const encrypt = async (buffer: crypto.BinaryLike | Buffer<ArrayBuffer>) => {
    // Create an initialization vector
    const iv = crypto.randomBytes(16);

    // Create a new cipher using the algorithm, key, and iv
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    // Create the new (encrypted) buffer
    const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);

    return result;
};
