import { SystemProgram, Transaction, PublicKey, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { senderKeypair } from "../utils/sendKeypair"
import { sendAndConfirmTransaction } from "@solana/web3.js"


// todo: Need to implement this in solana/kit
export const sendSol = async (args: { [x: string]: any }, extra: any) => {
  try {
    const sender = senderKeypair()
    const recipient = args.recipient
    const amount = args.amount * LAMPORTS_PER_SOL

    const connection = new Connection(process.env.RPC_URL || "", "confirmed")

    const transferTransaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: sender.keypair.publicKey,
        toPubkey: new PublicKey(recipient),
        lamports: amount
      })
    )

    const signature = await sendAndConfirmTransaction(
      connection,
      transferTransaction,
      [sender.keypair]
    )

    return {
      content: [
        {
          type: "text" as const,
          text: `Transaction sent successfully with signature: ${signature}`
        }
      ]
    }

  } catch (error) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Error while sending SOL: ${error}`
        }
      ]
    }
  }
}
