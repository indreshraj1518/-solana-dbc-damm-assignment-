// src/migrate.ts

import {
  Connection,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
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
  const creatorPubkey = creator.publicKey;

  const balance = await connection.getBalance(creatorPubkey);
  const solBalance = balance / LAMPORTS_PER_SOL;

  console.log(`📊 Creator Reserve Balance: ${solBalance.toFixed(4)} SOL`);

  const threshold = 85.85;

  if (solBalance >= threshold) {
    console.log(
      `🚀 Reserve ≥ ${threshold} SOL — Migration to DAMM V2 triggered!`
    );
    console.log(
      `✅ Simulated creation of DAMM V2 pool with same token + fee config`
    );
  } else {
    console.log(
      `⏳ Reserve < ${threshold} SOL — Waiting for more buys before migrating...`
    );
    console.log(
      `🕓 ${(threshold - solBalance).toFixed(
        2
      )} SOL remaining to trigger migration`
    );
  }
})();
