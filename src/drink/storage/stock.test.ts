import { Stock } from './stock'

test('在庫をすべて減らしたら空になること', () => {
  const stock = new Stock(5)

  expect(stock.isEmpty()).toBeFalsy()

  for (let i = 0; i < 4; i++) {
    stock.decreace()
    expect(stock.isEmpty()).toBeFalsy()
  }

  stock.decreace()
  expect(stock.isEmpty()).toBeTruthy()
})
