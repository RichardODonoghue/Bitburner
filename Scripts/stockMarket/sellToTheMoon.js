/** @param {NS} ns */
export async function main(ns) {

	const getStockInfo = (stock) => {
		const vol = ns.stock.getVolatility(stock)
		const forecast = ns.stock.getForecast(stock)
		ns.print(`Sym: ${stock}, Volatility: ${vol}, Forecast: ${forecast}`);
	}

	while (true) {
		const ownedStocks = []
		const stocks = ns.stock.getSymbols()
		ns.print('Checking portfolio...')
		stocks.forEach(stock => {
			const pos = ns.stock.getPosition(stock);
			if (pos[0] > 0) {
				ns.print('Positions found')
				ownedStocks.push({ sym: stock, shares: pos[0] })
			}
		})
		ns.clearLog()
		ownedStocks.forEach(stock => {
			ns.printf(`Waiting for the right time to sell ${stock.sym} \n`)
			ns.print(`Gains: $${Math.floor(ns.stock.getSaleGain(stock.sym, stock.shares, "Long"))} \n`)
			let forecast = ns.stock.getForecast(stock.sym)
			getStockInfo(stock.sym)
			if (forecast < 0.48) {
				ns.stock.sellStock(stock.sym, stock.shares)
				ns.toast(`Stock market: sold ${stock.shares} shares of ${stock.sym} for ${Math.floor(ns.stock.getSaleGain(stock.sym, stock.shares, "Long"))} `, "success", 10000)
				ownedStocks.pop()
			}
		})
		await ns.sleep(6000)
	}
}