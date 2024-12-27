"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolendService = void 0;
const solend_sdk_1 = require("@solendprotocol/solend-sdk");
const web3_js_1 = require("@solana/web3.js");
class SolendService {
    constructor() {
        this.connection = new web3_js_1.Connection("https://api.mainnet-beta.solana.com");
    }
    async initialize() {
        this.market = await solend_sdk_1.SolendMarket.initialize(this.connection);
        await this.market.loadAll();
    }
    async getHighYieldPools(minYield = 5) {
        if (!this.market) {
            throw new Error("Solend market not initialized");
        }
        const reserves = this.market.reserves;
        const highYieldPools = [];
        for (const reserve of reserves) {
            const stats = reserve.stats;
            if (!stats)
                continue;
            const lendAPY = stats.supplyInterestAPY;
            if (lendAPY >= minYield) {
                const totalDeposits = stats.totalDepositsWads.toNumber() / 1e9;
                const totalBorrows = stats.totalBorrowsWads.toNumber() / 1e9;
                highYieldPools.push({
                    tokenSymbol: reserve.config.symbol,
                    deposits: totalDeposits,
                    borrowAPY: stats.borrowInterestAPY,
                    lendAPY: lendAPY,
                    tvl: totalDeposits * stats.assetPriceUSD,
                    utilization: (totalBorrows / totalDeposits) * 100,
                    fees: 0.3, // Default platform fee
                });
            }
        }
        return highYieldPools.sort((a, b) => b.lendAPY - a.lendAPY);
    }
}
exports.SolendService = SolendService;
