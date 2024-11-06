async function generate() {
  const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
    userIds: [{ name: "julian", email: "julian.zankl@fh-burgenland.at" }],
    curve: "ed25519",
    passphrase: "qwerty",
  });
  console.log(privateKeyArmored);
  console.log(publicKeyArmored);
}