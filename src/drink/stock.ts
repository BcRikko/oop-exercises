export class Stock {
  private _quantity: number

  constructor (quantity: number) {
    this._quantity = quantity
  }

  get quantity (): number {
    return this._quantity
  }

  decreace (): void {
    this._quantity--
  }
}
