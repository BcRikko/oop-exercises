import { DrinkStorage } from './storage'
import { DrinkType } from './type'

test('在庫がなくなったらisEmptyがtrueを返すこと', () => {
  const storage = new DrinkStorage()

  for (let i = 0; i < 4; i++) {
    storage.decrease(DrinkType.Coke)
    expect(storage.isEmpty(DrinkType.Coke)).toBeFalsy()
    storage.decrease(DrinkType.DietCoke)
    expect(storage.isEmpty(DrinkType.DietCoke)).toBeFalsy()
    storage.decrease(DrinkType.Tea)
    expect(storage.isEmpty(DrinkType.Tea)).toBeFalsy()
  }

  storage.decrease(DrinkType.Coke)
  expect(storage.isEmpty(DrinkType.Coke)).toBeTruthy()
  storage.decrease(DrinkType.DietCoke)
  expect(storage.isEmpty(DrinkType.DietCoke)).toBeTruthy()
  storage.decrease(DrinkType.Tea)
  expect(storage.isEmpty(DrinkType.Tea)).toBeTruthy()
})
