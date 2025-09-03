import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import z from "zod";
import { getBalance } from "./tools/getBalance";
import { getAccountInfo } from "./tools/getAccountInfo";
import { getTokenAccountAddresses } from "./tools/getToken";
import { getTransactioninfo } from "./tools/getTransaction";
import { solPrice } from "./tools/solPrice";


const server = new McpServer({
    name: "solana-mcp",
    version: "1.0.0",
})

server.tool(
    "getBalance", 
    "Get the balance for a Solana wallet address",
    { account: z.string().describe("Wallet address to check the balance for") },
    getBalance
)

server.tool(
    "getAccountInfo", 
    "Get the account info for a Solana wallet address",
    { account: z.string().describe("Wallet address to check the account info for") },
    getAccountInfo
)

server.tool(
    "getToken",
    "get token account addresses, mint addresses, amount and decimals for a Solana wallet address",
    { account: z.string().describe("Wallet address to check the token account addresses for") },
    getTokenAccountAddresses
)

server.tool(
    "getTransaction",
    "get transaction from signature ",
    { signature: z.string().describe("Wallet address to check the token account addresses for") },
    getTransactioninfo
)

server.tool(
    "solPrice",
    "get the price of SOL",
    {},
    solPrice
)

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Solana MCP Server running on stdio");
  }
  
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});

// const walletAddress = process.env.WALLET_ADDRESS || ""

// // async function main () {
// //     // let res = await getBalance({walletAddress: walletAddress}, {} as any)
// //     // let res2 = await getAccountInfo({account: walletAddress}, {} as any)
// //     // let res3 = await getTokenAccountAddresses({account: walletAddress}, {} as any)
// //     let tranaction = await getTransactioninfo({signature: "476TQoZfEzstwdzjjVXuRD5Sp5bdyxSEUyVBoFvdHqjLgMh6xv4XB6c893gjyeT2nvHTML2QWssJSc4vu9kbrQAQ"}, {} as const)
// //     console.log(tranaction);
// // }

// // main()°