# 🚀 Solana Web3: DBC to DAMM V2 Token Launch Assignment

This project simulates a full token launch lifecycle on the Solana Devnet using TypeScript, covering:

- ✅ Dynamic Bonding Curve (DBC) simulation
- ✅ DAMM V2 migration logic
- ✅ Fee collection and claim logic
- ✅ Token trading simulation
- ✅ Devnet wallet setup and usage

---

## 📦 Tech Stack

- **Solana Devnet** with `@solana/web3.js` and SPL Token
- **TypeScript** via `ts-node`
- **dotenv** for environment handling
- Simulated logic for:
  - Bonding curve pricing
  - Migration trigger
  - Platform/creator fees

---

## 🛠️ Scripts Overview

| Script           | Purpose                                                   |
|------------------|-----------------------------------------------------------|
| `launch.ts`      | Mint SPL token (10B supply) and initialize creator wallet |
| `buy.ts`         | Simulate a user buying tokens using SOL                   |
| `migrate.ts`     | Trigger migration to DAMM V2 when reserve ≥ 85.85 SOL     |
| `claim_fees.ts`  | Simulate platform + creator fee collection                |

---

## 🧪 How to Run

### 1. Install Dependencies

```bash
npm install
npm run launch
npm run buy
npm run migrate
npm run claim

## 📄 Timeline & Understanding

See `timeline.md` or below for breakdown:

- **Day 1:** Solana CLI setup, Devnet wallets
- **Day 2:** Token mint + `launch.ts`
- **Day 3:** User buy logic + `buy.ts`
- **Day 4:** Migration logic + `migrate.ts`
- **Day 5:** Fee simulation + `claim_fees.ts`
- **Day 6:** Solscan TXs + final testing


