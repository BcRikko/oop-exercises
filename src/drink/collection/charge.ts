import { Coin } from '../type'

export class Charge {
  private charge: Coin[] = []

  push (coin: Coin): void {
    this.charge.push(coin)
  }

  refund (): Coin[] {
    const coins = this.charge
    this.clear()
    return coins
  }

  refundTotal (): number {
    const total = this.charge.reduce((total, a) => total + a, 0)
    this.clear()
    return total
  }

  private clear (): void {
    this.charge = []
  }
}
