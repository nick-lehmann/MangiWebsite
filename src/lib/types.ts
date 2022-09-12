export type Canteen = {
	id: number
	name: string
	city: string
	address: string
	coordinates: number[]
}

export type Meal = {
	id: number
	name: string
	notes: string[] // TODO: Can we make this an enum?
	prices: MealPrices
	category: string
}

export type MealPrices = {
	students: number
	employees: number
	others: number
}
