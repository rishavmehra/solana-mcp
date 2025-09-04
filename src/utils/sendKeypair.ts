import { Keypair, PublicKey } from '@solana/web3.js';

export function senderKeypair() {
    const payerSecretKey = JSON.parse(process.env.SENDER_KEYPAIR || "");
    
    const keypair = Keypair.fromSecretKey(Uint8Array.from(payerSecretKey));
    const pubkey = keypair.publicKey.toBase58()

    if (!keypair) {
    throw new Error('PAYER is not set')
    }

    return { keypair, pubkey }
}

