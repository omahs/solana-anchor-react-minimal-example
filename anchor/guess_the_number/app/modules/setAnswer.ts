import { utils } from '@project-serum/anchor';
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";

export const setAnswer = async(program: any, taker: Keypair, mint: PublicKey) => {
  const answer = 'Number 1';

  const [userAnswersPDA, _] = await PublicKey.findProgramAddress(
    [
      utils.bytes.utf8.encode('user-answers'),
      taker.publicKey.toBuffer(),
    ],
    program.programId
  )

  const signature = await program.methods
    .createUserAnswers(mint, answer)
    .accounts({
      user: taker.publicKey,
      userAnswers: userAnswersPDA,
    })
    .signers([taker])
    .rpc()

  const fetchUserAnswers = await program.account.userAnswers.fetch(userAnswersPDA);
  console.log(fetchUserAnswers.mint);
  console.log(fetchUserAnswers.answer);
  console.log('signature =>', signature);
};