import * as openpgp from 'openpgp';

export async function encrypt(publicKeyArmored: string) {
    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
    const encrypted = await openpgp.encrypt({
      message:  await openpgp.createMessage({text: 'Secret data'}),
      encryptionKeys: publicKey
    });

    console.log(encrypted);
    
    return encrypted;
}