/** @param {NS} ns */

export async function main(ns) {
	const args = ns.args
	const pow = args[0]
	ns.print(args)
	const purchasedServers = ns.getPurchasedServers()
	const ram = Math.pow(2,pow)
	ns.tprint("Ram requested ", ram)
	const player = ns.getPlayer()
	ns.print(player);

	purchasedServers.forEach(server => {
		const serverRam = ns.getPurchasedServerMaxRam()
		ns.tprint(`max ram for ${server} is ${serverRam}`)
		if (serverRam > ram) {
			const upgradeCost = ns.getPurchasedServerUpgradeCost(server, ram);
			const upgradedServers = [];
			ns.print(upgradeCost)
			if (upgradeCost < player.money) {
				ns.upgradePurchasedServer(server, ram)
				upgradedServers.push(server)
			}
			else {
				ns.tprint(`not enough money to upgrade server ${server}, need $${upgradeCost}`)
			}
			//
			ns.tprint('upgraded servers: ', upgradedServers);
		} else {
			ns.tprint(`Cannot upgrade ${server}`)
		}
	})

}