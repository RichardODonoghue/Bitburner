/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog('sleep')
	const args = ns.args
	
	const ram = args[0]

	// Iterator we'll use for our loop
	let i = 0;

	const serverCost = ns.getPurchasedServerCost(ram)
	// Continuously try to purchase servers until we've reached the maximum
	// amount of servers
	while (i < 25) {
		// Check if we have enough money to purchase a server
		let money = ns.getPlayer().money
		const ownedServers = ns.getPurchasedServers().length
		if (money > serverCost) {
			ns.purchaseServer('server-' + i, ram);
			ns.run('purchasedServers.js');
			++i;
		} else {
			ns.print(`Player Money: ${Math.floor(money)} \n Owned Servers: ${ownedServers}`)
			ns.print('Not enough money to purchase server')
			await ns.sleep(6000)
		}
		ns.clearLog()
	}
}