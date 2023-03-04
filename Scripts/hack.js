/** @param {NS} ns */
export async function main(ns) {
	while (true) {
		const pLevel = ns.getHackingLevel()
		if (pLevel < 100) {
			await ns.hack('n00dles')
		} else {
			const serverMoney = ns.getServerMoneyAvailable('joesguns')
			if (serverMoney < 10000) {
				await ns.grow('joesguns')
			} else {
				await ns.hack('joesguns')
			}
		}
	}
}