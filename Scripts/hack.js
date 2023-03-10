/** @param {NS} ns */
export async function main(ns) {
	const args = ns.args;
	while (true) {
		const pLevel = ns.getHackingLevel()
		if (pLevel < 100) {
			await ns.hack('n00dles')
		} else if (args[0]) {
			const serverMoney = ns.getServerMoneyAvailable(args[0])
			if (serverMoney < 10000) {
				await ns.grow(args[0])
			} else {
				await ns.hack(args[0])
			}
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