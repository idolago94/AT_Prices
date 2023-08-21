
export const toILS = async (value: number, unit: string = "EUR"): Promise<string> => {
    try {
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${value}&from=${unit}&to=ILS`)
        const result = await res.json()
        return result.rates.ILS + " \u20AA"
    } catch (e) {
        return "\uD83D\uDD34 " + value + " \u20AC"
    }
}