import { CoinMech } from './coin-mech'
import { Coin } from './type'

test('投入したコインの合計金額が取得できること', () => {
  const cm = new CoinMech()

  cm.putInCoin(Coin.OneHundred)
  cm.putInCoin(Coin.FiveHundred)
  cm.putInCoin(Coin.OneHundred)

  expect(cm.toChargeTotal()).toBe(Coin.OneHundred * 2 + Coin.FiveHundred)
})

test('投入したコインがそのまま取得できること', () => {
  const cm = new CoinMech()

  cm.putInCoin(Coin.OneHundred)
  cm.putInCoin(Coin.FiveHundred)
  cm.putInCoin(Coin.OneHundred)

  expect(cm.refund().sort()).toEqual([Coin.OneHundred, Coin.FiveHundred, Coin.OneHundred].sort())
})

test('お釣りがあるかどうか判定できること', () => {
  const cm = new CoinMech()

  expect(cm.haveChange(Coin.FiveHundred)).toBeTruthy()
  cm.exchangePaymentForChange(Coin.OneHundred)
  expect(cm.haveChange(Coin.FiveHundred)).toBeTruthy()
  cm.exchangePaymentForChange(Coin.OneHundred)
  expect(cm.haveChange(Coin.FiveHundred)).toBeFalsy()
})
