# Project Overview: Solana Lending Pool Analysis

## Project Description

This project aims to develop a server-side application using ExpressJS with TypeScript that interfaces with the Solend Typescript SDK to analyze and report on Solana lending pools. Specifically, the application will:

-   **Fetch Lending Pools**: Query all available lending pools from the Solend protocol.
-   **Filter High Yield Pools**: Filter pools to only include those with a lending APY greater than 5%.
-   **Compile Data**: Gather detailed information on these high-yield pools.
-   **Present Data**: Output the data in a clear, tabular format for easy readability.

## Technical Specifications

### Backend

-   **Framework**: ExpressJS
    -   Chosen for its simplicity, speed, and robustness in handling server-side logic.
-   **Language**: TypeScript
    -   Ensures type safety and better code maintainability.

### SDK Utilization

-   **Solend TypeScript SDK**:
    -   Used for interacting with the Solana blockchain to fetch lending pool data.
    -   Reference: [Solend SDK Documentation](sdk.solend.fi)[](https://sdk.solend.fi/)

### Data to Be Collected

-   **Main Asset or Token Symbol**: The primary token or asset of the pool.
-   **Deposits**: Total amount of assets deposited in the pool.
-   **Borrow APR/APY**: Annual percentage rate or yield for borrowing from the pool.
-   **Lend APR/APY**: Annual percentage rate or yield for lending to the pool, which must exceed 5%.
-   **TVL (Total Value Locked)**: The total value of assets currently locked in the pool.
-   **Utilization**: Percentage of pool assets currently being used for loans.
-   **Fees**: Any applicable fees for deposits, withdrawals, or transactions.

### Data Presentation

-   **Output Format**: A Markdown table to display the filtered lending pool data:

    ```markdown
    | Token Symbol  | Deposits | Borrow APY | Lend APY | TVL  | Utilization | Fees  |
    | ------------- | -------- | ---------- | -------- | ---- | ----------- | ----- |
    | Example Token | $Amount  | X%         | Y%       | $TVL | Z%          | Fee % |
    ```
