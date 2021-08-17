import { Codec } from '@polkadot/types/types'

export const TOKEN_DECIMAL = {
  DOT: 10,
  KSM: 12,
  USDT: 6,
  xDOT: 12,
  xKSM: 12,
  HKO: 12,
  PARA: 12,
 }

/* eslint-disable @typescript-eslint/no-explicit-any*/
export function resolveToken (token: Codec): {
                                               name: any;
                                               decimal: any;
                                           } {
    const name = (token as any).asToken.toString()

    return {
      name,
      decimal: TOKEN_DECIMAL[name] || 12,
    }
  }
