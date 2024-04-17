// generate-keys.js
const fs = require('fs');
const { base64url } = require('rfc4648');

const privateKey = fs.readFileSync('vapid_private.pem');
const publicKey = fs.readFileSync('vapid_public.pem');

const privateKeyBase64 = base64url.stringify(privateKey);
const publicKeyBase64 = base64url.stringify(publicKey);

console.log('Private Key:', privateKeyBase64);
console.log('Public Key:', publicKeyBase64);