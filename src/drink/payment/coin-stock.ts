import { Coin } from '.'

interface CoinOption {
  coin: Coin,
  numberOfCoin: number
}

export class CoinStock {
  private coins: Coin[] = []

  constructor (option: CoinOption[] = []) {
    option.forEach(a => {
      Array(a.numberOfCoin).fill(null).forEach(_ => {
        this.coins.push(a.coin)
      })
    })
  }

  push (coin: Coin): void {
    this.coins.push(coin)
  }

  pop (coin: Coin): Coin {
    const coinIndex = this.coins.findIndex(a => a === coin)
    if (coinIndex >= 0) {
      return this.coins.splice(coinIndex, 1)[0]
    }

    return null
  }

  size (coin: Coin): number {
    return this.coins.filter(a => a === coin).length
  }

  haveChange (coin: Coin): boolean {
    if (coin <= Coin.OneHundred) {
      return true
    }

    return this.size(Coin.OneHundred) >= (coin - Coin.OneHundred) / Coin.OneHundred
  }
}
