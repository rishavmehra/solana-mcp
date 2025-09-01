import { address } from "@solana/kit";
import { rpc } from "../utils/rpc";
import "../utils/pollyfill";

export const getAccountInfo = async (args: { [x: string]: any }, extra: any) => {
   try {
        const pubkey = address(args.account)
        const accountInfo = await rpc.getAccountInfo(pubkey).send()
        const value = accountInfo.value
        return {
            content: [
                {
                    type: "text" as const,
                    text: `account info for ${pubkey} is ${JSON.stringify(value)}`
                }
            ]
        }
   } catch (error) {
        return {
            content: [
                {
                    type: "text" as const,
                    text: `not able to fetch the account info or may be the account doesnt exists ${error}`
                },
                {
                    type: "text" as const,
                    text: `error: ${error}`
                }
            ],
            isError: true
        }
    }
};