import { Drink } from './drink'
import { Stock } from './stock'
import { Coin, DrinkType } from './type'
import { CoinStock, Charge } from './collection'
import { DrinkStorage } from './storage'
import { CoinMech } from './coin-mech'

export class VendingMachine {
  private stocks: DrinkStorage
  private coinMech: CoinMech

  constructor () {
    this.stocks = new DrinkStorage()
    this.coinMech = new CoinMech()
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
      this.coinMech.putInCoin(payment)
      return null
    }

    if ((kindOfDrink === DrinkType.Coke) && this.stocks.isEmpty(DrinkType.Coke)) {
      this.coinMech.putInCoin(payment)
      return null
    } else if ((kindOfDrink === DrinkType.DietCoke) && this.stocks.isEmpty(DrinkType.DietCoke)) {
      this.coinMech.putInCoin(payment)
      return null
    } else if ((kindOfDrink === DrinkType.Tea) && this.stocks.isEmpty(DrinkType.Tea)) {
      this.coinMech.putInCoin(payment)
      return null
    }

    // 釣り銭不足
    if (payment === Coin.FiveHundred && !this.coinMech.haveChange(Coin.FiveHundred)) {
      this.coinMech.putInCoin(payment)
      return null
    }

    if (payment === Coin.OneHundred) {
      // 100円玉を釣り銭に使える
      this.coinMech.putIntoCoinStock(payment)
    } else if (payment === Coin.FiveHundred) {
      // 400円のお釣り
      // 100円玉を釣り銭に使える
      this.coinMech.putIntoCoinStock(payment)

      for (let i = 0; i < (payment - Coin.OneHundred) / Coin.OneHundred; i++) {
        this.coinMech.exchangePaymentForChange(Coin.OneHundred)
      }
    }

    if (kindOfDrink === DrinkType.Coke) {
      this.stocks.decrease(DrinkType.Coke)
    } else if (kindOfDrink === DrinkType.DietCoke) {
      this.stocks.decrease(DrinkType.DietCoke)
    } else {
      this.stocks.decrease(DrinkType.Tea)
    }

    return new Drink(kindOfDrink)
  }

  /**
   * お釣りを取り出す
   * @return お釣りの金額
   */
  refund (): number {
    const total = this.coinMech.toChargeTotal()
    this.coinMech.refund()
    return total
  }
}
