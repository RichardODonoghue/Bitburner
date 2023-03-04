/** @param {NS} ns */

export async function main(ns) {
	ns.run('sellToTheMoon.js');
	while (true) {
		ns.disableLog('sleep')
		ns.clearLog()
		const ownedStocks = []
		const stocks = ns.stock.getSymbols()
		ns.print('Checking portfolio for new positions...')
		stocks.forEach(stock => {
			const pos = ns.stock.getPosition(stock);
			if (pos[0] > 0) {
				ns.print(`Holding ${stock}: ${Math.floor(pos[0])} shares`)
				ownedStocks.push({ sym: stock, shares: pos[0] })
			}
		});
		let money = Math.min(ns.getPlayer().money) - 100000
		if (ownedStocks.length === 0 || money > 100000000) {
			ns.printf('checking for stocks that meet conditions \n')
			for (let stock of stocks) {
				let vol = ns.stock.getVolatility(stock);
				let forecast = ns.stock.getForecast(stock);
				let price = ns.stock.getAskPrice(stock);
				let maxShares = ns.stock.getMaxShares(stock);
				let maxPurchaseCost = ns.stock.getPurchaseCost(stock, maxShares, 'Long');
				money = Math.min(ns.getPlayer().money) - 100000;
				ns.print(`Sym: ${stock}, Volatility: ${vol}, Forecast: ${forecast}, canBuyShares ${ownedStocks.find(({sym}) => sym === stock)}`);
				if (forecast > 0.50 & ownedStocks.find(({sym}) => sym === stock) === undefined) {
					//Check if all shares can be bought
					if (money > maxPurchaseCost) {
						ns.print('money:', money, " ", maxPurchaseCost);
						ns.stock.buyStock(stock, maxShares);
						ownedStocks.push({ sym: stock, shares: maxShares });
						ns.toast(`Stock market: bought ${maxShares} shares of ${stock}`, "success", 10000);
						break;
					} else {
						if (ns.stock.buyStock(stock, Math.min(money / price)) !== 0) {
							ownedStocks.push({ sym: stock, shares: Math.min(price * money) });
							ns.toast(`Stock market: bought ${Math.min(money / price)} shares of ${stock}`, "success", 10000);
							break;
						}
					}
				} else {
					ns.printf(`Stock ${stock} does not meet conditions`);
				}
			};
		} else {
			ns.print(`Not enough money to buy more stonks: ${Math.floor(money)}`);
		}
		await ns.sleep(6000)
	}
}