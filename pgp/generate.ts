import * as openpgp from 'openpgp';

export async function generate(passphrase: string) {
  const { privateKey, publicKey } = await openpgp.generateKey({
    userIDs: [{ name: "julian", email: "julian.zankl@mail.at" }],
    curve: "ed25519Legacy",
    passphrase: passphrase,
  });

  console.log(privateKey);
  console.log(publicKey);

  return {privateKey, publicKey}
}