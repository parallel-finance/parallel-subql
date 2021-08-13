import { Codec } from '@polkadot/types/types'

export const TOKEN_DECIMAL = {
  DOT: 10,
  USDT: 6,
  xDOT: 12,
  xKSM: 12,
  PARA: 12,
  KSM: 12,
  HKO: 12
}

export function resolveToken (token: Codec) {
    const name = (token as any).asToken.toString()

    return {
      name,
      decimal: TOKEN_DECIMAL[name] || 12,
    }
  }
