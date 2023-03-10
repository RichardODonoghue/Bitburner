/** @param {NS} ns */

export async function main(ns) {
	const args = ns.args
	const purchasedServers = ns.getPurchasedServers()
	const ram = Math.pow(2, args[0])
	let player = ns.getPlayer()
	const maxServerRam = ns.getPurchasedServerMaxRam()
	const upgradedServers = [];
	purchasedServers.forEach(server => {
		//ns.tprint(ram, ns.getServerMaxRam(server))
		if (ram > ns.getServerMaxRam(server)) {
			const upgradeCost = ns.getPurchasedServerUpgradeCost(server, ram);
			//ns.print(upgradeCost)
			if (upgradeCost < player.money) {
				ns.upgradePurchasedServer(server, ram)
				upgradedServers.push(server)
				player = ns.getPlayer()
			}
			else {
				ns.tprint(`not enough money to upgrade server ${server}, need $${upgradeCost}`)
			}
			//

		} else {
			ns.tprint(`Cannot upgrade ${server}`)
		}
	})
	ns.tprint('upgraded servers: ', upgradedServers);
}