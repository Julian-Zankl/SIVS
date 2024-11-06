async function encrypt(publicKeyArmored: string) {
    const plainData = fs.readFileSync("secrets.txt");
    const encrypted = await openpgp.encrypt({
      message: openpgp.message.fromText(plainData),
      publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys,
    });
  
    fs.writeFileSync("encrypted-secrets.txt", encrypted.data);
  }