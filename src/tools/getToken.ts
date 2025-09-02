import { address } from "@solana/kit";
import { rpc } from "../utils/rpc";
import { TOKEN_PROGRAM, TOKEN_PROGRAM_2022 } from "../utils/const";

export async function getTokenAccountAddresses(args: { [x: string]: any }, extra: any) {
    try {
        const pubkey = address(args.account)

        const account = await Promise.all([
            rpc.getTokenAccountsByOwner(
                pubkey,
                { programId: TOKEN_PROGRAM },
                { encoding: "jsonParsed" }
            ).send(),
            rpc.getTokenAccountsByOwner(
                pubkey,
                { programId: TOKEN_PROGRAM_2022 },
                { encoding: "jsonParsed" }
            ).send()
        ])
        const pdaAccounts = account.flat()
        const fieldTokenAccount = pdaAccounts.flatMap((account: any) =>
            account.value.map((account: any) => ({
                pdaPubkey: account.pubkey,
                mint: account.account.data.parsed.info.mint,
                amount: account.account.data.parsed.info.tokenAmount.uiAmountString,
                decimals: account.account.data.parsed.info.tokenAmount.decimals
            }))
        )
        
        if (fieldTokenAccount.length === 0) {
            return {
                content: [
                    {
                        type: "text" as const,
                        text: "No token accounts found for this wallet address."
                    }
                ]
            }
        }

        const tokenSummary = fieldTokenAccount.map((token, index) => 
            `Token ${index + 1}:\n` +
            `  Token Account Address: ${token.pdaPubkey}\n` +
            `  Mint Address: ${token.mint}\n` +
            `  Amount: ${token.amount}\n` +
            `  Decimals: ${token.decimals}`
        ).join('\n\n');

        return {
            content: [
                {
                    type: "text" as const,
                    text: `Found ${fieldTokenAccount.length} token account(s):\n\n${tokenSummary}`
                }
            ]
        }
    } catch (error) {
        return {
            content: [
                {
                    type: "text" as const,
                    text: `Error fetching token account addresses: ${error}`
                }
            ]
        }
    }
}


