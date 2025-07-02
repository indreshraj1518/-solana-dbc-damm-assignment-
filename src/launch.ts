// src/launch.ts

import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
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

  console.log("🔑 Creator Public Key:", creator.publicKey.toBase58());

  // Step 1: Create Mint with 9 decimals (like SOL)
  const mint = await createMint(
    connection,
    creator,
    creator.publicKey,
    null,
    9 // decimal places
  );

  console.log("🪙 Token Mint Address:", mint.toBase58());

  // Step 2: Create associated token account for creator
  const creatorTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    creator,
    mint,
    creator.publicKey
  );

  // Step 3: Mint 10B tokens to creator's token account
  const totalSupply = 10_000_000_000 * 10 ** 9; // 10B with 9 decimals
  await mintTo(
    connection,
    creator,
    mint,
    creatorTokenAccount.address,
    creator,
    totalSupply
  );

  console.log("✅ Minted 10B tokens to creator");
  console.log(
    "📦 Creator Token Account:",
    creatorTokenAccount.address.toBase58()
  );
})();
