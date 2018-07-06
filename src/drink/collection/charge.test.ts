import { Charge } from './charge'
import { Coin } from '../type'

test('釣り銭を硬貨別で取得できること', () => {
  const charge = new Charge()

  charge.push(Coin.OneHundred)
  charge.push(Coin.FiveHundred)
  charge.push(Coin.OneHundred)

  const coins = charge.refund()
  expect(coins).toHaveLength(3)
  expect(coins).toEqual([Coin.OneHundred, Coin.FiveHundred, Coin.OneHundred])
})

test('釣り銭の合計金額を取得できること', () => {
  const charge = new Charge()

  charge.push(Coin.OneHundred)
  charge.push(Coin.FiveHundred)
  charge.push(Coin.OneHundred)

  expect(charge.toTotal()).toBe(Coin.OneHundred + Coin.FiveHundred + Coin.OneHundred)
})

test('釣り銭排出後にrefundしても0円になること', () => {
  const charge = new Charge()

  charge.push(Coin.OneHundred)
  charge.push(Coin.FiveHundred)

  charge.refund()
  expect(charge.refund()).toHaveLength(0)
})

test('釣り銭排出後にrefundTotalしても0円になること', () => {
  const charge = new Charge()

  charge.push(Coin.OneHundred)
  charge.push(Coin.FiveHundred)

  charge.refund()
  expect(charge.toTotal()).toBe(0)
})
