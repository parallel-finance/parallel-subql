import { SubstrateBlock } from '@subql/types'
import { getBlockTimestamp } from '../helpers'
import { Block } from '../types/models/Block'

export class BlockHandler {
  private block: SubstrateBlock

  static async ensureBlock (id: string): Promise<void> {
    const block = await Block.get(id)

    if (!block) {
      await new Block(id).save()
    }
  }

  constructor(block: SubstrateBlock) {
    this.block = block
  }

  get blockTimestamp (): Date {
    return getBlockTimestamp(this.block.block)
  }

  get number (): bigint {
    return this.block.block.header.number.toBigInt() || BigInt(0)
  }

  get hash (): string {
    return this.block.block.hash.toString()
  }

  get specVersion (): number {
    return this.block.specVersion
  }

  get parentHash (): string {
    return this.block.block.header.parentHash.toString()
  }

  public async save (): Promise<void> {
    const block = new Block(this.hash)

    block.number = this.number
    block.timestamp = this.blockTimestamp
    block.specVersion = this.specVersion
    block.parentHash = this.parentHash

    await block.save()
  }
}