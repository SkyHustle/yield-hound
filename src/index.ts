import express from "express";
import { SolendService } from "./services/solend.service";

const app = express();
const port = process.env.PORT || 3000;

const solendService = new SolendService();

app.get("/api/pools", async (req, res) => {
    try {
        const pools = await solendService.getAllPools();
        res.json(pools.slice(0, 10));
    } catch (error) {
        console.error("Error fetching pools:", error);
        res.status(500).send("Error fetching lending pools");
    }
});

app.listen(port, async () => {
    try {
        await solendService.initialize();
        console.log(`Server is running on port ${port}`);

        // Display first 10 pools as raw JSON
        const pools = await solendService.getAllPools();
        console.log("\nFirst 10 Pools (Raw Data):");
        console.log(JSON.stringify(pools.slice(0, 10), null, 2));
    } catch (error) {
        console.error("Failed to initialize Solend service:", error);
        process.exit(1);
    }
});
