/** @param {NS} ns */
export async function main(ns) {
	while (true) {
		//await ns.weaken('n00dles')
		//await ns.weaken('joesguns')
		//await ns.weaken('rothman-uni')
		const pLevel = ns.getHackingLevel()
		if(pLevel < 10) {
			await ns.weaken('n00dles')
		} else if (pLevel > 1000) {
			await ns.weaken('rothman-uni')
		}
		else {
			await ns.weaken('joesguns')
		}
	}
}