import { SubstrateEvent } from '@subql/types'
import { Event } from '../types/models/Event'
import { BlockHandler } from './block'
import { ExtrinsicHandler } from './extrinsic'
import { Dispatcher } from '../helpers/dispatcher'

type EventDispatch = Dispatcher<SubstrateEvent>

export class EventHandler {
  private event: SubstrateEvent
  private dispatcher: EventDispatch

  constructor(event: SubstrateEvent) {
    this.event = event
    this.dispatcher = new Dispatcher<SubstrateEvent>()

    this.registerDispatcherHandler()
  }

  private registerDispatcherHandler() {
    this.dispatcher.batchRegist([])
  }

  get index(): number {
    return this.event.idx
  }

  get blockNumber(): bigint {
    return this.event.block.block.header.number.toBigInt()
  }

  get blockHash(): string {
    return this.event.block.block.hash.toString()
  }

  get section(): string {
    return this.event.event.section
  }

  get method(): string {
    return this.event.event.method
  }

  get data(): string {
    return this.event.event.data.toString()
  }

  get extrinsicHash(): string {
    const i = this.event?.extrinsic?.extrinsic?.hash?.toString()

    return i === 'null' ? undefined : i
  }

  get id(): string {
    return `${this.blockNumber}-${this.index}`
  }

  public async save(): Promise<void> {
    const event = new Event(this.id)

    await BlockHandler.ensureBlock(this.blockHash)

    if (this.extrinsicHash) {
      await ExtrinsicHandler.ensureExtrinsic(this.extrinsicHash)
    }

    event.index = this.index
    event.section = this.section
    event.method = this.method
    event.data = this.data

    event.blockId = this.blockHash

    if (this.extrinsicHash) {
      event.extrinsicId = this.extrinsicHash
    }

    await this.dispatcher.dispatch(`${this.section}-${this.method}`, this.event)

    await event.save()
  }
}
