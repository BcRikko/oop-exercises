export class Stock {
  private quantity: number

  constructor (quantity: number) {
    this.quantity = quantity
  }

  decreace (): void {
    this.quantity--
  }

  isEmpty (): boolean {
    return this.quantity === 0
  }
}
