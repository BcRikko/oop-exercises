import { CoinStock, Charge } from './collection'
import { Coin } from './type'

export class CoinMech {
  private coinStock: CoinStock
  private charge: Charge

  constructor () {
    this.coinStock = new CoinStock([ { coin: Coin.OneHundred, numberOfCoin: 5 } ])
    this.charge = new Charge()
  }

  putInCoin (payment: Coin): void {
    this.charge.push(payment)
  }

  putIntoCoinStock (payment: Coin): void {
    this.coinStock.push(payment)
  }

  haveChange (payment: Coin): boolean {
    return this.coinStock.haveChange(payment)
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
