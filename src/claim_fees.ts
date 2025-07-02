// src/claim_fees.ts

import {
  Connection,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import * as fs from "fs";
import dotenv from "dotenv";

dotenv.config();

function loadKeypair(path: string): Keypair {
  const secret = JSON.parse(fs.readFileSync(path, "utf8"));
  return Keypair.fromSecretKey(new Uint8Array(secret));
}

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const creator = loadKeypair(process.env.CREATOR_KEYPAIR!);
  const platform = loadKeypair(process.env.PLATFORM_KEYPAIR!);

  const creatorPubkey = creator.publicKey;
  const platformPubkey = platform.publicKey;

  const totalReserveLamports = await connection.getBalance(creatorPubkey);
  const totalReserveSOL = totalReserveLamports / LAMPORTS_PER_SOL;

  // Define fee percentages
  const platformFeeRate = 0.005; // 0.5%
  const creatorFeeRate = 0.045; // e.g., 4.5% (can adjust)

  const platformFee = totalReserveSOL * platformFeeRate;
  const creatorFee = totalReserveSOL * creatorFeeRate;

  console.log(`📊 Total Reserve Collected: ${totalReserveSOL.toFixed(4)} SOL`);

  console.log(`💸 Platform Fee (0.5%): ${platformFee.toFixed(4)} SOL`);
  console.log(`💰 Creator Fee (4.5%): ${creatorFee.toFixed(4)} SOL`);

  console.log(`✅ Fees would be transferred to:`);
  console.log(`   🧾 Platform Wallet: ${platformPubkey.toBase58()}`);
  console.log(`   🧾 Creator Wallet: ${creatorPubkey.toBase58()}`);
})();
