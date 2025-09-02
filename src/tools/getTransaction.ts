import { type Signature } from "@solana/kit";
import { rpc } from "../utils/rpc";

export async function getTransactioninfo(args: { [signature: string]: any }, extra: any) {
    try {
        const tx = await rpc.getTransaction(args.signature as Signature).send()
        let blocktime = String(tx?.blockTime)
        let cunit = String(tx?.meta?.computeUnitsConsumed)
        let slot = String(tx?.slot)
        let version = String(tx?.version)
        let fee = String(tx?.meta?.fee)
        let postBalances = String(tx?.meta?.postBalances)
        let preBalances = String(tx?.meta?.preBalances)
        let recentBlockhash = String(tx?.transaction?.message?.recentBlockhash)
        return {
            content: [
                {
                    type: "text" as const,
                    text: ` Transaction consumed the ${cunit} CU units and this the blocktime of transaction: ${blocktime} `
                },
                {
                    type: "text" as const,
                    text: `Transaction version: ${version}`
                },
                {
                    type: "text" as const,
                    text: `Transaction fee: ${fee}`
                },
                {
                    type: "text" as const,
                    text: `Transaction postBalances: ${postBalances}`
                },
                {
                    type: "text" as const,
                    text: `Transaction preBalances: ${preBalances}`
                },
                {
                    type: "text" as const,
                    text: `Transaction recentBlockhash: ${recentBlockhash}`
                },
                {
                    type: "text" as const,
                    text: `Transaction slot: ${slot}`
                }
            ]
        }
    } catch(error) {
        return {
            content: [
                {
                    type: "text" as const,
                    text: `Error while looking for this transaction signature ${args.signature}`
                }
            ]
        }
    }


}