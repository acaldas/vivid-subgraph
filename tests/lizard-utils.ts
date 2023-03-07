import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  ConsecutiveTransfer,
  Invited,
  Referral,
  Withdrawal
} from "../generated/Lizard/Lizard"

export function createConsecutiveTransferEvent(
  fromTokenId: BigInt,
  toTokenId: BigInt,
  from: Address,
  to: Address
): ConsecutiveTransfer {
  let consecutiveTransferEvent = changetype<ConsecutiveTransfer>(newMockEvent())

  consecutiveTransferEvent.parameters = new Array()

  consecutiveTransferEvent.parameters.push(
    new ethereum.EventParam(
      "fromTokenId",
      ethereum.Value.fromUnsignedBigInt(fromTokenId)
    )
  )
  consecutiveTransferEvent.parameters.push(
    new ethereum.EventParam(
      "toTokenId",
      ethereum.Value.fromUnsignedBigInt(toTokenId)
    )
  )
  consecutiveTransferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  consecutiveTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return consecutiveTransferEvent
}

export function createInvitedEvent(key: Bytes, cid: Bytes): Invited {
  let invitedEvent = changetype<Invited>(newMockEvent())

  invitedEvent.parameters = new Array()

  invitedEvent.parameters.push(
    new ethereum.EventParam("key", ethereum.Value.fromFixedBytes(key))
  )
  invitedEvent.parameters.push(
    new ethereum.EventParam("cid", ethereum.Value.fromFixedBytes(cid))
  )

  return invitedEvent
}

export function createReferralEvent(
  affiliate: Address,
  wad: BigInt,
  numMints: BigInt
): Referral {
  let referralEvent = changetype<Referral>(newMockEvent())

  referralEvent.parameters = new Array()

  referralEvent.parameters.push(
    new ethereum.EventParam("affiliate", ethereum.Value.fromAddress(affiliate))
  )
  referralEvent.parameters.push(
    new ethereum.EventParam("wad", ethereum.Value.fromUnsignedBigInt(wad))
  )
  referralEvent.parameters.push(
    new ethereum.EventParam(
      "numMints",
      ethereum.Value.fromUnsignedBigInt(numMints)
    )
  )

  return referralEvent
}

export function createWithdrawalEvent(src: Address, wad: BigInt): Withdrawal {
  let withdrawalEvent = changetype<Withdrawal>(newMockEvent())

  withdrawalEvent.parameters = new Array()

  withdrawalEvent.parameters.push(
    new ethereum.EventParam("src", ethereum.Value.fromAddress(src))
  )
  withdrawalEvent.parameters.push(
    new ethereum.EventParam("wad", ethereum.Value.fromUnsignedBigInt(wad))
  )

  return withdrawalEvent
}
