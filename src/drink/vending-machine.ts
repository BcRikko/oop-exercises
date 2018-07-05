import { Drink } from './drink'

export class VendingMachine {
  /** コーラの在庫数 */
  quantityOfCoke = 5
  /** ダイエットコーラの在庫数 */
  quantityOfDietCoke = 5
  /** お茶の在庫数 */
  quantityOfTea = 5
  /** 100円玉の在庫数 */
  numberOf100Yen = 10
  /** お釣り */
  charge = 0

  /**
   * ジュースを購入する
   * @param i 投入金額(100円と500円のみ受け付ける)
   * @param kindOfDrink ジュースの種類
   * @return 指定したジュース.在庫不足、釣り銭不足で変えなかった場合はnullが返される
   */
  buy (i: number, kindOfDrink: number): Drink {
    // 100円と500円だけ受け取る
    if ((i !== 100) && (i !== 500)) {
      this.charge += i
      return null
    }

    if ((kindOfDrink === Drink.COKE) && (this.quantityOfCoke === 0)) {
      this.charge += i
      return null
    } else if ((kindOfDrink === Drink.DIET_COKE) && (this.quantityOfDietCoke === 0)) {
      this.charge += i
      return null
    } else if ((kindOfDrink === Drink.TEA) && (this.quantityOfTea === 0)) {
      this.charge += i
      return null
    }

    // 釣り銭不足
    if (i === 500 && this.numberOf100Yen < 4) {
      this.charge += i
      return null
    }

    if (i === 100) {
      // 100円玉を釣り銭に使える
      this.numberOf100Yen++
    } else if (i === 500) {
      // 400円のお釣り
      this.charge += i - 100
      // 100円玉を釣り銭に使える
      this.numberOf100Yen -= (i - 100) / 100
    }

    if (kindOfDrink === Drink.COKE) {
      this.quantityOfCoke--
    } else if (kindOfDrink === Drink.DIET_COKE) {
      this.quantityOfDietCoke--
    } else {
      this.quantityOfTea--
    }

    return new Drink(kindOfDrink)
  }

  /**
   * お釣りを取り出す
   * @return お釣りの金額
   */
  refund (): number {
    const result = this.charge
    this.charge = 0
    return result
  }
}
