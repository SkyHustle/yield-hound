export interface LendingPoolData {
    tokenSymbol: string;
    deposits: number;
    borrowAPY: number;
    lendAPY: number;
    tvl: number;
    utilization: number;
    fees: number;
}
