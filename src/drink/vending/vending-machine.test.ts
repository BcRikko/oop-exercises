import { VendingMachine } from './vending-machine'
import { Coin } from '../payment'
import { DrinkType } from '../drink'

test('100円玉、500円玉以外では購入できず、そのままお釣りとして返ってくること', () => {
  const vm = new VendingMachine()

  expect(vm.buy(10, DrinkType.Coke)).toBeNull()
  expect(vm.refund()).toBe(10)

  expect(vm.buy(50, DrinkType.Coke)).toBeNull()
  expect(vm.refund()).toBe(50)

  expect(vm.buy(1000, DrinkType.Coke)).toBeNull()
  expect(vm.refund()).toBe(1000)
})

test('在庫が0になったら購入できなくなること', () => {
  const vm = new VendingMachine()

  for (let i = 0; i < 5; i++) {
    vm.buy(Coin.OneHundred, DrinkType.Coke)
    vm.buy(Coin.OneHundred, DrinkType.DietCoke)
    vm.buy(Coin.OneHundred, DrinkType.Tea)
  }

  expect(vm.buy(Coin.OneHundred, DrinkType.Coke)).toBeNull()
  expect(vm.buy(Coin.OneHundred, DrinkType.DietCoke)).toBeNull()
  expect(vm.buy(Coin.OneHundred, DrinkType.Tea)).toBeNull()
})

test('500円玉で購入すると400円お釣りとして返ってくること', () => {
  const vm = new VendingMachine()

  vm.buy(Coin.FiveHundred, DrinkType.Coke)
  expect(vm.refund()).toBe(Coin.FiveHundred - Coin.OneHundred)
})

test('お釣りがなくなったら購入できなくなること', () => {
  // 在庫:100円x5
  const vm = new VendingMachine()
  // お釣り: 400円、在庫:100円
  vm.buy(Coin.FiveHundred, DrinkType.Coke)
  expect(vm.refund()).toBe(Coin.OneHundred * 4)

  expect(vm.buy(Coin.FiveHundred, DrinkType.Coke)).toBeNull()
  expect(vm.refund()).toBe(Coin.FiveHundred)
})
