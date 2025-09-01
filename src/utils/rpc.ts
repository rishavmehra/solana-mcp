import { createSolanaRpc } from "@solana/kit";

const mainnet_url = process.env.MAINNET_RPC
export const rpc = createSolanaRpc(mainnet_url || "");