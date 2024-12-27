import express from "express";
import { SolendService } from "./services/solend.service";
import util from "util";

const app = express();
const port = process.env.PORT || 3000;

const solendService = new SolendService();

app.get("/api/pools", async (req, res) => {
    try {
        const pool = await solendService.getAllPools();
        res.json(pool);
    } catch (error) {
        console.error("Error fetching pools:", error);
        res.status(500).send("Error fetching lending pools");
    }
});

app.listen(port, async () => {
    try {
        await solendService.initialize();
        console.log(`Server is running on port ${port}`);

        // Display SOL pool data
        const pool = await solendService.getAllPools();
        console.log("\nSOL Pool Raw Data:");
        console.log(
            util.inspect(pool, {
                colors: true,
                depth: null,
                maxArrayLength: null,
                compact: false,
            })
        );
    } catch (error) {
        console.error("Failed to initialize Solend service:", error);
        process.exit(1);
    }
});
