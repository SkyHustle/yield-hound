import express from "express";
import { SolendService } from "./services/solend.service";

const app = express();
const port = process.env.PORT || 3000;

const solendService = new SolendService();

app.get("/api/high-yield-pools", async (req, res) => {
    try {
        const minYield = req.query.minYield ? Number(req.query.minYield) : 5;
        const pools = await solendService.getHighYieldPools(minYield);

        // Format the response as a markdown table
        const tableHeader =
            "| Token Symbol | Deposits | Borrow APY | Lend APY | TVL | Utilization | Fees |\n" +
            "|-------------|----------|------------|-----------|-----|-------------|------|";

        const tableRows = pools
            .map((pool) => {
                return `| ${
                    pool.tokenSymbol
                } | $${pool.deposits.toLocaleString()} | ${pool.borrowAPY.toFixed(
                    2
                )}% | ${pool.lendAPY.toFixed(
                    2
                )}% | $${pool.tvl.toLocaleString()} | ${pool.utilization.toFixed(
                    2
                )}% | ${(pool.fees * 100).toFixed(2)}% |`;
            })
            .join("\n");

        const markdownTable = `${tableHeader}\n${tableRows}`;
        res.send(markdownTable);
    } catch (error) {
        console.error("Error fetching pools:", error);
        res.status(500).send("Error fetching lending pools");
    }
});

app.listen(port, async () => {
    try {
        await solendService.initialize();
        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.error("Failed to initialize Solend service:", error);
        process.exit(1);
    }
});
