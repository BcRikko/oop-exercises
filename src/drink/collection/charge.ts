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

  toTotal (): number {
    return this.charge.reduce((total, a) => total + a, 0)
  }

  private clear (): void {
    this.charge = []
  }
}
