import { ipfs, json } from "@graphprotocol/graph-ts";
import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Transfer as TransferEvent,
} from "../generated/Vivid/Vivid";
import {
  Approval,
  ApprovalForAll,
  OwnershipTransferred,
  Token,
  Transfer,
  User,
} from "../generated/schema";

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.approved = event.params.approved;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
const ipfshash = "QmdJXNoTTzSkfdusFqidpYuDqDF6p7AMi7iZkmZpxPAByW";

// type AttributeName =
//   | "character"
//   | "face"
//   | "hairType"
//   | "mask"
//   | "ear"
//   | "eyeCover"
//   | "apparel"
//   | "headwear"
//   | "tattoo"
//   | "weapon"
//   | "effect"
//   | "background";

// const attributesMap = {
//   Character: "character",
//   Face: "face",
//   "Hair Type": "hairType",
//   Mask: "mask",
//   Ear: "ear",
//   "Eye Cover": "eyeCover",
//   Apparel: "apparel",
//   Headwear: "headwear",
//   Tattoo: "tattoo",
//   Weapon: "weapon",
//   Effect: "effect",
//   Background: "background",
// };

interface AttributeValue {
  trait_type: string;
  value: string;
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  /* load the token from the existing Graph Node */
  let token = Token.load(event.params.tokenId.toString());
  if (!token) {
    /* if the token does not yet exist, create it */
    token = new Token(event.params.tokenId.toString());
    token.tokenID = event.params.tokenId;

    token.tokenURI = "/" + event.params.tokenId.toString();

    /* combine the ipfs hash and the token ID to fetch the token metadata from IPFS */
    let metadata = ipfs.cat(ipfshash + token.tokenURI);
    if (metadata) {
      const value = json.fromBytes(metadata).toObject();
      if (value) {
        /* using the metatadata from IPFS, update the token object with the values  */
        const image = value.get("image");
        const name = value.get("name");
        const description = value.get("description");

        if (name && image && description) {
          token.name = name.toString();
          token.image = image.toString();
          token.description = description.toString();
          token.ipfsURI = "ipfs.io/ipfs/" + ipfshash + token.tokenURI;
        }

        const attributesValue = value.get("attributes");

        if (attributesValue) {
          const attributes = attributesValue.toArray();

          const character = attributes[0].toObject().get("value");
          token.character = character ? character.toString() : "";

          const face = attributes[1].toObject().get("value");
          token.face = face ? face.toString() : "";

          const hairType = attributes[2].toObject().get("value");
          token.hairType = hairType ? hairType.toString() : "";

          const mask = attributes[3].toObject().get("value");
          token.mask = mask ? mask.toString() : "";

          const ear = attributes[4].toObject().get("value");
          token.ear = ear ? ear.toString() : "";

          const eyeCover = attributes[5].toObject().get("value");
          token.eyeCover = eyeCover ? eyeCover.toString() : "";

          const apparel = attributes[6].toObject().get("value");
          token.apparel = apparel ? apparel.toString() : "";

          const headwear = attributes[7].toObject().get("value");
          token.headwear = headwear ? headwear.toString() : "";

          const tattoo = attributes[8].toObject().get("value");
          token.tattoo = tattoo ? tattoo.toString() : "";

          const weapon = attributes[9].toObject().get("value");
          token.weapon = weapon ? weapon.toString() : "";

          const effect = attributes[10].toObject().get("value");
          token.effect = effect ? effect.toString() : "";

          const background = attributes[11].toObject().get("value");
          token.background = background ? background.toString() : "";
        }
      }
    }
  }
  token.updatedAtTimestamp = event.block.timestamp;

  /* set or update the owner field and save the token to the Graph Node */
  token.owner = event.params.to.toHexString();
  token.save();

  /* if the user does not yet exist, create them */
  let user = User.load(event.params.to.toHexString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}
