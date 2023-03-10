/** @param {NS} ns */
export async function main(ns) {
	const args = ns.args
	while (true) {
	//await ns.grow('n00dles');
	//await ns.grow('joesguns');
	//await ns.grow('rothman-uni');
	const pLevel = ns.getHackingLevel()
		if(pLevel < 10) {
			await ns.grow('n00dles')
		}  else if (args[0]) {
			await ns.grow(args[0])
		} else {
			await ns.grow('joesguns')
		}
	}
}