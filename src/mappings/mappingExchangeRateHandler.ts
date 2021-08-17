import { SubstrateBlock } from '@subql/types'
import { BlockNumber } from '@polkadot/types/interfaces'
import { Compact } from '@polkadot/types'
import { ExchangeRate } from '../types/models/ExchangeRate'
import { ExchangeData } from '../types/interfaces'
import { Rate } from '@parallel-finance/types/interfaces'

export async function handleExchangeRate(block: SubstrateBlock): Promise<void> {
  const blockNumber = (
    block.block.header.number as Compact<BlockNumber>
  ).toBigInt()

  const record = new ExchangeRate(blockNumber.toString())

  record.blockNumber = blockNumber

  const ksmExchangeRate = (await api.query.loans.exchangeRate('KSM')) as Rate
  const usdtExchangeRate = (await api.query.loans.exchangeRate('USDT')) as Rate

  const ksmExchangeData: ExchangeData = {
    key: 'KSM',
    value: ksmExchangeRate.toString()
  }

  const usdtExchangeData: ExchangeData = {
    key: 'USDT',
    value: usdtExchangeRate.toString()
  }

  const exchangeData: ExchangeData[] = []
  exchangeData.push(ksmExchangeData)
  exchangeData.push(usdtExchangeData)

  record.rates = exchangeData

  await record.save()
}
