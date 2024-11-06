async function decrypt(privateKeyArmored: string, passphrase: string) {
    const privateKey = (await openpgp.key.readArmored([privateKeyArmored])).keys[0];
    await privateKey.decrypt(passphrase);
  
    const encryptedData = fs.readFileSync("encrypted-secrets.txt");
    const decrypted = await openpgp.decrypt({
      message: await openpgp.message.readArmored(encryptedData),
      privateKeys: [privateKey],
    });
  
    console.log(decrypted.data);
  }