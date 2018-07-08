import { Stock } from './stock'
import { DrinkType } from './type'

export class DrinkStorage {
  private stocks: Map<DrinkType, Stock>

  constructor () {
    this.stocks = new Map()
    this.stocks.set(DrinkType.Coke, new Stock(5))
    this.stocks.set(DrinkType.DietCoke, new Stock(5))
    this.stocks.set(DrinkType.Tea, new Stock(5))
  }

  isEmpty (kindOfDrink: DrinkType): boolean {
    return this.findStock(kindOfDrink).isEmpty()
  }

  findStock (kindOfDrink: DrinkType): Stock {
    return this.stocks.get(kindOfDrink)
  }

  decrease (kindOfDrink: DrinkType): void {
    this.stocks.get(kindOfDrink).decreace()
  }
}
