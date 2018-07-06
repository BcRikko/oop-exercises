import { Drink } from './drink'
import { Stock } from './stock'
import { Coin, DrinkType } from './type'
import { CoinStock, Charge } from './collection'

export class VendingMachine {
  /** コーラの在庫数 */
  stockOfCoke: Stock
  /** ダイエットコーラの在庫数 */
  stockOfDietCoke: Stock
  /** お茶の在庫数 */
  stockOfTea: Stock
  /** 硬貨の在庫数 */
  coinStock: CoinStock
  /** お釣り */
  charge: Charge

  constructor () {
    this.stockOfCoke = new Stock(5)
    this.stockOfDietCoke = new Stock(5)
    this.stockOfTea = new Stock(5)
    this.coinStock = new CoinStock([ { coin: Coin.OneHundred, numberOfCoin: 5 } ])
    this.charge = new Charge()
  }

  /**
   * ジュースを購入する
   * @param payment 投入金額(100円と500円のみ受け付ける)
   * @param kindOfDrink ジュースの種類
   * @return 指定したジュース.在庫不足、釣り銭不足で変えなかった場合はnullが返される
   */
  buy (payment: Coin, kindOfDrink: DrinkType): Drink {
    // 100円と500円だけ受け取る
    if ((payment !== Coin.OneHundred) && (payment !== Coin.FiveHundred)) {
      this.charge.push(payment)
      return null
    }

    if ((kindOfDrink === DrinkType.Coke) && (this.stockOfCoke.isEmpty())) {
      this.charge.push(payment)
      return null
    } else if ((kindOfDrink === DrinkType.DietCoke) && (this.stockOfDietCoke.isEmpty())) {
      this.charge.push(payment)
      return null
    } else if ((kindOfDrink === DrinkType.Tea) && (this.stockOfTea.isEmpty())) {
      this.charge.push(payment)
      return null
    }

    // 釣り銭不足
    if (payment === Coin.FiveHundred && !this.coinStock.haveChange(Coin.FiveHundred)) {
      this.charge.push(payment)
      return null
    }

    if (payment === Coin.OneHundred) {
      // 100円玉を釣り銭に使える
      this.coinStock.push(payment)
    } else if (payment === Coin.FiveHundred) {
      // 400円のお釣り
      // 100円玉を釣り銭に使える
      this.coinStock.push(payment)

      for (let i = 0; i < (payment - Coin.OneHundred) / Coin.OneHundred; i++) {
        this.charge.push(Coin.OneHundred)
        this.coinStock.pop(Coin.OneHundred)
      }
    }

    if (kindOfDrink === DrinkType.Coke) {
      this.stockOfCoke.decreace()
    } else if (kindOfDrink === DrinkType.DietCoke) {
      this.stockOfDietCoke.decreace()
    } else {
      this.stockOfTea.decreace()
    }

    return new Drink(kindOfDrink)
  }

  /**
   * お釣りを取り出す
   * @return お釣りの金額
   */
  refund (): number {
    const total = this.charge.toTotal()
    this.charge.refund()
    return total
  }
}
