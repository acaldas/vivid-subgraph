import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { ConsecutiveTransfer } from "../generated/schema"
import { ConsecutiveTransfer as ConsecutiveTransferEvent } from "../generated/Lizard/Lizard"
import { handleConsecutiveTransfer } from "../src/lizard"
import { createConsecutiveTransferEvent } from "./lizard-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let fromTokenId = BigInt.fromI32(234)
    let toTokenId = BigInt.fromI32(234)
    let from = Address.fromString("0x0000000000000000000000000000000000000001")
    let to = Address.fromString("0x0000000000000000000000000000000000000001")
    let newConsecutiveTransferEvent = createConsecutiveTransferEvent(
      fromTokenId,
      toTokenId,
      from,
      to
    )
    handleConsecutiveTransfer(newConsecutiveTransferEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ConsecutiveTransfer created and stored", () => {
    assert.entityCount("ConsecutiveTransfer", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ConsecutiveTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "fromTokenId",
      "234"
    )
    assert.fieldEquals(
      "ConsecutiveTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "toTokenId",
      "234"
    )
    assert.fieldEquals(
      "ConsecutiveTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "from",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ConsecutiveTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "to",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
