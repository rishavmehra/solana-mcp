import { createSolanaRpc } from "@solana/kit";

const mainnet_url = process.env.RPC_URL
export const rpc = createSolanaRpc(mainnet_url || "");
