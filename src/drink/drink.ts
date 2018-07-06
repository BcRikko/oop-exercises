import { DrinkType } from './type'

export class Drink {
  private kind: DrinkType

  constructor (kind: DrinkType) {
    this.kind = kind
  }

  isCoke (): boolean {
    return this.kind === DrinkType.Coke
  }

  isDietCoke (): boolean {
    return this.kind === DrinkType.DietCoke
  }

  isTea (): boolean {
    return this.kind === DrinkType.Tea
  }
}
