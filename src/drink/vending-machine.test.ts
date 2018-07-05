import { VendingMachine } from './vending-machine'
import { Drink } from './drink'

test('100円玉、500円玉以外では購入できず、そのままお釣りとして返ってくること', () => {
  const vm = new VendingMachine()

  expect(vm.buy(10, Drink.COKE)).toBeNull()
  expect(vm.refund()).toBe(10)

  expect(vm.buy(50, Drink.COKE)).toBeNull()
  expect(vm.refund()).toBe(50)

  expect(vm.buy(1000, Drink.COKE)).toBeNull()
  expect(vm.refund()).toBe(1000)
})

test('在庫が0になったら購入できなくなること', () => {
  const vm = new VendingMachine()

  while (vm.quantityOfCoke > 0) {
    vm.buy(100, Drink.COKE)
  }
  expect(vm.buy(100, Drink.COKE)).toBeNull()

  while (vm.quantityOfDietCoke > 0) {
    vm.buy(100, Drink.DIET_COKE)
  }
  expect(vm.buy(100, Drink.DIET_COKE)).toBeNull()

  while (vm.quantityOfTea > 0) {
    vm.buy(100, Drink.TEA)
  }
  expect(vm.buy(100, Drink.TEA)).toBeNull()
})

test('500円玉で購入すると400円お釣りとして返ってくること', () => {
  const vm = new VendingMachine()

  vm.buy(500, Drink.COKE)
  expect(vm.refund()).toBe(400)
})
