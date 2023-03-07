import {
  ConsecutiveTransfer as ConsecutiveTransferEvent,
  Invited as InvitedEvent,
  Referral as ReferralEvent,
  Withdrawal as WithdrawalEvent,
} from "../generated/Lizard/Lizard";
import { Transfer as TransferEvent } from "../generated/Vivid/Vivid";
import {
  ConsecutiveTransfer,
  Invited,
  Referral,
  Withdrawal,
} from "../generated/schema";
import { handleCollectionTransfer } from "./vivid";

export function handleConsecutiveTransfer(
  event: ConsecutiveTransferEvent
): void {
  let entity = new ConsecutiveTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.fromTokenId = event.params.fromTokenId;
  entity.toTokenId = event.params.toTokenId;
  entity.from = event.params.from;
  entity.to = event.params.to;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleInvited(event: InvitedEvent): void {
  let entity = new Invited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.key = event.params.key;
  entity.cid = event.params.cid;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleReferral(event: ReferralEvent): void {
  let entity = new Referral(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.affiliate = event.params.affiliate;
  entity.wad = event.params.wad;
  entity.numMints = event.params.numMints;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleWithdrawal(event: WithdrawalEvent): void {
  let entity = new Withdrawal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.src = event.params.src;
  entity.wad = event.params.wad;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  handleCollectionTransfer(event, "LZD7");
}
