import { SolendMarket } from "@solendprotocol/solend-sdk";
import { Connection } from "@solana/web3.js";
import { LendingPoolData } from "../types";

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

    async getAllPools(): Promise<LendingPoolData[]> {
        if (!this.market) {
            throw new Error("Solend market not initialized");
        }

        return this.market.reserves.map((reserve) => {
            const stats = reserve.stats;

            // Safely convert big numbers to string first
            const totalDepositsStr =
                stats?.totalDepositsWads?.toString() || "0";
            const totalBorrowsStr = stats?.totalBorrowsWads?.toString() || "0";

            // Convert to regular numbers with proper scaling
            const totalDeposits = Number(totalDepositsStr) / 1e18; // Adjust scaling factor
            const totalBorrows = Number(totalBorrowsStr) / 1e18;

            return {
                tokenSymbol: reserve.config.symbol || "Unknown",
                deposits: totalDeposits,
                borrowAPY: stats?.borrowInterestAPY || 0,
                lendAPY: stats?.supplyInterestAPY || 0,
                tvl: totalDeposits * (stats?.assetPriceUSD || 0),
                utilization:
                    totalBorrows > 0 ? (totalBorrows / totalDeposits) * 100 : 0,
                fees: 0.3,
            };
        });
    }
}
