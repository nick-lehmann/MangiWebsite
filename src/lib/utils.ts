import type { CanteenDay } from './types.js'

/// Return only those days where the canteen is open.
export function openDays(days: CanteenDay[]): CanteenDay[] {
	return days.filter((day) => day.closed === false)
}
