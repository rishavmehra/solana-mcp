
export async function solPrice() {
    try {
        const res = await fetch("https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d")
        const data = await res.json()
        // @ts-ignore
        let parsed = data.parsed[0];
        let lamports_price = parsed.price.price;
        let expo = parsed.price.expo
        let expo_cal = Math.pow(10 , expo);   
        let solPrice = Number(lamports_price) * expo_cal 

        return {
            content: [
                {
                    type: "text" as const,
                    text: `This is the current Sol Price ${solPrice}`
                }
            ]
        }

    } catch (error) {
        return {
            content: [
                {
                    type: "text" as const,
                    text: `unable to fetch the price of Sol ${error}`
                }
            ]
        }
    }
}

