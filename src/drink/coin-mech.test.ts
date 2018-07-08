import { CoinMech } from './coin-mech'
import { Coin } from './type'

test('対象のコイン以外は投入不可になること', () => {
  const cm = new CoinMech()

  expect(cm.isRecievable(Coin.OneHundred)).toBeTruthy()
  expect(cm.isRecievable(Coin.FiveHundred)).toBeTruthy()
  expect(cm.isRecievable(1)).toBeFalsy()
  expect(cm.isRecievable(5)).toBeFalsy()
  expect(cm.isRecievable(10)).toBeFalsy()
  expect(cm.isRecievable(50)).toBeFalsy()
})

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

test('お釣りを返す必要があるかどうか判定できること', () => {
  const cm = new CoinMech()

  expect(cm.needsChange(Coin.OneHundred)).toBeFalsy()
  expect(cm.needsChange(Coin.FiveHundred)).toBeTruthy()
})

test('お釣りがあるかどうか判定できること', () => {
  const cm = new CoinMech()

  expect(cm.haveChange(Coin.FiveHundred)).toBeTruthy()
  cm.exchangePaymentForChange(Coin.OneHundred)
  expect(cm.haveChange(Coin.FiveHundred)).toBeTruthy()
  cm.exchangePaymentForChange(Coin.OneHundred)
  expect(cm.haveChange(Coin.FiveHundred)).toBeFalsy()
})

describe('put', () => {
  test('100円を投入したら、そのままコインの在庫になること', () => {
    const cm = new CoinMech()

    cm.put(Coin.OneHundred)
    expect(cm.toChargeTotal()).toBe(0)
    expect(cm.refund()).toEqual([])
  })

  test('500円を投入したら、400円はお釣りになること', () => {
    const cm = new CoinMech()

    cm.put(Coin.FiveHundred)
    expect(cm.toChargeTotal()).toBe(Coin.FiveHundred - Coin.OneHundred)
    expect(cm.refund()).toEqual([Coin.OneHundred, Coin.OneHundred, Coin.OneHundred, Coin.OneHundred])
  })
})
