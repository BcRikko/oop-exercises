import { CoinStock, Charge } from './collection'
import { Coin } from './type'

export class CoinMech {
  private coinStock: CoinStock
  private charge: Charge

  constructor () {
    this.coinStock = new CoinStock([ { coin: Coin.OneHundred, numberOfCoin: 5 } ])
    this.charge = new Charge()
  }

  isRecievable (payment: Coin): boolean {
    return [Coin.OneHundred, Coin.FiveHundred].includes(payment)
  }

  put (payment: Coin): void {
    this.putIntoCoinStock(payment)

    if (this.needsChange(payment)) {
      this.exchangeForOneHundred(payment)
    }
  }

  putInCoin (payment: Coin): void {
    this.charge.push(payment)
  }

  putIntoCoinStock (payment: Coin): void {
    this.coinStock.push(payment)
  }

  needsChange (payment: Coin): boolean {
    return payment === Coin.FiveHundred
  }

  haveChange (payment: Coin): boolean {
    return this.coinStock.haveChange(payment)
  }

  exchangeForOneHundred (payment: Coin): void {
    for (let i = 0; i < (payment - Coin.OneHundred) / Coin.OneHundred; i++) {
      this.exchangeForOneHundred(Coin.OneHundred)
    }
  }

  exchangePaymentForChange (payment: Coin): void {
    this.charge.push(payment)
    this.coinStock.pop(payment)
  }

  toChargeTotal (): number {
    return this.charge.toTotal()
  }

  refund (): Coin[] {
    return this.charge.refund()
  }
}
