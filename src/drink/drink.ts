export class Drink {
  static readonly COKE = 0
  static readonly DIET_COKE = 1
  static readonly TEA = 2

  private kind: number

  constructor (kind: number) {
    this.kind = kind
  }

  getKind (): number {
    return this.kind
  }
}
