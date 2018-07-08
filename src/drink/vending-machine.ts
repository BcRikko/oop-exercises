import { Drink } from './drink'
import { Stock } from './stock'
import { Coin, DrinkType } from './type'
import { CoinStock, Charge } from './collection'
import { DrinkStorage } from './storage'
import { CoinMech } from './coin-mech'

export class VendingMachine {
  private drinkStorage: DrinkStorage
  private coinMech: CoinMech

  constructor () {
    this.drinkStorage = new DrinkStorage()
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
    if (!this.coinMech.isRecievable(payment)) {
      this.coinMech.putInCoin(payment)
      return null
    }

    if (this.drinkStorage.isEmpty(kindOfDrink)) {
      this.coinMech.putInCoin(payment)
      return null
    }

    // 釣り銭不足
    if (payment === Coin.FiveHundred && !this.coinMech.haveChange(Coin.FiveHundred)) {
      this.coinMech.putInCoin(payment)
      return null
    }

    this.coinMech.put(payment)
    this.drinkStorage.decrease(kindOfDrink)

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
