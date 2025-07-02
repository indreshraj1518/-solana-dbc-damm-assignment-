// src/buy.ts

import {
  Connection,
  PublicKey,
  Keypair,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import * as fs from "fs";
import dotenv from "dotenv";

dotenv.config();

function loadKeypair(path: string): Keypair {
  const secret = JSON.parse(fs.readFileSync(path, "utf8"));
  return Keypair.fromSecretKey(new Uint8Array(secret));
}

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const user1 = loadKeypair(process.env.USER1_KEYPAIR!);
  const creator = loadKeypair(process.env.CREATOR_KEYPAIR!);

  const tokenMint = new PublicKey(
    "BhLasbvkfsfbv4xjFshF1298ob3pWb6adWbsnx29NzwC"
  ); // Replace with your real mint

  // Step 1: Transfer 0.5 SOL from user1 to creator
  const solAmount = 0.5 * LAMPORTS_PER_SOL;

  const solTx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: user1.publicKey,
      toPubkey: creator.publicKey,
      lamports: solAmount,
    })
  );

  const sig = await sendAndConfirmTransaction(connection, solTx, [user1]);
  console.log(`💸 Sent 0.5 SOL from user1 to creator ✅ TX: ${sig}`);

  // Step 2: Get token accounts
  const creatorTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    creator,
    tokenMint,
    creator.publicKey
  );

  const user1TokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user1,
    tokenMint,
    user1.publicKey
  );

  // Step 3: Simulate bonding curve price (e.g. 1000 tokens per SOL)
  const tokensToBuy = 0.5 * 1000 * 10 ** 9; // 1000 tokens/SOL × 0.5 SOL × decimals

  const transferSig = await transfer(
    connection,
    creator,
    creatorTokenAccount.address,
    user1TokenAccount.address,
    creator,
    tokensToBuy
  );

  console.log(
    `🪙 Transferred ${
      tokensToBuy / 10 ** 9
    } tokens to user1 ✅ TX: ${transferSig}`
  );
})();
