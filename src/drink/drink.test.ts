import { Drink } from './drink'
import { DrinkType } from './type'

test('最初に指定したドリンクがCokeのときtrueになる', () => {
  const drink = new Drink(DrinkType.Coke)
  expect(drink.isCoke()).toBeTruthy()
  expect(drink.isDietCoke()).toBeFalsy()
  expect(drink.isTea()).toBeFalsy()
})

test('最初に指定したドリンクがDietCokeのときtrueになる', () => {
  const drink = new Drink(DrinkType.DietCoke)
  expect(drink.isCoke()).toBeFalsy()
  expect(drink.isDietCoke()).toBeTruthy()
  expect(drink.isTea()).toBeFalsy()
})

test('最初に指定したドリンクがTeaのときtrueになる', () => {
  const drink = new Drink(DrinkType.Tea)
  expect(drink.isCoke()).toBeFalsy()
  expect(drink.isDietCoke()).toBeFalsy()
  expect(drink.isTea()).toBeTruthy()
})
