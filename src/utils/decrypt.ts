import crypto from "crypto";

const algorithm = "aes-256-ctr";
let key = process.env.ENCRYPTION_KEY;

key = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);


const decrypt = (encrypted: string | any[] | NodeJS.ArrayBufferView<ArrayBufferLike> | Buffer<ArrayBuffer>) => {
    if (typeof encrypted !== "string") throw new Error("Payload malformed!");

   // Get the iv: the first 16 bytes
   const iv = encrypted.slice(0, 16);

   // Get the rest
   encrypted = encrypted.slice(16);

   // Create a decipher
   const decipher = crypto.createDecipheriv(algorithm, key, iv);

   // Actually decrypt it
   const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
   
   return result;
};

// look into this error