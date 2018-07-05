import { Drink } from './drink'

test('getKindはコンストラクタに渡した値が取得できること', () => {
  const coke = new Drink(0)
  expect(coke.getKind()).toBe(0)

  const dietCoke = new Drink(1)
  expect(dietCoke.getKind()).toBe(1)

  const tea = new Drink(2)
  expect(tea.getKind()).toBe(2)
})
