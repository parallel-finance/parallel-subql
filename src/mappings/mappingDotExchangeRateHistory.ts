import { SubstrateBlock, SubstrateEvent } from "@subql/types";
import { BlockNumber } from "@polkadot/types/interfaces";
import { Compact } from '@polkadot/types';
import { DotExchangeRate } from "../types/models/DotExchangeRate";
import { Rate } from "@parallel-finance/types/interfaces";

export async function dotExchangeRateHistory(block: SubstrateBlock): Promise<void> {
    const blockNumber = (block.block.header.number as Compact<BlockNumber>).toBigInt();

    const record = new DotExchangeRate(blockNumber.toString());

    record.blockNumber = blockNumber;

    const dotExchangeRate = (await api.query.loans.exchangeRate('KSM')) as Rate;

    record.rate = dotExchangeRate.toString();

    await record.save().catch(e => { console.log(e) });

}