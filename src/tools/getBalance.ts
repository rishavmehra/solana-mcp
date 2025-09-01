import { address } from "@solana/kit";
import { rpc } from "../utils/rpc";

export const getBalance = async (args: { [x: string]: any }, extra: any) => {
    try{
        const adr = address(args.walletAddress);
        const lamportsResponse = await rpc.getBalance(adr)
        const response = await lamportsResponse.send()
        const lamports = response.value
        const balanceInSol = Number(lamports) / 1_000_000_000
        return {
            content: [
                {
                    type: "text" as const,
                    text: `balance for ${args.walletAddress} is ${balanceInSol} SOL`
                }
            ]
        }
    } catch (error) {
        return {
            content: [
                {
                    type: "text" as const,
                    text: `not able to fetch the balance or may be the account doesnt exists ${error}`
                }
            ],
            isError: true
        }
    }
}

