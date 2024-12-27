import {
    SolendMarket,
    SolendAction,
    SOLEND_PRODUCTION_PROGRAM_ID,
} from "@solendprotocol/solend-sdk";
import { Connection, PublicKey } from "@solana/web3.js";
import { LendingPoolData } from "../types";

export class SolendService {
    private connection: Connection;
    private market: SolendMarket;

    constructor() {
        this.connection = new Connection("https://api.mainnet-beta.solana.com");
        this.market = new SolendMarket(
            SOLEND_PRODUCTION_PROGRAM_ID,
            this.connection
        );
    }

    async initialize(): Promise<void> {
        await this.market.loadAll();
    }

    async getHighYieldPools(minYield: number = 5): Promise<LendingPoolData[]> {
        const reserves = this.market.reserves;
        const highYieldPools: LendingPoolData[] = [];

        for (const reserve of reserves) {
            const stats = reserve.stats;
            const lendAPY = stats.supplyInterestAPY;

            if (lendAPY >= minYield) {
                highYieldPools.push({
                    tokenSymbol: reserve.config.symbol,
                    deposits: stats.totalDepositsWads.toNumber(),
                    borrowAPY: stats.borrowInterestAPY,
                    lendAPY: lendAPY,
                    tvl: stats.totalDepositsUSD,
                    utilization: stats.utilizationRate * 100,
                    fees: reserve.config.fees.borrowFeeWad.toNumber() / 1e18,
                });
            }
        }

        return highYieldPools.sort((a, b) => b.lendAPY - a.lendAPY);
    }
}
