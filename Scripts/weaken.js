/** @param {NS} ns */
export async function main(ns) {
	const args = ns.args
	while (true) {
		//await ns.weaken('n00dles')
		//await ns.weaken('joesguns')
		//await ns.weaken('rothman-uni')
		const pLevel = ns.getHackingLevel()
		if(pLevel < 10) {
			await ns.weaken('n00dles')
		}  else if (args[0]) {
			await ns.weaken(args[0])
		}
		else {
			await ns.weaken('joesguns')
		}
	}
}