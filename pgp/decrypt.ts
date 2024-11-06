import * as openpgp from 'openpgp';

export async function decrypt(msg: string, privateKeyArmored: string, passphrase: string) {
    const message = await openpgp.readMessage({
        armoredMessage: msg // parse armored message
    });

    const privateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
        passphrase
    });

    const decrypted = await openpgp.decrypt({
        message,
        decryptionKeys: privateKey
    });

    return decrypted.data;
  }