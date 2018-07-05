import { DrinkType } from './type'

export class Drink {
  private kind: DrinkType

  constructor (kind: DrinkType) {
    this.kind = kind
  }

  getKind (): DrinkType {
    return this.kind
  }
}
