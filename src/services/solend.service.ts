import { SolendMarket } from "@solendprotocol/solend-sdk";
import { Connection } from "@solana/web3.js";

export class SolendService {
    private connection: Connection;
    private market?: SolendMarket;

    constructor() {
        this.connection = new Connection("https://api.mainnet-beta.solana.com");
    }

    async initialize(): Promise<void> {
        this.market = await SolendMarket.initialize(this.connection);
        await this.market.loadReserves();
    }

    async getAllPools(): Promise<any[]> {
        if (!this.market) {
            throw new Error("Solend market not initialized");
        }

        return this.market.reserves.map((reserve) => ({
            config: reserve.config,
            stats: reserve.stats,
        }));
    }
}
