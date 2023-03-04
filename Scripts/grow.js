/** @param {NS} ns */
export async function main(ns) {
	while (true) {
	const pLevel = ns.getHackingLevel()
		if(pLevel < 10) {
			await ns.grow('n00dles')
		} else if (pLevel > 1000) {
			await ns.grow('rothman-uni')
		} else {
			await ns.grow('joesguns')
		}
	}
}