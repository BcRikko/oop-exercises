import { CoinStock } from './coin-stock'
import { Coin } from '../type'

test('硬貨の初期在庫を設定できること', () => {
  const stock = new CoinStock()
  expect(stock.size(Coin.OneHundred)).toBe(0)
  expect(stock.size(Coin.FiveHundred)).toBe(0)

  const stockOneHundred = new CoinStock([
    { coin: Coin.OneHundred, numberOfCoin: 10 }
  ])
  expect(stockOneHundred.size(Coin.OneHundred)).toBe(10)
  expect(stockOneHundred.size(Coin.FiveHundred)).toBe(0)

  const stockFiveHundred = new CoinStock([
    { coin: Coin.FiveHundred, numberOfCoin: 10 }
  ])
  expect(stockFiveHundred.size(Coin.OneHundred)).toBe(0)
  expect(stockFiveHundred.size(Coin.FiveHundred)).toBe(10)
})

test('硬貨を投入できること', () => {
  const stock = new CoinStock()

  for (let i = 0; i < 10; i++) {
    stock.push(Coin.OneHundred)
  }
  expect(stock.size(Coin.OneHundred)).toBe(10)

  for (let i = 0; i < 5; i++) {
    stock.push(Coin.FiveHundred)
  }
  expect(stock.size(Coin.OneHundred)).toBe(10)
  expect(stock.size(Coin.FiveHundred)).toBe(5)
})

test('投入した硬貨を排出できること', () => {
  const stock = new CoinStock()

  for (let i = 0; i < 5; i++) {
    stock.push(Coin.OneHundred)
    stock.push(Coin.FiveHundred)
  }
  for (let i = stock.size(Coin.OneHundred); i > 0; i--) {
    stock.pop(Coin.OneHundred)
    expect(stock.size(Coin.OneHundred)).toBe(i - 1)
  }
  expect(stock.pop(Coin.OneHundred)).toBeNull()
  expect(stock.size(Coin.OneHundred)).toBe(0)

  for (let i = stock.size(Coin.FiveHundred); i > 0; i--) {
    stock.pop(Coin.FiveHundred)
    expect(stock.size(Coin.FiveHundred)).toBe(i - 1)
  }
  expect(stock.pop(Coin.FiveHundred)).toBeNull()
  expect(stock.size(Coin.FiveHundred)).toBe(0)
})

test('釣り銭不足の場合はfalseになること', () => {
  const stock = new CoinStock()

  for (let i = 0; i < 4; i++) {
    stock.push(Coin.OneHundred)
  }

  expect(stock.haveChange(Coin.FiveHundred)).toBeTruthy()

  stock.pop(Coin.OneHundred)
  expect(stock.haveChange(Coin.FiveHundred)).toBeFalsy()
})
